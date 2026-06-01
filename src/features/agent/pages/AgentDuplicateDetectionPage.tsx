import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import axios from "axios";
import {
  Alert,
  Button,
  CircularProgress,
  LinearProgress,
} from "@mui/material";
import { AppModal } from "@/shared/components/AppModal";

import { NavBar } from "@/shared/pages/NavBar";
import { ROUTES } from "@/app/router/routes";
import { useProyecto } from "@/features/proyectos/hooks/useProyectos";
import { useDeleteTarea } from "@/features/tareas/hooks/useTareas";
import {
  getTareaById,
  getTaskUsers,
  removeUserFromTask,
} from "@/features/tareas/services/tareaService";
import {
  startOracleVectorSearch,
  getOracleVectorSearchLatest,
} from "@/features/agent/services/aiDuplicateDetectionService";
import type {
  DuplicateDetectionLatestResponse,
  DuplicateDetectionResult,
  PipelineStep,
} from "@/features/agent/types/aiDuplicateDetection";
import { AgentDuplicateDetectionResultsTable } from "@/features/agent/components/AgentDuplicateDetectionResultsTable";
import styles from "@/features/agent/styles/AgentDuplicateDetectionPage.module.css";

const normalizeId = (value: string) => value.trim().toLowerCase();

const PIPELINE_LABELS: Record<PipelineStep, string> = {
  idle: "",
  preparing_oracle_vectors: "Preparando vectores para Oracle AI Vector Search...",
  confirming_oracle_vector_search: "Confirmando Oracle AI Vector Search...",
  running_oracle_vector_search: "Ejecutando Oracle AI Vector Search...",
  completed: "Comparacion completada.",
  error: "Error en el proceso.",
};

const PIPELINE_PROGRESS: Record<PipelineStep, number> = {
  idle: 0,
  preparing_oracle_vectors: 20,
  confirming_oracle_vector_search: 55,
  running_oracle_vector_search: 75,
  completed: 100,
  error: 0,
};

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const ORACLE_PHASE_DELAY_MS = 900;

async function pollOracleVectorSearchLatest(
  projectId: string
): Promise<DuplicateDetectionLatestResponse> {
  for (;;) {
    const result = await getOracleVectorSearchLatest(projectId);
    if (result.run?.status === "COMPLETED" || result.run?.status === "FAILED") {
      return result;
    }
    await delay(3000);
  }
}

