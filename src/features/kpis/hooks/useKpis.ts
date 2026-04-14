import { useQuery } from "@tanstack/react-query";

import {
  getDevelopersPerformance,
  getProjectProgress,
  getSprintKpis,
} from "@/features/kpis/services/kpiService";

export const useSprintKpis = (sprintId?: string) => {
  return useQuery({
    queryKey: ["sprintKpis", sprintId],
    queryFn: () => getSprintKpis(sprintId as string),
    enabled: Boolean(sprintId),
  });
};

export const useProjectProgress = (projectId?: string) => {
  return useQuery({
    queryKey: ["projectProgress", projectId],
    queryFn: () => getProjectProgress(projectId as string),
    enabled: Boolean(projectId),
  });
};

export const useDevelopersPerformance = (projectId?: string) => {
  return useQuery({
    queryKey: ["developersPerformance", projectId],
    queryFn: () => getDevelopersPerformance(projectId as string),
    enabled: Boolean(projectId),
  });
};
