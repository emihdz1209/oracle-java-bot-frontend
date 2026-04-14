export interface SprintKpisResponse {
  totalTareas: number;
  tareasCompletadas: number;
  aTiempo: number;
  conRetraso: number;
  totalEstimadoHrs: number;
  totalRealHrs: number;
}

export interface ProjectProgressResponse {
  projectId: string;
  progress: number;
}

export interface DeveloperPerformanceItem {
  developerId?: string;
  developerName?: string;
  tareasAsignadas?: number;
  tareasCompletadas?: number;
  porcentajeCompletadas?: number;
  tareasCompletadasPorSprint?: number;
  horasRealesPorSprint?: number;
  [key: string]: unknown;
}
