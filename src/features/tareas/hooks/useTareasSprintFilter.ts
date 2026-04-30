import { useEffect, useMemo, useState } from "react";
import type { SelectChangeEvent } from "@mui/material";
import { useQueries } from "@tanstack/react-query";
import { getProjectSprints } from "@/features/proyectos/services/proyectoService";
import type { Sprint } from "@/features/proyectos/types/proyecto";
import type { Tarea } from "@/features/tareas/types/tarea";

const ALL_SPRINTS_VALUE = "__ALL_SPRINTS__";

interface UseTareasSprintFilterArgs {
  projectIds: string[];
  tareas: Tarea[];
}

interface UseTareasSprintFilterResult {
  sprints: Sprint[];
  sprintNameById: Record<string, string>;
  selectedSprintIds: string[];
  filteredTareas: Tarea[];
  isLoading: boolean;
  allSprintsSelected: boolean;
  allSprintsValue: string;
  handleSprintChange: (event: SelectChangeEvent<string[]>) => void;
}

export const useTareasSprintFilter = ({
  projectIds,
  tareas,
}: UseTareasSprintFilterArgs): UseTareasSprintFilterResult => {
  const sprintQueries = useQueries({
    queries: projectIds.map((projectId) => ({
      queryKey: ["sprints", projectId],
      queryFn: () => getProjectSprints(projectId),
      enabled: !!projectId,
    })),
  });

  const sprints = useMemo(() => {
    const byId = new Map<string, Sprint>();

    sprintQueries.forEach((query) => {
      (query.data ?? []).forEach((sprint) => {
        if (!byId.has(sprint.sprintId)) {
          byId.set(sprint.sprintId, sprint);
        }
      });
    });

    return Array.from(byId.values()).sort((a, b) => {
      const aTime = Date.parse(a.fechaInicio);
      const bTime = Date.parse(b.fechaInicio);

      if (!Number.isNaN(aTime) && !Number.isNaN(bTime) && aTime !== bTime) {
        return aTime - bTime;
      }

      return a.nombre.localeCompare(b.nombre, "es", { sensitivity: "base" });
    });
  }, [sprintQueries]);

  const sprintNameById = useMemo(
    () => Object.fromEntries(sprints.map((sprint) => [sprint.sprintId, sprint.nombre])),
    [sprints]
  );

  const [selectedSprintIds, setSelectedSprintIds] = useState<string[]>([]);
  const [selectionReady, setSelectionReady] = useState(false);

  const projectKey = useMemo(
    () => projectIds.slice().sort().join("|"),
    [projectIds]
  );

  useEffect(() => {
    setSelectedSprintIds([]);
    setSelectionReady(false);
  }, [projectKey]);

  useEffect(() => {
    if (sprints.length === 0) {
      setSelectedSprintIds((current) => (current.length === 0 ? current : []));
      return;
    }

    if (!selectionReady) {
      setSelectedSprintIds(sprints.map((sprint) => sprint.sprintId));
      setSelectionReady(true);
      return;
    }

    setSelectedSprintIds((current) => {
      const allowed = new Set(sprints.map((sprint) => sprint.sprintId));
      const next = current.filter((id) => allowed.has(id));

      if (next.length === 0) {
        return sprints.map((sprint) => sprint.sprintId);
      }

      if (next.length === current.length) {
        return current;
      }

      return next;
    });
  }, [selectionReady, sprints]);

  const allSprintIds = useMemo(() => sprints.map((sprint) => sprint.sprintId), [sprints]);

  const allSprintsSelected =
    allSprintIds.length > 0 && selectedSprintIds.length === allSprintIds.length;

  const handleSprintChange = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value;
    const next = typeof value === "string" ? value.split(",") : value;

    if (next.includes(ALL_SPRINTS_VALUE)) {
      setSelectedSprintIds(allSprintIds);
      return;
    }

    setSelectedSprintIds(next);
  };

  const filteredTareas = useMemo(() => {
    if (
      selectedSprintIds.length === 0 ||
      sprints.length === 0 ||
      allSprintsSelected
    ) {
      return tareas;
    }

    const allowed = new Set(selectedSprintIds);
    return tareas.filter((tarea) => tarea.sprintId && allowed.has(tarea.sprintId));
  }, [allSprintsSelected, selectedSprintIds, sprints.length, tareas]);

  const isLoading = sprintQueries.some((query) => query.isLoading);

  return {
    sprints,
    sprintNameById,
    selectedSprintIds,
    filteredTareas,
    isLoading,
    allSprintsSelected,
    allSprintsValue: ALL_SPRINTS_VALUE,
    handleSprintChange,
  };
};
