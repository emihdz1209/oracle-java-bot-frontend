import { useQuery, useQueries, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getTareasByProyecto,
  getTareaById,
  getTaskUsers,
  getTaskAssignments,
  assignUserToTask,
  removeUserFromTask,
  createTarea,
  updateTarea,
  updateTareaStatus,
  deleteTarea,
} from "@/features/tareas/services/tareaService";
import type { CreateTareaRequest, Tarea, UpdateTareaRequest } from "@/features/tareas/types/tarea";

export const useTareas = (projectId?: string) => {
  return useQuery({
    queryKey: ["tareas", projectId],
    queryFn: () => getTareasByProyecto(projectId!),
    enabled: !!projectId,
    staleTime: 30_000,
  });
};

export const useMultiProjectTareas = (projectIds: string[]) => {
  const queries = useQueries({
    queries: projectIds.map((pid) => ({
      queryKey: ["tareas", pid],
      queryFn: () => getTareasByProyecto(pid),
      enabled: !!pid,
      staleTime: 30_000,
    })),
  });

  const data: Tarea[] = [];

  queries.forEach((q) => {
    if (q.data) data.push(...q.data);
  });

  const isLoading = queries.some((q) => q.isLoading);

  return { data, isLoading };
};

export const useTareaById = (taskId?: string) => {
  return useQuery({
    queryKey: ["tarea", taskId],
    queryFn: () => getTareaById(taskId!),
    enabled: !!taskId,
    staleTime: 30_000,
  });
};

export const useTaskUsers = (taskId?: string) => {
  return useQuery({
    queryKey: ["taskUsers", taskId],
    queryFn: () => getTaskUsers(taskId!),
    enabled: !!taskId,
    staleTime: 30_000,
  });
};

export const useTaskAssignments = (developerIds: string[], sprintIds: string[]) => {
  return useQuery({
    queryKey: ["taskAssignments", developerIds, sprintIds],
    queryFn: () => getTaskAssignments(developerIds, sprintIds),
    enabled: developerIds.length > 0 && sprintIds.length > 0,
    staleTime: 30_000,
  });
};

export const useCreateTarea = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ projectId, data }: { projectId: string; data: CreateTareaRequest }) =>
      createTarea(projectId, data),

    onSuccess: (createdTask, { projectId }) => {
      queryClient.setQueryData<Tarea[]>(["tareas", projectId], (current) => {
        if (!current) return [createdTask];
        return [createdTask, ...current];
      });
    },
  });
};

export const useUpdateTarea = (projectId?: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ taskId, data }: { taskId: string; data: UpdateTareaRequest }) =>
      updateTarea(taskId, data),

    onSuccess: (updatedTask, { taskId }) => {
      const targetProjectId = projectId || updatedTask.projectId;

      if (targetProjectId) {
        queryClient.setQueryData<Tarea[]>(["tareas", targetProjectId], (current) => {
          if (!current) return current;

          return current.map((task) =>
            task.taskId === taskId
              ? { ...task, ...updatedTask }
              : task
          );
        });
      }

      queryClient.setQueryData<Tarea>(["tarea", taskId], (current) => {
        if (!current) return updatedTask;
        return { ...current, ...updatedTask };
      });
    },
  });
};

export const useUpdateTareaStatus = (projectId?: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ taskId, estadoId }: { taskId: string; estadoId: number }) =>
      updateTareaStatus(taskId, estadoId),

    onSuccess: (_, { taskId, estadoId }) => {
      if (projectId) {
        queryClient.setQueryData<Tarea[]>(["tareas", projectId], (current) => {
          if (!current) return current;

          return current.map((task) =>
            task.taskId === taskId
              ? { ...task, estadoId }
              : task
          );
        });
      } else {
        queryClient.setQueriesData<Tarea[]>(
          { queryKey: ["tareas"] },
          (current) => {
            if (!current) return current;

            return current.map((task) =>
              task.taskId === taskId
                ? { ...task, estadoId }
                : task
            );
          }
        );
      }

      queryClient.setQueryData<Tarea>(["tarea", taskId], (current) => {
        if (!current) return current;

        return {
          ...current,
          estadoId,
        };
      });
    },
  });
};

export const useDeleteTarea = (projectId?: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (taskId: string) => deleteTarea(taskId),

    onSuccess: (_, taskId) => {
      if (projectId) {
        queryClient.setQueryData<Tarea[]>(["tareas", projectId], (current) => {
          if (!current) return current;
          return current.filter((task) => task.taskId !== taskId);
        });
      } else {
        queryClient.setQueriesData<Tarea[]>(
          { queryKey: ["tareas"] },
          (current) => {
            if (!current) return current;
            return current.filter((task) => task.taskId !== taskId);
          }
        );
      }

      queryClient.removeQueries({ queryKey: ["tarea", taskId] });
      queryClient.removeQueries({ queryKey: ["taskUsers", taskId] });
    },
  });
};

export const useAssignTaskUser = (projectId?: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ taskId, userId }: { taskId: string; userId: string }) =>
      assignUserToTask(taskId, userId),

    onSuccess: (_, { taskId }) => {
      queryClient.invalidateQueries({ queryKey: ["taskUsers", taskId] });
      queryClient.invalidateQueries({ queryKey: ["tarea", taskId] });

      // Ya no invalidamos ["tareas", projectId] porque la lista ligera no depende de responsables.
    },
  });
};

export const useRemoveTaskUser = (projectId?: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ taskId, userId }: { taskId: string; userId: string }) =>
      removeUserFromTask(taskId, userId),

    onSuccess: (_, { taskId }) => {
      queryClient.invalidateQueries({ queryKey: ["taskUsers", taskId] });
      queryClient.invalidateQueries({ queryKey: ["tarea", taskId] });

      // Ya no invalidamos ["tareas", projectId] porque la lista ligera no depende de responsables.
    },
  });
};
