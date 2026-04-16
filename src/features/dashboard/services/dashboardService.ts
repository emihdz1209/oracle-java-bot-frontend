/// src/features/dashboard/services/dashboardService.ts

import { apiClient } from "@/shared/api/apiClient";
import type { ManagedProject } from "@/features/dashboard/types/dashboard";

export const getManagedProjects = async (
  userId: string
): Promise<ManagedProject[]> => {
  const response = await apiClient.get<ManagedProject[]>(
    `/api/users/${userId}/managed-projects`
  );
  return response.data;
};
