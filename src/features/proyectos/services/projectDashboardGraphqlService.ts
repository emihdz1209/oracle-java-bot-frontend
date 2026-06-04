import { graphqlRequest } from "@/shared/api/graphqlClient";
import {
  DASHBOARD_DEVELOPER_OPTIONS,
  DASHBOARD_SPRINT_OPTIONS,
  GITHUB_CONTRIBUTIONS,
  PROJECT_DASHBOARD_KPIS,
} from "@/features/proyectos/graphql/dashboardKpiQueries";

export interface DashboardSprintOption {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
}

export interface DashboardDeveloperOption {
  id: string;
  name: string;
  email: string;
}

export interface ProjectDashboardSummary {
  totalTasks: number;
  completedTasks: number;
  onTimeTasks: number;
  delayedTasks: number;
  totalEstimatedHours: number;
  totalRealHours: number;
  completionRate: number;
  onTimeRate: number;
  estimationAccuracy: number;
  avgTasksPerDeveloper: number;
  avgHoursPerDeveloper: number;
}

export interface ProjectDashboardSprintHistoryItem {
  sprintId: string;
  sprintName: string;
  totalTasks: number;
  completedTasks: number;
  onTimeTasks: number;
  delayedTasks: number;
  totalEstimatedHours: number;
  totalRealHours: number;
}

export interface ProjectDashboardKpis {
  projectId: string;
  sprintId: string | null;
  sprintName: string | null;
  developerId: string | null;
  developerName: string | null;
  scopeLabel: string;
  summary: ProjectDashboardSummary;
  sprintHistory: ProjectDashboardSprintHistoryItem[];
}

export interface GitHubContribution {
  name: string;
  githubUsername: string | null;
  totalCommits: number;
  openedIssues: number;
  closedIssues: number;
}

interface DashboardSprintOptionsData {
  dashboardSprintOptions: DashboardSprintOption[];
}

interface DashboardDeveloperOptionsData {
  dashboardDeveloperOptions: DashboardDeveloperOption[];
}

interface ProjectDashboardKpisData {
  projectDashboardKpis: ProjectDashboardKpis;
}

interface GitHubContributionsData {
  githubContributions: GitHubContribution[];
}

interface ProjectDashboardOptionsVariables {
  projectId: string;
}

interface ProjectDashboardKpisVariables {
  projectId: string;
  sprintId: string | null;
  developerId: string | null;
}

const getDateOrderValue = (value: string) => {
  const isoDateMatch = /^(\d{4})-(\d{2})-(\d{2})/.exec(value);

  if (isoDateMatch) {
    return Number(`${isoDateMatch[1]}${isoDateMatch[2]}${isoDateMatch[3]}`);
  }

  const parsed = Date.parse(value);
  return Number.isNaN(parsed) ? Number.POSITIVE_INFINITY : parsed;
};

const sortSprintOptionsBySchedule = (sprints: DashboardSprintOption[]) => {
  return [...sprints].sort((a, b) => {
    const startA = getDateOrderValue(a.startDate);
    const startB = getDateOrderValue(b.startDate);

    if (startA !== startB) {
      return startA < startB ? -1 : 1;
    }

    const endA = getDateOrderValue(a.endDate);
    const endB = getDateOrderValue(b.endDate);

    if (endA !== endB) {
      return endA < endB ? -1 : 1;
    }

    return a.name.localeCompare(b.name, "es", {
      numeric: true,
      sensitivity: "base",
    });
  });
};

export const getDashboardSprintOptions = async (projectId: string) => {
  const data = await graphqlRequest<
    DashboardSprintOptionsData,
    ProjectDashboardOptionsVariables
  >(
    DASHBOARD_SPRINT_OPTIONS,
    { projectId }
  );

  return sortSprintOptionsBySchedule(data.dashboardSprintOptions);
};

export const getDashboardDeveloperOptions = async (projectId: string) => {
  const data = await graphqlRequest<
    DashboardDeveloperOptionsData,
    ProjectDashboardOptionsVariables
  >(
    DASHBOARD_DEVELOPER_OPTIONS,
    { projectId }
  );

  return data.dashboardDeveloperOptions;
};

export const getProjectDashboardKpis = async (
  variables: ProjectDashboardKpisVariables
) => {
  const data = await graphqlRequest<
    ProjectDashboardKpisData,
    ProjectDashboardKpisVariables
  >(PROJECT_DASHBOARD_KPIS, variables);

  return data.projectDashboardKpis;
};

export const getGitHubContributions = async (projectId: string) => {
  const data = await graphqlRequest<
    GitHubContributionsData,
    ProjectDashboardOptionsVariables
  >(
    GITHUB_CONTRIBUTIONS,
    { projectId }
  );

  return data.githubContributions;
};