export const AgentDuplicateDetectionPage = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [removedTaskIds, setRemovedTaskIds] = useState<Set<string>>(
    () => new Set()
  );
  const [deletingTaskId, setDeletingTaskId] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [pendingDelete, setPendingDelete] = useState<null | {
    taskId: string;
    label: "A" | "B";
    title: string;
  }>(null);

  // Pipeline state
  const [pipelineStep, setPipelineStep] = useState<PipelineStep>("idle");
  const [pipelineError, setPipelineError] = useState<string | null>(null);
  const pipelineRanRef = useRef(false);

  const [oracleData, setOracleData] =
    useState<DuplicateDetectionLatestResponse | null>(null);
  const [isOraclePanelCollapsed, setIsOraclePanelCollapsed] = useState(false);

  const { data: project } = useProyecto(projectId);
  const deleteMutation = useDeleteTarea(projectId);

  const shouldStartPipeline = searchParams.get("startPipeline") === "true";
  const threshold = Number(searchParams.get("threshold") ?? "0.88");

  // Full pipeline execution
  const runPipeline = useCallback(
    async (pid: string, th: number) => {
      try {
        setPipelineStep("preparing_oracle_vectors");
        await delay(ORACLE_PHASE_DELAY_MS);

        setPipelineStep("confirming_oracle_vector_search");
        await delay(ORACLE_PHASE_DELAY_MS);

        setPipelineStep("running_oracle_vector_search");
        const payload = { threshold: th };

        await startOracleVectorSearch(pid, payload);
        const oracleResult = await pollOracleVectorSearchLatest(pid);

        setOracleData(oracleResult);
        setPipelineStep("completed");
      } catch (error) {
        setPipelineStep("error");
        if (axios.isAxiosError(error)) {
          const apiMsg =
            typeof error.response?.data?.error === "string"
              ? error.response.data.error
              : undefined;
          setPipelineError(
            apiMsg ?? "Error durante el proceso de analisis."
          );
        } else {
          setPipelineError(
            "Error inesperado durante el proceso de analisis."
          );
        }
      }
    },
    []
  );

  // Auto-start pipeline from modal navigation
  useEffect(() => {
    if (shouldStartPipeline && projectId && !pipelineRanRef.current) {
      pipelineRanRef.current = true;
      runPipeline(projectId, threshold);
    }
  }, [shouldStartPipeline, projectId, threshold, runPipeline]);

  // Direct navigation — load latest results without running pipeline
  useEffect(() => {
    if (!shouldStartPipeline && projectId && !pipelineRanRef.current) {
      pipelineRanRef.current = true;
      setPipelineStep("running_oracle_vector_search");

      getOracleVectorSearchLatest(projectId).then((oracle) => {
        setOracleData(oracle);
        setPipelineStep("completed");
      }).catch(() => {
        setOracleData(null);
        setPipelineStep("completed");
      });
    }
  }, [shouldStartPipeline, projectId]);

  const filterResults = useCallback(
    (results: DuplicateDetectionResult[]) => {
      if (removedTaskIds.size === 0) return results;
      return results.filter(
        (r) =>
          !removedTaskIds.has(normalizeId(r.taskAId)) &&
          !removedTaskIds.has(normalizeId(r.taskBId))
      );
    },
    [removedTaskIds]
  );

  const oracleResults = useMemo(
    () => filterResults(oracleData?.results ?? []),
    [filterResults, oracleData]
  );

  const handleDeleteTask = (
    taskId: string,
    label: "A" | "B",
    title: string
  ) => {
    if (!projectId) return;
    setPendingDelete({ taskId, label, title });
  };

  const closePendingDelete = () => setPendingDelete(null);

  const performDeleteTask = async () => {
    if (!pendingDelete || !projectId) return;
    const { taskId } = pendingDelete;

    setDeleteError(null);
    setDeletingTaskId(taskId);

    try {
      const task = await getTareaById(taskId);
      if (task.estadoId === 3) {
        setDeleteError("No se puede eliminar una tarea completada.");
        return;
      }

      const assignments = await getTaskUsers(taskId);
      if (assignments.length > 0) {
        await Promise.all(
          assignments.map((a) => removeUserFromTask(taskId, a.userId))
        );
      }

      await deleteMutation.mutateAsync(taskId);

      // Keep deleted tasks out of the currently displayed results.
      setRemovedTaskIds((current) => {
        const next = new Set(current);
        next.add(normalizeId(taskId));
        return next;
      });
      closePendingDelete();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const apiMessage =
          typeof error.response?.data?.error === "string"
            ? error.response?.data?.error
            : undefined;
        setDeleteError(
          apiMessage ?? "No se pudo eliminar la tarea. Intenta nuevamente."
        );
      } else {
        setDeleteError(
          "No se pudo eliminar la tarea. Intenta nuevamente."
        );
      }
    } finally {
      setDeletingTaskId(null);
    }
  };

  const isPipelineRunning =
    pipelineStep !== "idle" &&
    pipelineStep !== "completed" &&
    pipelineStep !== "error";

  // --- No project guard ---
  if (!projectId) {
    return (
      <div className="App">
        <NavBar />
        <div className="page-header">
          <div className={styles.headerContent}>
            <div className={styles.headerTopRow}>
              <Button
                variant="outlined"
                onClick={() => navigate(ROUTES.agent)}
                className={styles.topBackButton}
                startIcon={
                  <span
                    aria-hidden="true"
                    className={`${styles.buttonIcon} ${styles.arrowBackIcon}`}
                  />
                }
              >
                Volver a Agent
              </Button>
            </div>
            <div>
              <h2>Analisis de tareas duplicadas</h2>
              <p className="page-subtitle">
                Selecciona un proyecto valido para continuar.
              </p>
            </div>
          </div>
        </div>
        <Alert severity="warning">
          No se encontro el proyecto seleccionado.
        </Alert>
      </div>
    );
  }

  // --- Pipeline step indicators ---
  const pipelineSteps: PipelineStep[] = [
    "preparing_oracle_vectors",
    "confirming_oracle_vector_search",
    "running_oracle_vector_search",
  ];

  const currentStepIndex = pipelineSteps.indexOf(pipelineStep);
  const isOracleSearchFailed = oracleData?.run?.status === "FAILED";

  return (
    <div className="App">
      <NavBar />

      <div className="page-header">
        <div className={styles.headerContent}>
          <div className={styles.headerTopRow}>
            <Button
              variant="outlined"
              onClick={() => navigate(ROUTES.agent)}
              className={styles.topBackButton}
              startIcon={
                <span
                  aria-hidden="true"
                  className={`${styles.buttonIcon} ${styles.arrowBackIcon}`}
                />
              }
            >
              Volver a Agent
            </Button>
          </div>
          <div>
            <h2>Analisis de tareas duplicadas</h2>
            <p className="page-subtitle">
              Resultados de Oracle AI Vector Search.
            </p>
          </div>
        </div>
      </div>

      {/* Summary cards */}
      <div className={styles.summaryGrid}>
        <div className={styles.summaryCard}>
          <span className={styles.summaryLabel}>Proyecto</span>
          <span className={styles.summaryValue}>
            {project?.nombre ?? "Proyecto seleccionado"}
          </span>
        </div>
        <div className={styles.summaryCard}>
          <span className={styles.summaryLabel}>Threshold</span>
          <span className={styles.summaryValue}>{threshold.toFixed(2)}</span>
          <span className={styles.summaryMeta}>Umbral de similitud</span>
        </div>
        <div className={styles.summaryCard}>
          <span className={styles.summaryLabel}>Estado del pipeline</span>
          <span
            className={`${styles.statusPill} ${
              pipelineStep === "completed"
                ? styles.statusCompleted
                : pipelineStep === "error"
                  ? styles.statusFailed
                  : styles.statusPending
            }`}
          >
            {pipelineStep === "completed"
              ? "COMPLETADO"
              : pipelineStep === "error"
                ? "ERROR"
                : "EN PROCESO"}
          </span>
        </div>
      </div>

      {/* Pipeline progress bar */}
      {isPipelineRunning && (
        <div className={styles.pipelineProgress}>
          <LinearProgress
            variant="determinate"
            value={PIPELINE_PROGRESS[pipelineStep]}
            className={styles.progressBar}
          />
          <div className={styles.pipelineSteps}>
            {pipelineSteps.map((step, index) => {
              const isActive = pipelineStep === step;
              const isDone = index < currentStepIndex;

              return (
                <div
                  key={step}
                  className={`${styles.pipelineStepItem} ${
                    isActive ? styles.pipelineStepActive : ""
                  } ${isDone ? styles.pipelineStepDone : ""}`}
                >
                  <span className={styles.pipelineStepNumber}>
                    {isDone ? "\u2713" : index + 1}
                  </span>
                  <span className={styles.pipelineStepLabel}>
                    {PIPELINE_LABELS[step]}
                  </span>
                </div>
              );
            })}
          </div>
          <p className={styles.loadingHint}>
            Esto puede tardar unos segundos. Mantente en esta pantalla.
          </p>
        </div>
      )}

      {/* Pipeline error */}
      {pipelineStep === "error" && pipelineError && (
        <Alert severity="error" style={{ marginBottom: 16 }}>
          {pipelineError}
        </Alert>
      )}

      {/* Delete error */}
      {deleteError && (
        <Alert severity="error" style={{ marginBottom: 16 }}>
          {deleteError}
        </Alert>
      )}

      {/* Oracle AI Vector Search results */}
      {pipelineStep === "completed" && (
        <div className={styles.enginesContainer}>
          <div className={styles.enginePanel}>
            <button
              type="button"
              className={styles.engineHeader}
              onClick={() => setIsOraclePanelCollapsed((current) => !current)}
              aria-expanded={!isOraclePanelCollapsed}
            >
              <div className={styles.engineHeaderLeft}>
                <span
                  className={`${styles.engineChevron} ${
                    isOraclePanelCollapsed ? styles.engineChevronCollapsed : ""
                  }`}
                >
                  &#9660;
                </span>
                <span className={styles.engineTitle}>Oracle AI Vector Search</span>
                <span className={styles.engineCount}>
                  {isOracleSearchFailed ? "Error" : `${oracleResults.length} pares`}
                </span>
              </div>
              <span className={styles.engineDescription}>
                Busqueda vectorial nativa de Oracle Database.
              </span>
            </button>

            {!isOraclePanelCollapsed && (
              <div className={styles.engineBody}>
                {!oracleData ? (
                  <p className={styles.emptyState}>
                    No hay resultados disponibles para Oracle AI Vector Search.
                  </p>
                ) : isOracleSearchFailed ? (
                  <Alert severity="error">
                    {oracleData.run.errorMessage ??
                      "La deteccion fallo para Oracle AI Vector Search."}
                  </Alert>
                ) : (
                  <AgentDuplicateDetectionResultsTable
                    results={oracleResults}
                    deletingTaskId={deletingTaskId}
                    onDeleteTask={handleDeleteTask}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Loading fallback for direct navigation */}
      {isPipelineRunning && pipelineStep === "running_oracle_vector_search" && (
        <div className={styles.loadingState}>
          <CircularProgress size={26} />
          <p className={styles.loadingText}>Cargando resultados...</p>
        </div>
      )}

      {/* Delete confirmation modal */}
      <AppModal
        open={Boolean(pendingDelete)}
        onClose={closePendingDelete}
        title="Confirmar eliminacion"
      >
        <div style={{ width: "100%" }}>
          <p>
            ¿Eliminar la tarea {pendingDelete?.label}:{" "}
            <strong>{pendingDelete?.title}</strong>? Esta accion no se puede
            deshacer.
          </p>
          <p className={styles.deleteWarningHint}>
            La tarea sera eliminada y removida de los resultados.
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 8,
              marginTop: 16,
            }}
          >
            <Button
              onClick={closePendingDelete}
              disabled={Boolean(deletingTaskId)}
            >
              Cancelar
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={performDeleteTask}
              disabled={Boolean(deletingTaskId)}
            >
              {deletingTaskId ? "Eliminando..." : "Eliminar"}
            </Button>
          </div>
        </div>
      </AppModal>
    </div>
  );
};
