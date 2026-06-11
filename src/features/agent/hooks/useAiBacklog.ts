import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { UseQueryOptions } from "@tanstack/react-query";
import type {
  AiSuggestionStatus,
  AiTaskSuggestion,
  ApproveAiSuggestionRequest,
  ProjectDocument,
} from "@/features/agent/types/aiBacklog";
import {
  approveAiSuggestion,
  generateAiBacklog,
  getAiSuggestions,
  getProjectDocuments,
  rejectAiSuggestion,
} from "@/features/agent/services/aiBacklogService";

type AiSuggestionsQueryOptions = Omit<
  UseQueryOptions<AiTaskSuggestion[]>,
  "queryKey" | "queryFn"
>;

type ProjectDocumentsQueryOptions = Omit<
  UseQueryOptions<ProjectDocument[]>,
  "queryKey" | "queryFn"
>;

export const useProjectDocuments = (
  projectId?: string,
  options?: ProjectDocumentsQueryOptions
) => {
  const { enabled = true, ...rest } = options ?? {};

  return useQuery({
    queryKey: ["projectDocuments", projectId],
    queryFn: () => getProjectDocuments(projectId!),
    enabled: !!projectId && enabled,
    ...rest,
  });
};

export const useAiSuggestions = (
  projectId?: string,
  status?: AiSuggestionStatus,
  options?: AiSuggestionsQueryOptions
) => {
  const { enabled = true, ...rest } = options ?? {};

  return useQuery({
    queryKey: ["aiSuggestions", projectId, status ?? "ALL"],
    queryFn: () => getAiSuggestions(projectId!, status),
    enabled: !!projectId && enabled,
    ...rest,
  });
};

export const useGenerateAiBacklog = () => {
  return useMutation({
    mutationFn: ({
      projectId,
      maxHours,
      documentIds,
    }: {
      projectId: string;
      maxHours: number;
      documentIds: string[];
    }) =>
      generateAiBacklog(projectId, {
        maxHours,
        documentIds,
      }),
  });
};

export const useApproveAiSuggestion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      aiTaskId,
      payload,
    }: {
      aiTaskId: string;
      payload: ApproveAiSuggestionRequest;
    }) => approveAiSuggestion(aiTaskId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["aiSuggestions"] });
    },
  });
};

export const useRejectAiSuggestion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (aiTaskId: string) => rejectAiSuggestion(aiTaskId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["aiSuggestions"] });
    },
  });
};