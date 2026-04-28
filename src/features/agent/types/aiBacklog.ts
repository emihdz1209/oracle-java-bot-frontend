export type AiSuggestionStatus = "PENDING" | "APPROVED" | "REJECTED";

export interface AiTaskSuggestion {
  aiTaskId: string;
  projectId: string;
  titulo: string;
  descripcion: string;
  tiempoEstimado: number;
  status: AiSuggestionStatus;
  createdAt: string;
}

export interface GenerateAiBacklogRequest {
  maxHours: number;
}

export interface GenerateAiBacklogResponse {
  message: string;
  projectId: string;
  documentsSent: number;
  maxHours: number;
}

export interface ApproveAiSuggestionRequest {
  fechaLimite: string;
  prioridadId: number;
  sprintId: string | null;
}

export interface ApproveAiSuggestionResponse {
  suggestion: AiTaskSuggestion;
  createdTask: {
    taskId: string;
    titulo: string;
    descripcion: string;
    fechaCreacion: string;
    fechaLimite: string;
    fechaFinalizacion: string | null;
    estadoId: number;
    prioridadId: number;
    projectId: string;
    sprintId: string | null;
    sprintNombre: string | null;
    tiempoEstimado: number;
    tiempoReal: number;
  };
}
