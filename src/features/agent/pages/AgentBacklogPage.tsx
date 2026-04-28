import { useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Alert,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

import { ROUTES } from "@/app/router/routes";
import { NavBar } from "@/shared/pages/NavBar";
import { AppModal } from "@/shared/components/AppModal";
import { useProyecto, useProjectSprints } from "@/features/proyectos/hooks/useProyectos";
import { useTaskPriorities } from "@/features/taskPriorities/taskPriorities/hooks/useTaskPriorities";
import { useAiSuggestions } from "@/features/agent/hooks/useAiBacklog";
import {
  approveAiSuggestion,
  rejectAiSuggestion,
} from "@/features/agent/services/aiBacklogService";
import type {
  AiSuggestionStatus,
  AiTaskSuggestion,
} from "@/features/agent/types/aiBacklog";
import {
  resolvePriorityId,
  toApiDateTime,
} from "@/features/tareas/components/tareasModal/tareasModalUtils";
import styles from "@/features/agent/styles/AgentBacklogPage.module.css";

const COLUMNS: Array<{
  status: AiSuggestionStatus;
  label: string;
  accent: string;
  headerBg: string;
  headerBorder: string;
  countBg: string;
  countColor: string;
}> = [
  {
    status: "PENDING",
    label: "Pending",
    accent: "#D97706",
    headerBg: "#FFFBEB",
    headerBorder: "#FDE68A",
    countBg: "#FCD34D",
    countColor: "#78350F",
  },
  {
    status: "APPROVED",
    label: "Aceptadas",
    accent: "#16A34A",
    headerBg: "#F0FDF4",
    headerBorder: "#BBF7D0",
    countBg: "#BBF7D0",
    countColor: "#14532D",
  },
  {
    status: "REJECTED",
    label: "Rechazadas",
    accent: "#DC2626",
    headerBg: "#FEF2F2",
    headerBorder: "#FECACA",
    countBg: "#FECACA",
    countColor: "#991B1B",
  },
];

const sortSuggestions = (list: AiTaskSuggestion[]) =>
  [...list].sort((a, b) => {
    const da = new Date(a.createdAt).getTime();
    const db = new Date(b.createdAt).getTime();
    return da - db;
  });

const getDefaultFechaLimite = () => {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T17:00`;
};

const getTodayDateValue = () => {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
};

const getMinFechaLimite = () => `${getTodayDateValue()}T00:00`;

const EMPTY_SUGGESTIONS: AiTaskSuggestion[] = [];

interface ApprovalDraft {
  fechaLimite: string;
  prioridadId: number;
  sprintId: string | null;
}

interface ApprovalFormState {
  fechaLimite: string;
  prioridadId: string;
  sprintId: string;
}

interface ApprovalTarget {
  aiTaskId: string;
  previousStatus?: AiSuggestionStatus;
  revertOnCancel?: boolean;
}

interface AiSuggestionBoardProps {
  suggestions: AiTaskSuggestion[];
  statusMap: Record<string, AiSuggestionStatus>;
  approvalMap: Record<string, ApprovalDraft>;
  priorityNameMap: Map<number, string>;
  onStatusChange: (
    aiTaskId: string,
    nextStatus: AiSuggestionStatus,
    previousStatus: AiSuggestionStatus
  ) => void;
  onEditApproval: (aiTaskId: string) => void;
}

const formatShortDate = (value: string | null | undefined) => {
  if (!value) {
    return "—";
  }

  const parsed = new Date(value);

  if (Number.isNaN(parsed.getTime())) {
    return value;
  }

  return parsed.toLocaleDateString("es-MX", { day: "2-digit", month: "short" });
};

const AiSuggestionsBoard = ({
  suggestions,
  statusMap,
  approvalMap,
  priorityNameMap,
  onStatusChange,
  onEditApproval,
}: AiSuggestionBoardProps) => {
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [dropStatus, setDropStatus] = useState<AiSuggestionStatus | null>(null);
  const [columnHeight, setColumnHeight] = useState(560);
  const boardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const updateColumnHeight = () => {
      const boardTop = boardRef.current?.getBoundingClientRect().top;

      if (boardTop === undefined) {
        return;
      }

      const viewportHeight = window.innerHeight;
      const appContainer = boardRef.current?.closest(".App") as HTMLElement | null;
      const appPaddingBottom = appContainer
        ? Number.parseFloat(window.getComputedStyle(appContainer).paddingBottom || "0")
        : 0;
      const nextHeight = Math.max(
        260,
        Math.floor(viewportHeight - boardTop - appPaddingBottom - 8)
      );

      setColumnHeight((current) => (current === nextHeight ? current : nextHeight));
    };

    updateColumnHeight();
    window.addEventListener("resize", updateColumnHeight);

    return () => {
      window.removeEventListener("resize", updateColumnHeight);
    };
  }, [suggestions.length]);

  if (!suggestions || suggestions.length === 0) {
    return <p className="kanban-empty">No hay sugerencias generadas</p>;
  }

  const boardStyle = {
    ["--kanban-column-height" as string]: `${columnHeight}px`,
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
  } as CSSProperties;

  const resolveStatus = (suggestion: AiTaskSuggestion): AiSuggestionStatus =>
    statusMap[suggestion.aiTaskId] ?? suggestion.status ?? "PENDING";

  const resolveApproval = (suggestionId: string) => approvalMap[suggestionId];

  const handleCardDragStart = (suggestionId: string, event: React.DragEvent<HTMLDivElement>) => {
    setDraggedId(suggestionId);

    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("application/x-ai-suggestion-id", suggestionId);
    event.dataTransfer.setData("text/plain", suggestionId);
  };

  const handleCardDragEnd = () => {
    setDraggedId(null);
    setDropStatus(null);
  };

  const getDraggedSuggestion = (event: React.DragEvent<HTMLDivElement>) => {
    const dataId =
      event.dataTransfer.getData("application/x-ai-suggestion-id") ||
      event.dataTransfer.getData("text/plain") ||
      draggedId;

    if (!dataId) {
      return null;
    }

    return suggestions.find((suggestion) => suggestion.aiTaskId === dataId) || null;
  };

  const handleColumnDragOver = (status: AiSuggestionStatus, event: React.DragEvent<HTMLDivElement>) => {
    if (!draggedId) {
      return;
    }

    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
    setDropStatus(status);
  };

  const handleColumnDrop = (status: AiSuggestionStatus, event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    const draggedSuggestion = getDraggedSuggestion(event);

    setDropStatus(null);
    setDraggedId(null);

    if (!draggedSuggestion) {
      return;
    }

    const previousStatus = resolveStatus(draggedSuggestion);

    if (previousStatus === status) {
      return;
    }

    onStatusChange(draggedSuggestion.aiTaskId, status, previousStatus);
  };

  return (
    <div className="kanban-board" ref={boardRef} style={boardStyle}>
      {COLUMNS.map(({ status, label, accent, headerBg, headerBorder, countBg, countColor }) => {
        const cards = sortSuggestions(
          suggestions.filter((suggestion) => resolveStatus(suggestion) === status)
        );

        return (
          <div
            key={status}
            className={`kanban-column kanban-column-drop-target ${dropStatus === status ? "is-drop-active" : ""}`}
            onDragOver={(event) => handleColumnDragOver(status, event)}
            onDragEnter={(event) => handleColumnDragOver(status, event)}
            onDragLeave={() => {
              setDropStatus((current) => (current === status ? null : current));
            }}
            onDrop={(event) => handleColumnDrop(status, event)}
          >
            <div
              className="kanban-col-header"
              style={{ background: headerBg, borderBottomColor: headerBorder }}
            >
              <span className="kanban-col-label" style={{ color: accent }}>
                {label}
              </span>
              <span className="kanban-col-count" style={{ background: countBg, color: countColor }}>
                {cards.length}
              </span>
            </div>

            <div className="kanban-col-body">
              {cards.length === 0 && (
                <p className="kanban-col-empty">Sin sugerencias</p>
              )}

              {cards.map((suggestion) => {
                const approval = resolveApproval(suggestion.aiTaskId);
                const priorityLabel =
                  approval?.prioridadId ? priorityNameMap.get(approval.prioridadId) : undefined;

                return (
                  <div
                    key={suggestion.aiTaskId}
                    className={`tarea-card tarea-card-clickable ${draggedId === suggestion.aiTaskId ? "tarea-card--dragging" : ""}`}
                    draggable
                    onDragStart={(event) => handleCardDragStart(suggestion.aiTaskId, event)}
                    onDragEnd={handleCardDragEnd}
                    aria-label={suggestion.titulo}
                  >
                    <div className={styles.cardMeta}>
                      <span className={styles.cardBadge}>
                        {suggestion.tiempoEstimado} hrs
                      </span>
                      <span className={styles.cardDate}>
                        {approval?.fechaLimite
                          ? formatShortDate(approval.fechaLimite)
                          : "—"}
                      </span>
                    </div>

                    <p className="tarea-titulo">{suggestion.titulo}</p>
                    <p className={styles.cardDescription}>{suggestion.descripcion}</p>

                    <div className={styles.cardFooter}>
                      <span className={styles.cardTag}>
                        {priorityLabel ? `Prioridad: ${priorityLabel}` : "Prioridad pendiente"}
                      </span>

                      {resolveStatus(suggestion) === "APPROVED" && (
                        <button
                          type="button"
                          className={styles.cardAction}
                          onClick={(event) => {
                            event.stopPropagation();
                            onEditApproval(suggestion.aiTaskId);
                          }}
                        >
                          Editar datos
                        </button>
                      )}
                    </div>

                    {resolveStatus(suggestion) === "APPROVED" && !approval && (
                      <span className={styles.cardWarning}>
                        Completa fecha limite y prioridad
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export const AgentBacklogPage = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const { data: project, isLoading: projectLoading } = useProyecto(projectId);
  const {
    data: suggestionsData,
    isLoading: suggestionsLoading,
    isFetching: suggestionsFetching,
    isError: suggestionsError,
    refetch: refetchSuggestions,
  } = useAiSuggestions(projectId);
  const suggestions = suggestionsData ?? EMPTY_SUGGESTIONS;
  const { data: rawPriorities = [], isLoading: prioritiesLoading } = useTaskPriorities();
  const { data: sprints = [], isLoading: sprintsLoading } = useProjectSprints(projectId);

  const priorityOptions = useMemo(() => {
    return (rawPriorities || [])
      .map((priority) => {
        const prioridadId = resolvePriorityId(priority);

        if (prioridadId === null) {
          return null;
        }

        return {
          prioridadId,
          nombre: priority.nombre,
          orden: priority.orden,
        };
      })
      .filter(
        (priority): priority is { prioridadId: number; nombre: string; orden: number } =>
          priority !== null
      )
      .sort((a, b) => a.orden - b.orden);
  }, [rawPriorities]);

  const priorityNameMap = useMemo(
    () => new Map(priorityOptions.map((priority) => [priority.prioridadId, priority.nombre])),
    [priorityOptions]
  );

  const [statusMap, setStatusMap] = useState<Record<string, AiSuggestionStatus>>({});
  const [approvalMap, setApprovalMap] = useState<Record<string, ApprovalDraft>>({});
  const [approvalTarget, setApprovalTarget] = useState<ApprovalTarget | null>(null);
  const [approvalForm, setApprovalForm] = useState<ApprovalFormState>({
    fechaLimite: "",
    prioridadId: "",
    sprintId: "",
  });
  const [approvalError, setApprovalError] = useState<string | null>(null);
  const [applyError, setApplyError] = useState<string | null>(null);
  const [applySuccess, setApplySuccess] = useState<string | null>(null);
  const [isApplying, setIsApplying] = useState(false);
  const [isWaitingForSuggestions, setIsWaitingForSuggestions] = useState(true);

  useEffect(() => {
    if (!suggestions) {
      return;
    }

    setStatusMap((current) => {
      let changed = false;
      const suggestionIds = new Set<string>();
      const next: Record<string, AiSuggestionStatus> = {};

      suggestions.forEach((suggestion) => {
        suggestionIds.add(suggestion.aiTaskId);
        const nextStatus = current[suggestion.aiTaskId] ?? suggestion.status ?? "PENDING";
        next[suggestion.aiTaskId] = nextStatus;

        if (current[suggestion.aiTaskId] !== nextStatus) {
          changed = true;
        }
      });

      if (!changed) {
        const currentKeys = Object.keys(current);

        if (currentKeys.length !== suggestionIds.size) {
          changed = true;
        } else {
          for (const key of currentKeys) {
            if (!suggestionIds.has(key)) {
              changed = true;
              break;
            }
          }
        }
      }

      return changed ? next : current;
    });
  }, [suggestions]);

  useEffect(() => {
    if (suggestionsError) {
      setIsWaitingForSuggestions(false);
      return;
    }

    if (suggestions.length > 0) {
      setIsWaitingForSuggestions(false);
      return;
    }

    setIsWaitingForSuggestions(true);
  }, [suggestions.length, suggestionsError]);

  useEffect(() => {
    if (!isWaitingForSuggestions || suggestionsError) {
      return;
    }

    const intervalId = window.setInterval(() => {
      if (!suggestionsFetching) {
        refetchSuggestions();
      }
    }, 2500);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [isWaitingForSuggestions, refetchSuggestions, suggestionsError, suggestionsFetching]);

  useEffect(() => {
    if (!suggestions) {
      return;
    }

    setApprovalMap((current) => {
      const suggestionIds = new Set(suggestions.map((suggestion) => suggestion.aiTaskId));
      const keysToRemove = Object.keys(current).filter((key) => !suggestionIds.has(key));

      if (keysToRemove.length === 0) {
        return current;
      }

      const next = { ...current };

      keysToRemove.forEach((key) => {
        delete next[key];
      });

      return next;
    });
  }, [suggestions]);

  const openApprovalModal = (
    aiTaskId: string,
    options?: { previousStatus?: AiSuggestionStatus; revertOnCancel?: boolean }
  ) => {
    const existingDraft = approvalMap[aiTaskId];
    const defaultPriorityId = priorityOptions[0]?.prioridadId;

    setApprovalForm({
      fechaLimite: existingDraft?.fechaLimite ?? getDefaultFechaLimite(),
      prioridadId: existingDraft?.prioridadId
        ? String(existingDraft.prioridadId)
        : defaultPriorityId
        ? String(defaultPriorityId)
        : "",
      sprintId: existingDraft?.sprintId ?? "",
    });

    setApprovalError(null);
    setApprovalTarget({
      aiTaskId,
      previousStatus: options?.previousStatus,
      revertOnCancel: options?.revertOnCancel,
    });
  };

  const handleCloseApprovalModal = () => {
    if (approvalTarget?.revertOnCancel && approvalTarget.previousStatus) {
      setStatusMap((current) => ({
        ...current,
        [approvalTarget.aiTaskId]: approvalTarget.previousStatus as AiSuggestionStatus,
      }));
    }

    setApprovalTarget(null);
    setApprovalError(null);
  };

  const handleSaveApproval = () => {
    if (!approvalTarget) {
      return;
    }

    setApprovalError(null);

    if (!approvalForm.fechaLimite || !approvalForm.prioridadId) {
      setApprovalError("Completa fecha limite y prioridad para aceptar.");
      return;
    }

    const selectedDateValue = approvalForm.fechaLimite.slice(0, 10);
    if (selectedDateValue < getTodayDateValue()) {
      setApprovalError("La fecha limite no puede ser anterior al dia de hoy.");
      return;
    }

    const prioridadId = Number(approvalForm.prioridadId);

    if (!Number.isFinite(prioridadId)) {
      setApprovalError("Prioridad invalida.");
      return;
    }

    setApprovalMap((current) => ({
      ...current,
      [approvalTarget.aiTaskId]: {
        fechaLimite: approvalForm.fechaLimite,
        prioridadId,
        sprintId: approvalForm.sprintId || null,
      },
    }));

    setStatusMap((current) => ({
      ...current,
      [approvalTarget.aiTaskId]: "APPROVED",
    }));

    setApprovalTarget(null);
  };

  const handleStatusChange = (
    aiTaskId: string,
    nextStatus: AiSuggestionStatus,
    previousStatus: AiSuggestionStatus
  ) => {
    setStatusMap((current) => ({
      ...current,
      [aiTaskId]: nextStatus,
    }));

    if (nextStatus === "APPROVED" && !approvalMap[aiTaskId]) {
      openApprovalModal(aiTaskId, { previousStatus, revertOnCancel: true });
    }
  };

  const handleApplyDecisions = async () => {
    if (!projectId) {
      return;
    }

    setApplyError(null);
    setApplySuccess(null);

    const decisions = suggestions.map((suggestion) => {
      const localStatus = statusMap[suggestion.aiTaskId] ?? suggestion.status ?? "PENDING";
      return { suggestion, localStatus };
    });

    const toApprove = decisions.filter(
      ({ suggestion, localStatus }) => suggestion.status === "PENDING" && localStatus === "APPROVED"
    );
    const toReject = decisions.filter(
      ({ suggestion, localStatus }) => suggestion.status === "PENDING" && localStatus === "REJECTED"
    );

    if (toApprove.length === 0 && toReject.length === 0) {
      setApplyError("No hay cambios por aplicar.");
      return;
    }

    const missingApproval = toApprove.filter(
      ({ suggestion }) => !approvalMap[suggestion.aiTaskId]
    );

    if (missingApproval.length > 0) {
      setApplyError("Completa fecha limite y prioridad en las sugerencias aceptadas.");
      return;
    }

    setIsApplying(true);

    try {
      await Promise.all([
        ...toReject.map(({ suggestion }) => rejectAiSuggestion(suggestion.aiTaskId)),
        ...toApprove.map(({ suggestion }) => {
          const draft = approvalMap[suggestion.aiTaskId];
          const payload = {
            fechaLimite: toApiDateTime(draft.fechaLimite),
            prioridadId: draft.prioridadId,
            sprintId: draft.sprintId ?? null,
          };
          return approveAiSuggestion(suggestion.aiTaskId, payload);
        }),
      ]);

      const refreshed = await refetchSuggestions();
      const refreshedData = refreshed.data ?? [];
      setStatusMap(() => {
        const next: Record<string, AiSuggestionStatus> = {};
        refreshedData.forEach((suggestion) => {
          next[suggestion.aiTaskId] = suggestion.status ?? "PENDING";
        });
        return next;
      });

      setApplySuccess("Sugerencias procesadas correctamente.");
    } catch {
      setApplyError("No se pudieron procesar las sugerencias. Intenta nuevamente.");
    } finally {
      setIsApplying(false);
    }
  };

  const pendingChanges = useMemo(() => {
    return suggestions.filter((suggestion) => {
      const localStatus = statusMap[suggestion.aiTaskId] ?? suggestion.status ?? "PENDING";
      return suggestion.status === "PENDING" && localStatus !== "PENDING";
    }).length;
  }, [statusMap, suggestions]);

  if (!projectId) {
    return (
      <div className="App">
        <NavBar />
        <div className="page-header">
          <div>
            <h2>Agent · Generar tareas</h2>
            <p className="page-subtitle">Selecciona un proyecto valido para continuar.</p>
          </div>
          <Button className="AddButton" onClick={() => navigate(ROUTES.agent)}>
            Volver a Agent
          </Button>
        </div>
        <Alert severity="warning">No se encontro el proyecto seleccionado.</Alert>
      </div>
    );
  }

  return (
    <div className="App">
      <NavBar />

      <div className="page-header">
        <div>
          <h2>Agent · Generar tareas</h2>
          <p className="page-subtitle">
            Revisa las sugerencias, arrastralas y confirma con "Guardar Cambios".
          </p>
        </div>
        <Button
          className="AddButton"
          onClick={handleApplyDecisions}
          disabled={isApplying || suggestionsLoading || pendingChanges === 0}
        >
          {isApplying ? "Procesando..." : "Guardar Cambios"}
        </Button>
      </div>

      <div className={styles.introBar}>
        <div>
          <span className="section-label">Proyecto</span>
          <div className={styles.projectName}>
            {projectLoading ? "Cargando..." : project?.nombre ?? projectId}
          </div>
        </div>
        <div className={styles.introActions}>
          <Button
            size="small"
            onClick={() => refetchSuggestions()}
            disabled={suggestionsLoading}
          >
            Actualizar
          </Button>
          <Button
            size="small"
            onClick={() => navigate(ROUTES.agent)}
            variant="outlined"
          >
            Volver
          </Button>
        </div>
      </div>

      {applyError && (
        <Alert severity="error" className={styles.feedback}>
          {applyError}
        </Alert>
      )}
      {applySuccess && (
        <Alert severity="success" className={styles.feedback}>
          {applySuccess}
        </Alert>
      )}

      <div className={`tareas-layout ${styles.backlogLayout}`}>
        <div className="tareas-main">
          <div className="tareas-board-container">
            {isWaitingForSuggestions ? (
              <div className={styles.loadingState}>
                <CircularProgress size={28} />
                <p className={styles.loadingText}>Generando sugerencias...</p>
                <p className={styles.loadingHint}>
                  Esto puede tardar unos segundos. Mantente en esta pantalla.
                </p>
              </div>
            ) : suggestionsLoading ? (
              <div className={styles.loadingState}>
                <CircularProgress size={28} />
              </div>
            ) : suggestionsError ? (
              <Alert severity="error">
                No se pudieron cargar las sugerencias. Intenta nuevamente.
              </Alert>
            ) : (
              <AiSuggestionsBoard
                suggestions={suggestions}
                statusMap={statusMap}
                approvalMap={approvalMap}
                priorityNameMap={priorityNameMap}
                onStatusChange={handleStatusChange}
                onEditApproval={(aiTaskId) => openApprovalModal(aiTaskId)}
              />
            )}
          </div>
        </div>
      </div>

      <AppModal
        open={Boolean(approvalTarget)}
        onClose={handleCloseApprovalModal}
        title="Completar datos de aprobacion"
      >
        <div className={styles.approvalModalContent}>
          <form
            className="modal-form"
            onSubmit={(event) => {
              event.preventDefault();
              handleSaveApproval();
            }}
          >
            <TextField
              name="fechaLimite"
              label="Fecha limite"
              type="datetime-local"
              value={approvalForm.fechaLimite}
              onChange={(event) =>
                setApprovalForm((current) => ({
                  ...current,
                  fechaLimite: event.target.value,
                }))
              }
              required
              size="small"
              fullWidth
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
                htmlInput: {
                  min: getMinFechaLimite(),
                },
              }}
            />

            <FormControl size="small" required fullWidth>
              <InputLabel>Prioridad</InputLabel>
              <Select
                name="prioridadId"
                value={approvalForm.prioridadId}
                onChange={(event) =>
                  setApprovalForm((current) => ({
                    ...current,
                    prioridadId: event.target.value as string,
                  }))
                }
                label="Prioridad"
                disabled={prioritiesLoading}
              >
                {priorityOptions.map((priority) => (
                  <MenuItem key={priority.prioridadId} value={priority.prioridadId}>
                    {priority.nombre}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl size="small" fullWidth>
              <InputLabel>Sprint (opcional)</InputLabel>
              <Select
                name="sprintId"
                value={approvalForm.sprintId}
                onChange={(event) =>
                  setApprovalForm((current) => ({
                    ...current,
                    sprintId: event.target.value as string,
                  }))
                }
                label="Sprint (opcional)"
                disabled={sprintsLoading}
              >
                <MenuItem value="">
                  <em>Sin sprint</em>
                </MenuItem>
                {sprints.map((sprint) => (
                  <MenuItem key={sprint.sprintId} value={sprint.sprintId}>
                    {sprint.nombre}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {approvalError && (
              <p className={styles.formError} role="alert">
                {approvalError}
              </p>
            )}

            <Button
              className="AddButton"
              type="submit"
              fullWidth
              disabled={prioritiesLoading}
            >
              Guardar datos
            </Button>
          </form>
        </div>
      </AppModal>
    </div>
  );
};
