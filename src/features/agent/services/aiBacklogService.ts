import { apiClient } from "@/shared/api/apiClient";
import type {
  AiTaskSuggestion,
  AiSuggestionStatus,
  ApproveAiSuggestionRequest,
  ApproveAiSuggestionResponse,
  GenerateAiBacklogRequest,
  GenerateAiBacklogResponse,
} from "@/features/agent/types/aiBacklog";

const ensureHyphenatedUuid = (id: string) => {
  if (!id) return id;
  if (id.includes("-")) return id;
  const clean = id.replace(/[^0-9a-fA-F]/g, "");
  if (clean.length !== 32) return id;
  return (
    clean.slice(0, 8) +
    "-" +
    clean.slice(8, 12) +
    "-" +
    clean.slice(12, 16) +
    "-" +
    clean.slice(16, 20) +
    "-" +
    clean.slice(20)
  ).toLowerCase();
};

export const generateAiBacklog = async (
  projectId: string,
  payload: GenerateAiBacklogRequest
): Promise<GenerateAiBacklogResponse> => {
  const pid = ensureHyphenatedUuid(projectId);
  const response = await apiClient.post<GenerateAiBacklogResponse>(
    `/api/projects/${pid}/ai/generate-backlog`,
    payload
  );
  return response.data;
};

export const getAiSuggestions = async (
  projectId: string,
  status?: AiSuggestionStatus
): Promise<AiTaskSuggestion[]> => {
  const pid = ensureHyphenatedUuid(projectId);
  const response = await apiClient.get<AiTaskSuggestion[]>(
    `/api/projects/${pid}/ai/suggestions`,
    status ? { params: { status } } : undefined
  );
  return response.data;
};

export const approveAiSuggestion = async (
  aiTaskId: string,
  payload: ApproveAiSuggestionRequest
): Promise<ApproveAiSuggestionResponse> => {
  const sid = ensureHyphenatedUuid(aiTaskId);
  const response = await apiClient.post<ApproveAiSuggestionResponse>(
    `/api/projects/ai/suggestions/${sid}/approve`,
    payload
  );
  return response.data;
};

export const rejectAiSuggestion = async (aiTaskId: string): Promise<AiTaskSuggestion> => {
  const sid = ensureHyphenatedUuid(aiTaskId);
  const response = await apiClient.patch<AiTaskSuggestion>(
    `/api/projects/ai/suggestions/${sid}/reject`
  );
  return response.data;
};
