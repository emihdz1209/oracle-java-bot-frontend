import { useEffect, useMemo, useRef, useState } from "react";
import {
  CircularProgress,
  Button,
  FormControl,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
} from "@mui/material";
import type { SelectChangeEvent } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useManagedProjects } from "@/features/dashboard/hooks/dashboard";
import {
  useMultiProjectTareas,
  useCreateTarea,
  useUpdateTareaStatus,
  useDeleteTarea,
} from "@/features/tareas/hooks/useTareas";
import { useTareasSprintFilter } from "@/features/tareas/hooks/useTareasSprintFilter";
import type {
  CreateTareaRequest,
  Tarea,
  TareaResponsable,
} from "@/features/tareas/types/tarea";
import { CreateTareaForm } from "@/features/tareas/components/CreateTareaForm";
import { TareaList } from "@/features/tareas/components/TareaList";
import { TareasModal } from "@/features/tareas/components/TareasModal";
import { NavBar } from "@/shared/pages/NavBar";
import { AppModal, useAppModal } from "@/shared/components/AppModal";

const PRIORIDADES = [
  { prioridadId: 1, nombre: "Alta" },
  { prioridadId: 2, nombre: "Media" },
  { prioridadId: 3, nombre: "Baja" },
];

const PROJECT_SELECTION_STORAGE_PREFIX = "tareas.selectedProjectIds";
const ALL_DEVELOPERS_VALUE = "__ALL_DEVELOPERS__";

const getDeveloperKey = (responsable: TareaResponsable) => {
  const userId = responsable.userId?.trim();

  if (userId) {
    return `id:${userId.replace(/-/g, "").toLowerCase()}`;
  }

  const nombre = responsable.nombre?.trim().toLocaleLowerCase("es-MX");
  return nombre ? `nombre:${nombre}` : null;
};

const getProjectSelectionStorageKey = (userId?: string) =>
  `${PROJECT_SELECTION_STORAGE_PREFIX}.${userId || "anonymous"}`;

const readStoredProjectSelection = (storageKey: string): string[] | null => {
  try {
    const rawValue = localStorage.getItem(storageKey);

    if (rawValue === null) {
      return null;
    }

    const parsedValue: unknown = JSON.parse(rawValue);

    if (!Array.isArray(parsedValue)) {
      return null;
    }

    return parsedValue.filter((value): value is string => typeof value === "string");
  } catch {
    return null;
  }
};

const persistProjectSelection = (storageKey: string, selectedIds: string[]) => {
  try {
    localStorage.setItem(storageKey, JSON.stringify(selectedIds));
  } catch {
    // Ignore storage errors to keep filters functional.
  }
};


