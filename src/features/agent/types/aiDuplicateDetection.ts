export type DuplicateDetectionStatus = "PENDING" | "COMPLETED" | "FAILED";

export interface DuplicateDetectionRun {
  runId: string;
  projectId: string;
  status: DuplicateDetectionStatus;
  threshold: number;
  tasksAnalyzed: number;
  createdAt: string;
  completedAt: string | null;
  errorMessage: string | null;
}

export interface DuplicateDetectionResult {
  resultId: string;
  runId: string;
  projectId: string;
  taskAId: string;
  taskATitle: string;
  taskBId: string;
  taskBTitle: string;
  similarityScore: number;
  reason: string;
  createdAt: string;
  distance?: number;
}

export interface DuplicateDetectionLatestResponse {
  run: DuplicateDetectionRun;
  results: DuplicateDetectionResult[];
}

export interface StartDuplicateDetectionRequest {
  threshold?: number;
}

export type PipelineStep =
  | "idle"
  | "preparing_oracle_vectors"
  | "confirming_oracle_vector_search"
  | "running_oracle_vector_search"
  | "completed"
  | "error";
