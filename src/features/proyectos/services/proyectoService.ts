/// src/features/proyectos/services/proyectoService.ts

import { apiClient } from "@/shared/api/apiClient";
import type {
  Proyecto,
  CreateProyectoRequest,
  CreateSprintRequest,
  Sprint,
  SprintKpis,
  DeveloperPerformance,
  ProjectProgress,
  ProjectDocument,
} from "@/features/proyectos/types/proyecto";

/**
 * Ensure a UUID string contains hyphens in the 8-4-4-4-12 format.
 * If the incoming id already contains hyphens it's returned as-is.
 * If it's a 32-char hex string without hyphens, it will insert them.
 */
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

const getSprintDateOrderValue = (value: string) => {
  const isoDateMatch = /^(\d{4})-(\d{2})-(\d{2})/.exec(value);

  if (isoDateMatch) {
    return Number(`${isoDateMatch[1]}${isoDateMatch[2]}${isoDateMatch[3]}`);
  }

  const parsed = Date.parse(value);
  return Number.isNaN(parsed) ? Number.POSITIVE_INFINITY : parsed;
};

export const sortSprintsBySchedule = (sprints: Sprint[]) => {
  return [...sprints].sort((a, b) => {
    const startA = getSprintDateOrderValue(a.fechaInicio);
    const startB = getSprintDateOrderValue(b.fechaInicio);

    if (startA !== startB) {
      return startA < startB ? -1 : 1;
    }

    const endA = getSprintDateOrderValue(a.fechaFin);
    const endB = getSprintDateOrderValue(b.fechaFin);

    if (endA !== endB) {
      return endA < endB ? -1 : 1;
    }

    const nameComparison = a.nombre.localeCompare(b.nombre, "es", {
      numeric: true,
      sensitivity: "base",
    });

    return nameComparison || a.sprintId.localeCompare(b.sprintId);
  });
};

export const getProyectosByTeam = async (teamId: string): Promise<Proyecto[]> => {
  const response = await apiClient.get<Proyecto[]>(`/api/teams/${teamId}/projects`);
  return response.data;
};

export const createProyecto = async (
  teamId: string,
  proyecto: CreateProyectoRequest
): Promise<Proyecto> => {
  const response = await apiClient.post<Proyecto>(
    `/api/teams/${teamId}/projects`,
    proyecto
  );
  return response.data;
};

export const getProyecto = async (projectId: string): Promise<Proyecto> => {
  const response = await apiClient.get<Proyecto>(`/api/projects/${projectId}`);
  return response.data;
};

export interface ProjectMember {
  projectId: string;
  userId: string;
}

export const updateProyecto = async (
  projectId: string,
  proyecto: CreateProyectoRequest
): Promise<Proyecto> => {
  const response = await apiClient.put<Proyecto>(`/api/projects/${projectId}`, proyecto);
  return response.data;
};

export const deleteProyecto = async (projectId: string, teamId?: string): Promise<void> => {
  try {
    await apiClient.delete(`/api/projects/${projectId}`);
    return;
  } catch (error: unknown) {
    if (!teamId) {
      throw error;
    }
  }

  // Fallback for APIs that scope project deletion under team routes.
  await apiClient.delete(`/api/teams/${teamId}/projects/${projectId}`);
};

export const getProjectMembers = async (projectId: string): Promise<ProjectMember[]> => {
  const response = await apiClient.get<ProjectMember[]>(`/api/projects/${projectId}/members`);
  return response.data;
};

export const deleteProjectMember = async (projectId: string, userId: string): Promise<void> => {
  await apiClient.delete(`/api/projects/${projectId}/members/${userId}`);
};

export const getProjectSprints = async (projectId: string): Promise<Sprint[]> => {
  const response = await apiClient.get<Sprint[]>(`/api/projects/${projectId}/sprints`);
  return sortSprintsBySchedule(response.data);
};

export const createSprint = async (
  projectId: string,
  sprint: CreateSprintRequest
): Promise<Sprint> => {
  const response = await apiClient.post<Sprint>(`/api/projects/${projectId}/sprints`, sprint);
  return response.data;
};

export const updateSprint = async (
  sprintId: string,
  sprint: CreateSprintRequest
): Promise<Sprint> => {
  const response = await apiClient.put<Sprint>(`/api/sprints/${sprintId}`, sprint);
  return response.data;
};

export const getSprintKpis = async (sprintId: string): Promise<SprintKpis> => {
  const response = await apiClient.get<SprintKpis>(`/api/sprints/${sprintId}/kpis`);
  return response.data;
};

export const getProjectProgress = async (projectId: string): Promise<ProjectProgress> => {
  const response = await apiClient.get<ProjectProgress>(`/api/projects/${projectId}/progress`);
  return response.data;
};

export const getDeveloperPerformance = async (
  projectId: string
): Promise<DeveloperPerformance[]> => {
  const response = await apiClient.get<DeveloperPerformance[]>(
    `/api/projects/${projectId}/developers/performance`
  );
  return response.data;
};

export const getProjectDocuments = async (
  projectId: string,
  documentType?: string
): Promise<ProjectDocument[]> => {
  const pid = ensureHyphenatedUuid(projectId);
  const url = documentType
    ? `/api/projects/${pid}/documents?documentType=${encodeURIComponent(documentType)}`
    : `/api/projects/${pid}/documents`;

  const response = await apiClient.get<ProjectDocument[]>(url);
  return response.data;
};

export const uploadProjectDocument = async (
  projectId: string,
  file: File,
  documentType: string
): Promise<ProjectDocument> => {
  const formData = new FormData();
  formData.append("documentType", documentType);
  formData.append("file", file);

  const pid = ensureHyphenatedUuid(projectId);

  const response = await apiClient.post<ProjectDocument>(`/api/projects/${pid}/documents`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const deleteProjectDocument = async (documentId: string): Promise<void> => {
  await apiClient.delete(`/api/projects/documents/${documentId}`);
};