export const TareasPage = () => {
  const { auth } = useAuth();
  const userId = auth.user?.userId;
  const storageKey = getProjectSelectionStorageKey(userId);

  const { data: allProjects = [], isLoading: loadingProjects } = useManagedProjects(userId);

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [initialized, setInitialized] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [excludedDeveloperKeys, setExcludedDeveloperKeys] = useState<string[]>([]);
  const [createError, setCreateError] = useState<string | null>(null);
  const [createSuccess, setCreateSuccess] = useState(false);
  const createSuccessCloseTimerRef = useRef<number | null>(null);
  const createModal = useAppModal();

  const clearCreateSuccessCloseTimer = () => {
    if (createSuccessCloseTimerRef.current !== null) {
      window.clearTimeout(createSuccessCloseTimerRef.current);
      createSuccessCloseTimerRef.current = null;
    }
  };

  useEffect(() => {
    setInitialized(false);
    setSelectedIds([]);
    setSelectedTaskId(null);
    setExcludedDeveloperKeys([]);
  }, [storageKey]);

  // Initialize selected projects from persisted selection; fallback to all projects.
  useEffect(() => {
    if (loadingProjects || initialized || allProjects.length === 0) {
      return;
    }

    const storedSelection = readStoredProjectSelection(storageKey);

    if (storedSelection === null) {
      setSelectedIds(allProjects.length > 0 ? [allProjects[0].projectId] : []);
      setInitialized(true);
      return;
    }

    const allowedProjectIds = new Set(allProjects.map((project) => project.projectId));
    const validStoredSelection = storedSelection.filter((projectId) => allowedProjectIds.has(projectId));

    setSelectedIds(validStoredSelection);
    setInitialized(true);
  }, [allProjects, initialized, loadingProjects, storageKey]);

  useEffect(() => {
    if (!initialized) {
      return;
    }

    persistProjectSelection(storageKey, selectedIds);
  }, [initialized, selectedIds, storageKey]);

  useEffect(() => {
    return () => {
      if (createSuccessCloseTimerRef.current !== null) {
        window.clearTimeout(createSuccessCloseTimerRef.current);
      }
    };
  }, []);

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value;
    setSelectedIds(typeof value === "string" ? value.split(",") : value);
    setSelectedTaskId(null);
    setExcludedDeveloperKeys([]);
  };

  const handleSprintSelectionChange = (event: SelectChangeEvent<string[]>) => {
    handleSprintChange(event);
    setSelectedTaskId(null);
  };

  const selectAll = () => {
    setSelectedIds(allProjects.map((p) => p.projectId));
    setSelectedTaskId(null);
    setExcludedDeveloperKeys([]);
  };

  const unselectAll = () => {
    setSelectedIds([]);
    setSelectedTaskId(null);
    setExcludedDeveloperKeys([]);
  };

  const nameMap: Record<string, string> = {};
  allProjects.forEach((p) => (nameMap[p.projectId] = p.nombre));

  // Fetch tasks for all selected projects in parallel
  const { data: allTareas, isLoading: loadingTareas } = useMultiProjectTareas(selectedIds);
  const {
    sprints,
    sprintNameById,
    selectedSprintIds,
    filteredTareas,
    isLoading: loadingSprints,
    allSprintsSelected,
    allSprintsValue,
    handleSprintChange,
  } = useTareasSprintFilter({ projectIds: selectedIds, tareas: allTareas });

  const developers = useMemo(() => {
    const byKey = new Map<string, { key: string; nombre: string }>();

    allTareas.forEach((tarea) => {
      (tarea.responsables ?? []).forEach((responsable) => {
        const key = getDeveloperKey(responsable);
        const nombre = responsable.nombre?.trim() || responsable.userId?.trim();

        if (key && nombre && !byKey.has(key)) {
          byKey.set(key, { key, nombre });
        }
      });
    });

    return Array.from(byKey.values()).sort((a, b) =>
      a.nombre.localeCompare(b.nombre, "es", { sensitivity: "base" })
    );
  }, [allTareas]);

  const allDeveloperKeys = developers.map((developer) => developer.key);
  const developerNameByKey = Object.fromEntries(
    developers.map((developer) => [developer.key, developer.nombre])
  );
  const selectedDeveloperKeys = allDeveloperKeys.filter(
    (key) => !excludedDeveloperKeys.includes(key)
  );
  const allDevelopersSelected =
    allDeveloperKeys.length > 0 && selectedDeveloperKeys.length === allDeveloperKeys.length;

  const handleDeveloperSelectionChange = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value;
    const nextSelected = typeof value === "string" ? value.split(",") : value;

    if (nextSelected.includes(ALL_DEVELOPERS_VALUE)) {
      setExcludedDeveloperKeys(allDevelopersSelected ? allDeveloperKeys : []);
      setSelectedTaskId(null);
      return;
    }

    const selected = new Set(nextSelected);
    setExcludedDeveloperKeys(allDeveloperKeys.filter((key) => !selected.has(key)));
    setSelectedTaskId(null);
  };

  const developerFilteredTareas = useMemo(() => {
    if (developers.length === 0 || allDevelopersSelected) {
      return filteredTareas;
    }

    if (selectedDeveloperKeys.length === 0) {
      return [];
    }

    const selected = new Set(selectedDeveloperKeys);

    return filteredTareas.filter((tarea) =>
      (tarea.responsables ?? []).some((responsable) => {
        const key = getDeveloperKey(responsable);
        return key ? selected.has(key) : false;
      })
    );
  }, [allDevelopersSelected, developers.length, filteredTareas, selectedDeveloperKeys]);

  // Projects currently visible in the filter — used to populate the create form
  const selectedProjects = allProjects.filter((p) => selectedIds.includes(p.projectId));

  const createMutation = useCreateTarea();
  // Pass undefined so mutations rely on global ["tareas"] invalidation
  const statusMutation = useUpdateTareaStatus(undefined);
  const deleteMutation = useDeleteTarea(undefined);

  const handleOpenCreateModal = () => {
    clearCreateSuccessCloseTimer();
    setCreateError(null);
    setCreateSuccess(false);
    createModal.openModal();
  };

  const handleCloseCreateModal = () => {
    clearCreateSuccessCloseTimer();
    setCreateError(null);
    if (!createSuccess) {
      setCreateSuccess(false);
    }
    createModal.closeModal();
  };

  const handleCreate = (data: {
    projectId: string;
    titulo: string;
    descripcion: string;
    fechaLimite: string;
    prioridadId: number;
    sprintId: string;
    tiempoEstimado: number | null;
  }) => {
    const payload: CreateTareaRequest = {
      titulo: data.titulo,
      descripcion: data.descripcion,
      fechaLimite: data.fechaLimite,
      prioridadId: data.prioridadId,
      ...(data.sprintId && { sprintId: data.sprintId }),
      ...(data.tiempoEstimado !== null && { tiempoEstimado: data.tiempoEstimado }),
    };

    setCreateError(null);

    createMutation.mutate(
      { projectId: data.projectId, data: payload },
      {
        onSuccess: () => {
          setCreateError(null);
          setCreateSuccess(true);
          clearCreateSuccessCloseTimer();
          createSuccessCloseTimerRef.current = window.setTimeout(() => {
            createModal.closeModal();
            createSuccessCloseTimerRef.current = null;
          }, 1000);
        },
        onError: () => {
          setCreateSuccess(false);
          setCreateError("No se pudo crear la tarea. Verifica los datos e intenta nuevamente.");
        },
      }
    );
  };

  const handleDelete = (taskId: string) => deleteMutation.mutate(taskId);

  const handleOpenTaskDetails = (taskId: string) => setSelectedTaskId(taskId);

  const handleCloseTaskDetails = () => setSelectedTaskId(null);

  const handleStatusChange = (tarea: Tarea, newEstadoId: number) =>
    statusMutation.mutate({ taskId: tarea.taskId, estadoId: newEstadoId });

  useEffect(() => {
    if (!selectedTaskId) {
      return;
    }

    const exists = developerFilteredTareas.some((tarea) => tarea.taskId === selectedTaskId);
    if (!exists) {
      setSelectedTaskId(null);
    }
  }, [developerFilteredTareas, selectedTaskId]);

  // Derive the projectId from the selected task so the modal can use it
  const selectedTaskProjectId =
    selectedTaskId != null
      ? developerFilteredTareas.find((t) => t.taskId === selectedTaskId)?.projectId
      : undefined;

  const isSideModalOpen = Boolean(selectedTaskId);
  const allSelected = selectedIds.length === allProjects.length && allProjects.length > 0;

  return (
    <div className="App">
      <NavBar />

      <div className="page-header">
        <div>
          <h2>Tareas</h2>
          <p className="page-subtitle">Gestión de tareas por estado</p>
        </div>
        <Button
          className="AddButton"
          startIcon={<AddIcon />}
          onClick={handleOpenCreateModal}
          disabled={selectedIds.length === 0}
        >
          Nueva tarea
        </Button>
      </div>

      <div className={`tareas-layout ${isSideModalOpen ? "tareas-layout--with-panel" : ""}`}>
        <div className="tareas-main">
          <div className="tareas-board-container">
            {/* Filters */}
            <div className="filter-bar">
              <span className="section-label" style={{ margin: 0 }}>Proyectos</span>

              {loadingProjects ? (
                <CircularProgress size={20} />
              ) : (
                <>
                  <FormControl size="small" style={{ width: 280 }}>
                    <Select
                      multiple
                      value={selectedIds}
                      onChange={handleChange}
                      renderValue={(sel) =>
                        sel.length === 0
                          ? "Ninguno seleccionado"
                          : sel.length === allProjects.length
                          ? "Todos los proyectos"
                          : sel.map((id) => nameMap[id] ?? id).join(", ")
                      }
                      displayEmpty
                    >
                      {allProjects.map((p) => (
                        <MenuItem key={p.projectId} value={p.projectId}>
                          <Checkbox checked={selectedIds.includes(p.projectId)} size="small" />
                          <ListItemText primary={p.nombre} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <Button
                    size="small"
                    variant="outlined"
                    onClick={allSelected ? unselectAll : selectAll}
                    style={{ textTransform: "none", fontSize: "0.75rem" }}
                    disabled={allProjects.length === 0}
                  >
                    {allSelected ? "Desel. todo" : "Sel. todo"}
                  </Button>
                </>
              )}

              <span className="section-label" style={{ margin: 0, marginLeft: 16 }}>
                Sprints
              </span>

              {loadingSprints && selectedIds.length > 0 ? (
                <CircularProgress size={20} />
              ) : (
                <FormControl size="small" style={{ width: 260 }}>
                  <Select
                    multiple
                    value={selectedSprintIds}
                    onChange={handleSprintSelectionChange}
                    renderValue={(sel) => {
                      if (sprints.length === 0) {
                        return "Sin sprints";
                      }

                      if (allSprintsSelected) {
                        return "Todos los sprints";
                      }

                      if (sel.length === 0) {
                        return "Seleccionar sprints";
                      }

                      return sel.map((id) => sprintNameById[id] ?? id).join(", ");
                    }}
                    displayEmpty
                    disabled={selectedIds.length === 0 || sprints.length === 0}
                  >
                    <MenuItem value={allSprintsValue} disabled={sprints.length === 0}>
                      <Checkbox checked={allSprintsSelected} size="small" />
                      <ListItemText primary="Todos los sprints" />
                    </MenuItem>
                    {sprints.map((sprint) => (
                      <MenuItem key={sprint.sprintId} value={sprint.sprintId}>
                        <Checkbox
                          checked={selectedSprintIds.includes(sprint.sprintId)}
                          size="small"
                        />
                        <ListItemText primary={sprint.nombre} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}

              <div className="developer-filter-row">
                <span className="section-label" style={{ margin: 0 }}>
                  Developers
                </span>

                <FormControl size="small" style={{ width: 280 }}>
                  <Select
                    multiple
                    value={selectedDeveloperKeys}
                    onChange={handleDeveloperSelectionChange}
                    renderValue={(sel) => {
                      if (developers.length === 0) {
                        return "Sin developers";
                      }

                      if (allDevelopersSelected) {
                        return "Todos los developers";
                      }

                      if (sel.length === 0) {
                        return "Ningún developer";
                      }

                      return sel.map((key) => developerNameByKey[key] ?? key).join(", ");
                    }}
                    displayEmpty
                    disabled={selectedIds.length === 0 || developers.length === 0}
                  >
                    <MenuItem value={ALL_DEVELOPERS_VALUE} disabled={developers.length === 0}>
                      <Checkbox checked={allDevelopersSelected} size="small" />
                      <ListItemText primary="Seleccionar todos" />
                    </MenuItem>
                    {developers.map((developer) => (
                      <MenuItem key={developer.key} value={developer.key}>
                        <Checkbox
                          checked={selectedDeveloperKeys.includes(developer.key)}
                          size="small"
                        />
                        <ListItemText primary={developer.nombre} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                {selectedIds.length > 0 && (
                  <span className="filter-count">
                    {developerFilteredTareas.length} tarea
                    {developerFilteredTareas.length !== 1 ? "s" : ""}
                  </span>
                )}
              </div>
            </div>

            {/* Kanban */}
            {loadingTareas ? (
              <CircularProgress style={{ marginTop: 40 }} />
            ) : selectedIds.length === 0 ? (
              <p style={{ color: "var(--text-3)", fontSize: "0.875rem", marginTop: 24 }}>
                Selecciona al menos un proyecto para ver las tareas.
              </p>
            ) : (
              <TareaList
                tareas={developerFilteredTareas}
                onDelete={handleDelete}
                onStatusChange={handleStatusChange}
                onOpenDetails={handleOpenTaskDetails}
              />
            )}
          </div>
        </div>

        {isSideModalOpen && (
          <TareasModal
            taskId={selectedTaskId}
            projectId={selectedTaskProjectId}
            onClose={handleCloseTaskDetails}
          />
        )}
      </div>

      {/* Create modal */}
      <AppModal
        open={createModal.isOpen}
        onClose={handleCloseCreateModal}
        title="Nueva tarea"
        hideActions={createSuccess}
        hideCloseButton={createSuccess}
      >
        {createSuccess ? (
          <div className="create-tarea-success" role="status" aria-live="polite">
            La tarea ha sido creada correctamente
          </div>
        ) : (
          <CreateTareaForm
            onSubmit={handleCreate}
            isPending={createMutation.isPending}
            projects={selectedProjects}
            prioridades={PRIORIDADES}
            submitError={createError}
            onClearSubmitError={() => setCreateError(null)}
          />
        )}
      </AppModal>
    </div>
  );
};
