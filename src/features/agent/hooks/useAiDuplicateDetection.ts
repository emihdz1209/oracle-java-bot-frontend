import { useMutation, useQuery } from "@tanstack/react-query";
import {
  startOracleVectorSearch,
  getOracleVectorSearchLatest,
  getOracleVectorSearchRuns,
  getOracleVectorSearchRunResults,
} from "@/features/agent/services/duplicateDetectionService";

export const useStartOracleVectorSearch = () => {
  return useMutation({
    mutationFn: ({ projectId, threshold }: { projectId: string; threshold?: number }) =>
      startOracleVectorSearch(projectId, { threshold }),
  });
};

export const useOracleVectorSearchLatest = (
  projectId?: string,
  refetchInterval?: number | false
) => {
  return useQuery({
    queryKey: ["oracleVectorSearch", "latest", projectId],
    queryFn: () => getOracleVectorSearchLatest(projectId!),
    enabled: !!projectId,
    refetchInterval,
  });
};

export const useOracleVectorSearchRuns = (
  projectId?: string,
  refetchInterval?: number | false
) => {
  return useQuery({
    queryKey: ["oracleVectorSearch", "runs", projectId],
    queryFn: () => getOracleVectorSearchRuns(projectId!),
    enabled: !!projectId,
    refetchInterval,
  });
};

export const useOracleVectorSearchRunResults = (
  projectId?: string,
  runId?: string,
  refetchInterval?: number | false
) => {
  return useQuery({
    queryKey: ["oracleVectorSearch", "runResults", projectId, runId],
    queryFn: () => getOracleVectorSearchRunResults(projectId!, runId!),
    enabled: !!projectId && !!runId,
    refetchInterval,
  });
};
