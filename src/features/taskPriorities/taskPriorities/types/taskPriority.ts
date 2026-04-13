export interface TaskPriority {
  id: number;
  nombre: string;
}

export interface CreateTaskPriorityRequest {
  nombre: string;
}