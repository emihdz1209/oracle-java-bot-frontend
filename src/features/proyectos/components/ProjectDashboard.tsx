/// src/features/proyectos/components/ProjectDashboard.tsx

import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import {
  Alert,
  CircularProgress,
  FormControl,
  MenuItem,
  Select,
} from "@mui/material";
import ReactECharts from "echarts-for-react";
import {
  ALL_DASHBOARD_FILTER,
  useDashboardDeveloperOptions,
  useDashboardSprintOptions,
  useGitHubKpis,
  useProjectDashboardKpis,
  useProjectDashboardKpisByDeveloper,
} from "@/features/proyectos/hooks/useProyectos";
import type {
  DashboardDeveloperOption,
  DashboardSprintOption,
  ProjectDashboardKpis,
  ProjectDashboardSprintHistoryItem,
} from "@/features/proyectos/services/projectDashboardGraphqlService";
import styles from "@/features/proyectos/styles/ProjectDashboard.module.css";

interface Props {
  projectId: string;
}

const ALL_SPRINT_OPTION: DashboardSprintOption = {
  id: ALL_DASHBOARD_FILTER,
  name: "Todos",
  startDate: "",
  endDate: "",
};

const ALL_DEVELOPER_OPTION: DashboardDeveloperOption = {
  id: ALL_DASHBOARD_FILTER,
  name: "Todo el equipo",
  email: "",
};

const DEV_COLORS = [
  "#2563eb",
  "#16a34a",
  "#d97706",
  "#7c3aed",
  "#dc2626",
  "#0891b2",
  "#ea580c",
  "#65a30d",
];

const shortName = (fullName: string): string => {
  const parts = fullName.trim().split(/\s+/);
  if (parts.length < 2) return fullName;
  return `${parts[0]} ${parts[1][0]}.`;
};

const formatSmartNumber = (value: number | null | undefined, decimals = 0) => {
  const number = Number(value ?? 0);
  if (!Number.isFinite(number)) return "0";

  if (Number.isInteger(number)) {
    return String(number);
  }

  return number.toFixed(decimals).replace(/\.?0+$/, "");
};

const formatPercentSmart = (value: number | null | undefined) =>
  `${formatSmartNumber(value, 2)}%`;

const formatHours = (value: number | null | undefined) =>
  `${formatSmartNumber(value, 1)} hrs`;

const normalizeName = (value: string | null | undefined) =>
  value?.trim().toLocaleLowerCase("es") ?? "";

const formatRepositoryLabel = (repoName: string) =>
  repoName.replace(/^oracle-java-bot-/, "");

const getHistoryItem = (
  dashboard: ProjectDashboardKpis,
  sprint: ProjectDashboardSprintHistoryItem
) =>
  dashboard.sprintHistory.find((item) => item.sprintId === sprint.sprintId) ??
  dashboard.sprintHistory.find((item) => item.sprintName === sprint.sprintName);

const getDeveloperName = (
  dashboard: ProjectDashboardKpis,
  developerOptions: DashboardDeveloperOption[],
  index: number
) => {
  const optionName = developerOptions.find(
    (option) => option.id === dashboard.developerId
  )?.name;

  return dashboard.developerName ?? optionName ?? `Desarrollador ${index + 1}`;
};

export const ProjectDashboard = ({ projectId }: Props) => {
  const [selectedSprintId, setSelectedSprintId] = useState(ALL_DASHBOARD_FILTER);
  const [selectedDeveloperId, setSelectedDeveloperId] = useState(ALL_DASHBOARD_FILTER);

  const sprintOptionsQuery = useDashboardSprintOptions(projectId);
  const developerOptionsQuery = useDashboardDeveloperOptions(projectId);
  const dashboardQuery = useProjectDashboardKpis(
    projectId,
    selectedSprintId,
    selectedDeveloperId
  );
  const githubKpisQuery = useGitHubKpis(
    projectId,
    selectedSprintId,
    selectedDeveloperId
  );

  const sprintOptions = useMemo(
    () => [ALL_SPRINT_OPTION, ...(sprintOptionsQuery.data ?? [])],
    [sprintOptionsQuery.data]
  );

  const developerOptions = useMemo(
    () => [ALL_DEVELOPER_OPTION, ...(developerOptionsQuery.data ?? [])],
    [developerOptionsQuery.data]
  );

  const selectedDeveloperOption = useMemo(() => {
    if (selectedDeveloperId === ALL_DASHBOARD_FILTER) {
      return null;
    }

    return developerOptions.find((developer) => developer.id === selectedDeveloperId) ?? null;
  }, [developerOptions, selectedDeveloperId]);

  const selectedSprintOption = useMemo(() => {
    if (selectedSprintId === ALL_DASHBOARD_FILTER) {
      return null;
    }

    return sprintOptions.find((sprint) => sprint.id === selectedSprintId) ?? null;
  }, [selectedSprintId, sprintOptions]);

  const developerChartIds = useMemo(() => {
    if (selectedDeveloperId !== ALL_DASHBOARD_FILTER) {
      return [];
    }

    return (developerOptionsQuery.data ?? []).map((developer) => developer.id);
  }, [developerOptionsQuery.data, selectedDeveloperId]);

  const developerKpisQueries = useProjectDashboardKpisByDeveloper(
    projectId,
    selectedSprintId,
    developerChartIds
  );

  useEffect(() => {
    if (!sprintOptions.some((option) => option.id === selectedSprintId)) {
      setSelectedSprintId(ALL_DASHBOARD_FILTER);
    }
  }, [selectedSprintId, sprintOptions]);

  useEffect(() => {
    if (!developerOptions.some((option) => option.id === selectedDeveloperId)) {
      setSelectedDeveloperId(ALL_DASHBOARD_FILTER);
    }
  }, [selectedDeveloperId, developerOptions]);

  useEffect(() => {
    if (!import.meta.env.DEV) return;

    const errors = [
      sprintOptionsQuery.error,
      developerOptionsQuery.error,
      dashboardQuery.error,
      githubKpisQuery.error,
      ...developerKpisQueries.map((query) => query.error),
    ].filter(Boolean);

    if (errors.length > 0) {
      console.error("Dashboard KPI GraphQL errors:", errors);
    }
  }, [
    dashboardQuery.error,
    developerKpisQueries,
    developerOptionsQuery.error,
    githubKpisQuery.error,
    sprintOptionsQuery.error,
  ]);

  const dashboardData = dashboardQuery.data;
  const summary = dashboardData?.summary;
  const sprintHistory = dashboardData?.sprintHistory ?? [];
  const sprintNames = sprintHistory.map((item) => item.sprintName);
  const githubKpis = githubKpisQuery.data;
  const githubContributions = useMemo(
    () => githubKpis?.contributions ?? [],
    [githubKpis?.contributions]
  );
  const githubSprintActivity = useMemo(
    () => githubKpis?.sprintActivity ?? [],
    [githubKpis?.sprintActivity]
  );
  const githubRepositoryActivity = useMemo(
    () => githubKpis?.repositoryActivity ?? [],
    [githubKpis?.repositoryActivity]
  );

  const filteredGitHubContributions = useMemo(() => {
    if (selectedDeveloperId === ALL_DASHBOARD_FILTER) {
      return githubContributions;
    }

    const selectedUserId = selectedDeveloperOption?.id ?? dashboardData?.developerId;
    const selectedEmail = normalizeName(selectedDeveloperOption?.email);
    const selectedName = normalizeName(
      selectedDeveloperOption?.name ?? dashboardData?.developerName
    );

    if (!selectedUserId && !selectedEmail && !selectedName) {
      return [];
    }

    return githubContributions.filter(
      (contribution) =>
        contribution.userId === selectedUserId ||
        normalizeName(contribution.email) === selectedEmail ||
        normalizeName(contribution.name) === selectedName
    );
  }, [
    dashboardData?.developerId,
    dashboardData?.developerName,
    githubContributions,
    selectedDeveloperId,
    selectedDeveloperOption?.email,
    selectedDeveloperOption?.id,
    selectedDeveloperOption?.name,
  ]);

  const githubSummary = useMemo(
    () =>
      filteredGitHubContributions.reduce(
        (totals, contribution) => ({
          totalCommits: totals.totalCommits + contribution.totalCommits,
          openedIssues: totals.openedIssues + contribution.openedIssues,
          activeIssues: totals.activeIssues + contribution.activeIssues,
          closedIssues: totals.closedIssues + contribution.closedIssues,
        }),
        {
          totalCommits: 0,
          openedIssues: 0,
          activeIssues: 0,
          closedIssues: 0,
        }
      ),
    [filteredGitHubContributions]
  );
  const githubIssueClosureRate =
    githubSummary.openedIssues === 0
      ? 0
      : (githubSummary.closedIssues / githubSummary.openedIssues) * 100;

  const filteredGitHubSprintActivity = useMemo(() => {
    if (selectedSprintId === ALL_DASHBOARD_FILTER) {
      return githubSprintActivity;
    }

    const selectedSprintName = normalizeName(
      selectedSprintOption?.name ?? dashboardData?.sprintName
    );

    if (!selectedSprintName) {
      return [];
    }

    return githubSprintActivity.filter((sprint) =>
      sprint.sprintId
        ? sprint.sprintId === selectedSprintId
        : normalizeName(sprint.sprintName) === selectedSprintName
    );
  }, [
    dashboardData?.sprintName,
    githubSprintActivity,
    selectedSprintId,
    selectedSprintOption?.name,
  ]);

  const monitoredRepos = useMemo(
    () => githubRepositoryActivity.length,
    [githubRepositoryActivity]
  );

  const developerDashboards = useMemo(() => {
    if (selectedDeveloperId !== ALL_DASHBOARD_FILTER) {
      return dashboardData ? [dashboardData] : [];
    }

    return developerKpisQueries
      .map((query) => query.data)
      .filter((item): item is ProjectDashboardKpis => Boolean(item));
  }, [dashboardData, developerKpisQueries, selectedDeveloperId]);

  const developerNames = developerDashboards.map((dashboard, index) =>
    shortName(getDeveloperName(dashboard, developerOptions, index))
  );

  const hbarSprintData = developerDashboards.map(
    (dashboard) => dashboard.summary.completedTasks
  );

  const hbarMax = Math.max(...hbarSprintData, 1);
  const hbarOption = {
    tooltip: {
      formatter: (p: { name: string; value: number }) => `${p.name}: ${p.value} tareas`,
    },
    grid: { left: "0%", right: "12%", bottom: "0%", top: "0%", containLabel: true },
    xAxis: { type: "value", max: hbarMax, axisLabel: { formatter: "{value}" } },
    yAxis: { type: "category", data: developerNames, axisLabel: { width: 80, overflow: "truncate" } },
    series: [
      {
        type: "bar",
        data: hbarSprintData,
        itemStyle: { color: "#2563eb", borderRadius: [0, 4, 4, 0] },
        label: { show: true, position: "right", formatter: "{c}" },
      },
    ],
  };

  const stackedBarOption = {
    tooltip: { trigger: "axis", axisPointer: { type: "shadow" } },
    legend: { data: ["A tiempo", "Con retraso"], top: 0, textStyle: { fontSize: 11 } },
    grid: { left: "3%", right: "4%", bottom: "8%", top: "56px", containLabel: true },
    xAxis: { type: "category", data: sprintNames },
    yAxis: { type: "value", name: "Tareas", nameTextStyle: { fontSize: 11 } },
    series: [
      {
        name: "A tiempo",
        type: "bar",
        stack: "total",
        data: sprintHistory.map((item) => item.onTimeTasks),
        itemStyle: { color: "#16a34a" },
        label: {
          show: true,
          position: "top",
          fontSize: 10,
          formatter: (p: { value: number }) => (p.value > 0 ? `${p.value}` : ""),
        },
      },
      {
        name: "Con retraso",
        type: "bar",
        stack: "total",
        data: sprintHistory.map((item) => item.delayedTasks),
        itemStyle: { color: "#dc2626" },
        label: {
          show: true,
          position: "top",
          fontSize: 10,
          formatter: (p: { value: number }) => (p.value > 0 ? `${p.value}` : ""),
        },
      },
    ],
  };

  const groupedBarOption = {
    tooltip: { trigger: "axis", axisPointer: { type: "shadow" } },
    legend: { data: ["Estimado (hrs)", "Real (hrs)"], top: 0, textStyle: { fontSize: 11 } },
    grid: { left: "3%", right: "4%", bottom: "8%", top: "56px", containLabel: true },
    xAxis: { type: "category", data: sprintNames },
    yAxis: { type: "value", name: "hrs", nameTextStyle: { fontSize: 11 } },
    series: [
      {
        name: "Estimado (hrs)",
        type: "bar",
        data: sprintHistory.map((item) => item.totalEstimatedHours),
        itemStyle: { color: "#2563eb" },
        label: {
          show: true,
          position: "top",
          fontSize: 10,
          formatter: (p: { value: number }) => (p.value > 0 ? `${p.value}h` : ""),
        },
      },
      {
        name: "Real (hrs)",
        type: "bar",
        data: sprintHistory.map((item) => item.totalRealHours),
        itemStyle: { color: "#16a34a" },
        label: {
          show: true,
          position: "top",
          fontSize: 10,
          formatter: (p: { value: number }) => (p.value > 0 ? `${p.value}h` : ""),
        },
      },
    ],
  };

  const multilineOption = {
    tooltip: { trigger: "axis" },
    legend: { data: developerNames, top: 0, textStyle: { fontSize: 11 } },
    grid: { left: "8%", right: "8%", bottom: "8%", top: "56px", containLabel: true },
    xAxis: { type: "category", data: sprintNames, boundaryGap: ["2%", "8%"] },
    yAxis: { type: "value", name: "Tareas", nameTextStyle: { fontSize: 11 } },
    series: developerDashboards.map((dashboard, index) => ({
      name: developerNames[index],
      type: "line",
      smooth: true,
      data: sprintHistory.map(
        (sprint) => getHistoryItem(dashboard, sprint)?.completedTasks ?? 0
      ),
    })),
  };

  const workloadTotals = sprintHistory.map((sprint) =>
    parseFloat(
      developerDashboards
        .reduce(
          (sum, dashboard) => sum + (getHistoryItem(dashboard, sprint)?.totalRealHours ?? 0),
          0
        )
        .toFixed(1)
    )
  );

  const workloadOption = {
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "shadow" },
      formatter: (params: { seriesName: string; value: number; name: string }[]) => {
        const total = workloadTotals[sprintNames.indexOf(params[0]?.name)];
        const rows = params
          .filter((p) => p.value > 0)
          .map((p) => `${p.seriesName}: <b>${p.value} hrs</b>`)
          .join("<br/>");
        return `${params[0]?.name}<br/>${rows}<br/><b>Total: ${total?.toFixed(1)} hrs</b>`;
      },
    },
    legend: { data: developerNames, top: 0, textStyle: { fontSize: 11 } },
    grid: { left: "3%", right: "4%", bottom: "8%", top: "56px", containLabel: true },
    xAxis: { type: "category", data: sprintNames },
    yAxis: { type: "value", name: "hrs", nameTextStyle: { fontSize: 11 } },
    series: developerDashboards.map((dashboard, index) => ({
      name: developerNames[index],
      type: "bar",
      stack: "total",
      itemStyle: { color: DEV_COLORS[index % DEV_COLORS.length] },
      data: sprintHistory.map(
        (sprint) => getHistoryItem(dashboard, sprint)?.totalRealHours ?? 0
      ),
      ...(index === developerDashboards.length - 1
        ? {
            label: {
              show: true,
              position: "top",
              formatter: (_p: { dataIndex: number }) =>
                `${workloadTotals[_p.dataIndex]}`,
              fontSize: 11,
              fontWeight: "bold",
              color: "#374151",
            },
          }
        : {}),
    })),
  };

  const tasksPerDevSprintOption = {
    tooltip: { trigger: "axis", axisPointer: { type: "shadow" } },
    legend: { data: developerNames, top: 0, textStyle: { fontSize: 11 } },
    grid: { left: "3%", right: "4%", bottom: "8%", top: "56px", containLabel: true },
    xAxis: { type: "category", data: sprintNames },
    yAxis: { type: "value", name: "Tareas", nameTextStyle: { fontSize: 11 } },
    series: developerDashboards.map((dashboard, index) => ({
      name: developerNames[index],
      type: "bar",
      itemStyle: { color: DEV_COLORS[index % DEV_COLORS.length] },
      label: {
        show: true,
        position: "top",
        fontSize: 10,
        formatter: (p: { value: number }) => (p.value > 0 ? `${p.value}` : ""),
      },
      data: sprintHistory.map(
        (sprint) => getHistoryItem(dashboard, sprint)?.completedTasks ?? 0
      ),
    })),
  };

  const hrsPerDevSprintOption = {
    tooltip: { trigger: "axis", axisPointer: { type: "shadow" } },
    legend: { data: developerNames, top: 0, textStyle: { fontSize: 11 } },
    grid: { left: "3%", right: "4%", bottom: "8%", top: "56px", containLabel: true },
    xAxis: { type: "category", data: sprintNames },
    yAxis: { type: "value", name: "hrs", nameTextStyle: { fontSize: 11 } },
    series: developerDashboards.map((dashboard, index) => ({
      name: developerNames[index],
      type: "bar",
      itemStyle: { color: DEV_COLORS[index % DEV_COLORS.length] },
      label: {
        show: true,
        position: "top",
        fontSize: 10,
        formatter: (p: { value: number }) => (p.value > 0 ? `${p.value}h` : ""),
      },
      data: sprintHistory.map(
        (sprint) => getHistoryItem(dashboard, sprint)?.totalRealHours ?? 0
      ),
    })),
  };

  const githubContributionNames = filteredGitHubContributions.map((contribution) =>
    shortName(contribution.name || contribution.githubUsername || "Sin usuario")
  );

  const githubContributionsOption = {
    tooltip: { trigger: "axis", axisPointer: { type: "shadow" } },
    legend: {
      data: ["Commits", "Issues creados", "Issues activos", "Issues cerrados"],
      top: 0,
      textStyle: { fontSize: 11 },
    },
    grid: { left: "3%", right: "4%", bottom: "10%", top: "56px", containLabel: true },
    xAxis: {
      type: "category",
      data: githubContributionNames,
      axisLabel: {
        interval: 0,
        rotate: githubContributionNames.length > 4 ? 25 : 0,
        width: 90,
        overflow: "truncate",
      },
    },
    yAxis: { type: "value" },
    series: [
      {
        name: "Commits",
        type: "bar",
        data: filteredGitHubContributions.map((contribution) => contribution.totalCommits),
        itemStyle: { color: "#2563eb" },
        label: {
          show: true,
          position: "top",
          fontSize: 10,
          formatter: (p: { value: number }) => (p.value > 0 ? `${p.value}` : ""),
        },
      },
      {
        name: "Issues creados",
        type: "bar",
        data: filteredGitHubContributions.map((contribution) => contribution.openedIssues),
        itemStyle: { color: "#d97706" },
        label: {
          show: true,
          position: "top",
          fontSize: 10,
          formatter: (p: { value: number }) => (p.value > 0 ? `${p.value}` : ""),
        },
      },
      {
        name: "Issues activos",
        type: "bar",
        data: filteredGitHubContributions.map((contribution) => contribution.activeIssues),
        itemStyle: { color: "#0891b2" },
        label: {
          show: true,
          position: "top",
          fontSize: 10,
          formatter: (p: { value: number }) => (p.value > 0 ? `${p.value}` : ""),
        },
      },
      {
        name: "Issues cerrados",
        type: "bar",
        data: filteredGitHubContributions.map((contribution) => contribution.closedIssues),
        itemStyle: { color: "#16a34a" },
        label: {
          show: true,
          position: "top",
          fontSize: 10,
          formatter: (p: { value: number }) => (p.value > 0 ? `${p.value}` : ""),
        },
      },
    ],
  };

  const githubCommitShareData = filteredGitHubContributions
    .filter((contribution) => contribution.totalCommits > 0)
    .map((contribution) => ({
      name: shortName(contribution.name || contribution.githubUsername || "Sin usuario"),
      value: contribution.totalCommits,
    }));

  const githubCommitShareOption = {
    tooltip: {
      trigger: "item",
      formatter: "{b}: {c} commits ({d}%)",
    },
    legend: {
      bottom: 0,
      textStyle: { fontSize: 11 },
    },
    color: DEV_COLORS,
    series: [
      {
        name: "Commits",
        type: "pie",
        radius: ["48%", "72%"],
        center: ["50%", "44%"],
        avoidLabelOverlap: true,
        itemStyle: {
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          formatter: "{b}\n{d}%",
          fontSize: 10,
        },
        data: githubCommitShareData,
      },
    ],
  };

  const githubSprintNames = filteredGitHubSprintActivity.map(
    (sprint) => sprint.sprintName
  );

  const githubSprintActivityOption = {
    tooltip: { trigger: "axis", axisPointer: { type: "shadow" } },
    legend: {
      data: ["Commits", "Issues creados", "Issues activos", "Issues cerrados"],
      top: 0,
      textStyle: { fontSize: 11 },
    },
    grid: { left: "3%", right: "4%", bottom: "10%", top: "56px", containLabel: true },
    xAxis: {
      type: "category",
      data: githubSprintNames,
      axisLabel: {
        interval: 0,
        rotate: githubSprintNames.length > 5 ? 25 : 0,
        width: 90,
        overflow: "truncate",
      },
    },
    yAxis: { type: "value" },
    series: [
      {
        name: "Commits",
        type: "bar",
        data: filteredGitHubSprintActivity.map((sprint) => sprint.totalCommits),
        itemStyle: { color: "#2563eb" },
        label: {
          show: true,
          position: "top",
          fontSize: 10,
          formatter: (p: { value: number }) => (p.value > 0 ? `${p.value}` : ""),
        },
      },
      {
        name: "Issues creados",
        type: "bar",
        data: filteredGitHubSprintActivity.map((sprint) => sprint.openedIssues),
        itemStyle: { color: "#d97706" },
        label: {
          show: true,
          position: "top",
          fontSize: 10,
          formatter: (p: { value: number }) => (p.value > 0 ? `${p.value}` : ""),
        },
      },
      {
        name: "Issues cerrados",
        type: "bar",
        data: filteredGitHubSprintActivity.map((sprint) => sprint.closedIssues),
        itemStyle: { color: "#16a34a" },
        label: {
          show: true,
          position: "top",
          fontSize: 10,
          formatter: (p: { value: number }) => (p.value > 0 ? `${p.value}` : ""),
        },
      },
    ],
  };

  const githubRepositoryNames = githubRepositoryActivity.map((repo) =>
    formatRepositoryLabel(repo.repoName)
  );

  const githubRepositoryActivityOption = {
    tooltip: { trigger: "axis", axisPointer: { type: "shadow" } },
    legend: {
      data: ["Commits", "Issues creados", "Issues activos", "Issues cerrados"],
      top: 0,
      textStyle: { fontSize: 11 },
    },
    grid: { left: "3%", right: "4%", bottom: "12%", top: "56px", containLabel: true },
    xAxis: {
      type: "category",
      data: githubRepositoryNames,
      axisLabel: {
        interval: 0,
        rotate: githubRepositoryNames.length > 3 ? 25 : 0,
        width: 110,
        overflow: "truncate",
      },
    },
    yAxis: { type: "value" },
    series: [
      {
        name: "Commits",
        type: "bar",
        data: githubRepositoryActivity.map((repo) => repo.totalCommits),
        itemStyle: { color: "#2563eb" },
        label: {
          show: true,
          position: "top",
          fontSize: 10,
          formatter: (p: { value: number }) => (p.value > 0 ? `${p.value}` : ""),
        },
      },
      {
        name: "Issues creados",
        type: "bar",
        data: githubRepositoryActivity.map((repo) => repo.openedIssues),
        itemStyle: { color: "#d97706" },
        label: {
          show: true,
          position: "top",
          fontSize: 10,
          formatter: (p: { value: number }) => (p.value > 0 ? `${p.value}` : ""),
        },
      },
      {
        name: "Issues activos",
        type: "bar",
        data: githubRepositoryActivity.map((repo) => repo.activeIssues),
        itemStyle: { color: "#0891b2" },
        label: {
          show: true,
          position: "top",
          fontSize: 10,
          formatter: (p: { value: number }) => (p.value > 0 ? `${p.value}` : ""),
        },
      },
      {
        name: "Issues cerrados",
        type: "bar",
        data: githubRepositoryActivity.map((repo) => repo.closedIssues),
        itemStyle: { color: "#16a34a" },
        label: {
          show: true,
          position: "top",
          fontSize: 10,
          formatter: (p: { value: number }) => (p.value > 0 ? `${p.value}` : ""),
        },
      },
    ],
  };

  const loadingOptions = sprintOptionsQuery.isLoading || developerOptionsQuery.isLoading;
  const loadingMetrics = dashboardQuery.isLoading && !dashboardData;
  const refreshingMetrics = dashboardQuery.isFetching && Boolean(dashboardData);
  const loadingGitHubKpis = githubKpisQuery.isLoading && !githubKpisQuery.data;
  const refreshingGitHubKpis = githubKpisQuery.isFetching && Boolean(githubKpisQuery.data);
  const loadingDeveloperCharts =
    selectedDeveloperId === ALL_DASHBOARD_FILTER &&
    developerKpisQueries.some((query) => query.isLoading || query.isFetching);
  const hasOptionsError = Boolean(sprintOptionsQuery.error || developerOptionsQuery.error);
  const hasMetricsError = Boolean(dashboardQuery.error);
  const hasGitHubKpisError = Boolean(githubKpisQuery.error);
  const hasGitHubContributions = filteredGitHubContributions.length > 0;
  const hasGitHubCommitShareData = githubCommitShareData.length > 0;
  const hasGitHubSprintActivity = filteredGitHubSprintActivity.length > 0;
  const hasGitHubRepositoryActivity = githubRepositoryActivity.length > 0;
  const hasSprintHistory = sprintHistory.length > 0;
  const hasDeveloperChartData = developerDashboards.length > 0 && hasSprintHistory;
  const showGlobalDeveloperCharts =
    selectedSprintId === ALL_DASHBOARD_FILTER &&
    selectedDeveloperId === ALL_DASHBOARD_FILTER;

  if (loadingOptions) {
    return (
      <div className={styles.loadingState}>
        <CircularProgress size={24} />
        <span>Cargando filtros...</span>
      </div>
    );
  }

  if (hasOptionsError) {
    return (
      <Alert severity="error" className={styles.dashboardAlert}>
        No se pudieron cargar las opciones del dashboard.
      </Alert>
    );
  }

  return (
    <div className={styles.root}>
      <div className={styles.filters}>
        <div className={styles.filterGroup}>
          <span className={styles.filterLabel}>Filtro por Sprints</span>
          <FormControl size="small" className={styles.filterControl}>
            <Select
              value={selectedSprintId}
              onChange={(event) => setSelectedSprintId(event.target.value)}
              inputProps={{ "aria-label": "Sprint" }}
            >
              {sprintOptions.map((sprint) => (
                <MenuItem key={sprint.id} value={sprint.id}>
                  {sprint.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className={styles.filterGroup}>
          <span className={styles.filterLabel}>Filtro por Developer</span>
          <FormControl size="small" className={styles.filterControl}>
            <Select
              value={selectedDeveloperId}
              onChange={(event) => setSelectedDeveloperId(event.target.value)}
              inputProps={{ "aria-label": "Developer" }}
            >
              {developerOptions.map((developer) => (
                <MenuItem key={developer.id} value={developer.id}>
                  {developer.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>

      {(refreshingMetrics || refreshingGitHubKpis) && (
        <div className={styles.inlineLoading}>
          <CircularProgress size={16} />
          <span>Cargando métricas...</span>
        </div>
      )}

      {hasMetricsError && (
        <Alert severity="error" className={styles.dashboardAlert}>
          No se pudieron cargar las métricas del dashboard.
        </Alert>
      )}

      {loadingMetrics ? (
        <div className={styles.loadingState}>
          <CircularProgress size={24} />
          <span>Cargando métricas...</span>
        </div>
      ) : dashboardData && summary ? (
        <>
          <h3 className={styles.metricsSectionTitle}>Métricas generales</h3>

          <div className={styles.kpiGridPrimary}>
            <KpiCard
              label="Progreso General"
              value={formatPercentSmart(summary.completionRate)}
              tone={getPercentKpiTone(summary.completionRate)}
            />
            <KpiCard
              label="Completitud del Sprint"
              value={formatPercentSmart(summary.completionRate)}
              tone={getPercentKpiTone(summary.completionRate)}
            />
            <KpiCard
              label="Entrega a Tiempo"
              value={formatPercentSmart(summary.onTimeRate)}
              tone={getPercentKpiTone(summary.onTimeRate)}
            />
            <KpiCard
              label="Precisión de Estimación"
              value={formatSmartNumber(summary.estimationAccuracy, 2)}
              tone={getAccuracyKpiTone(summary.estimationAccuracy)}
            />
          </div>

          <div className={styles.kpiGridSecondary}>
            <KpiCard
              label={
                selectedSprintId === ALL_DASHBOARD_FILTER
                  ? "Tareas Totales"
                  : "Tareas en Sprint"
              }
              value={formatSmartNumber(summary.totalTasks)}
              tone="blue"
            />
            <KpiCard
              label="# Tareas Completadas"
              value={formatSmartNumber(summary.completedTasks)}
              tone="blue"
            />
            <KpiCard
              label="# Horas Reales"
              value={formatHours(summary.totalRealHours)}
              tone="blue"
            />
            <KpiCard
              label="Promedio Tareas / Desarrollador"
              value={formatSmartNumber(summary.avgTasksPerDeveloper, 1)}
              tone="blue"
            />
            <KpiCard
              label="Promedio Horas / Desarrollador"
              value={formatHours(summary.avgHoursPerDeveloper)}
              tone="blue"
            />
          </div>

          {summary.totalTasks === 0 && (
            <div className={styles.emptyNotice}>
              No hay tareas registradas para esta combinación de filtros.
            </div>
          )}

          <div className={styles.chartGridTwo}>
            <ChartCard title="Entrega a Tiempo por Sprint">
              {hasSprintHistory ? (
                <ReactECharts option={stackedBarOption} className={styles.chart180} />
              ) : (
                <EmptyState />
              )}
            </ChartCard>

            <ChartCard title="Estimación vs Real (hrs)">
              {hasSprintHistory ? (
                <ReactECharts option={groupedBarOption} className={styles.chart180} />
              ) : (
                <EmptyState />
              )}
            </ChartCard>
          </div>

          <div className={styles.chartGridBottom}>
            <ChartCard title="Tareas Terminadas por Desarrollador / Sprint">
              {loadingDeveloperCharts ? (
                <ChartLoading />
              ) : hasDeveloperChartData ? (
                <ReactECharts option={tasksPerDevSprintOption} className={styles.chart260} />
              ) : (
                <EmptyState />
              )}
            </ChartCard>

            <ChartCard title="Horas Reales por Desarrollador / Sprint">
              {loadingDeveloperCharts ? (
                <ChartLoading />
              ) : hasDeveloperChartData ? (
                <ReactECharts option={hrsPerDevSprintOption} className={styles.chart260} />
              ) : (
                <EmptyState />
              )}
            </ChartCard>
          </div>

          {showGlobalDeveloperCharts && (
            <div className={styles.chartGridThree}>
              <ChartCard title="Responsabilidad Individual (alcance seleccionado)">
                {loadingDeveloperCharts ? (
                  <ChartLoading />
                ) : hasDeveloperChartData ? (
                  <ReactECharts option={hbarOption} className={styles.chart210} />
                ) : (
                  <EmptyState />
                )}
              </ChartCard>

              <ChartCard title="Productividad Histórica por Desarrollador">
                {loadingDeveloperCharts ? (
                  <ChartLoading />
                ) : hasDeveloperChartData ? (
                  <ReactECharts option={multilineOption} className={styles.chart210} />
                ) : (
                  <EmptyState />
                )}
              </ChartCard>

              <ChartCard title="Carga de Trabajo (hrs por sprint)">
                {loadingDeveloperCharts ? (
                  <ChartLoading />
                ) : hasDeveloperChartData ? (
                  <ReactECharts option={workloadOption} className={styles.chart210} />
                ) : (
                  <EmptyState />
                )}
              </ChartCard>
            </div>
          )}

          <div className={styles.githubSection}>
            <h3 className={styles.githubSectionTitle}>Actividad GitHub</h3>

            <div className={styles.kpiGridGithub}>
              <KpiCard
                label="Repos monitoreados"
                value={
                  loadingGitHubKpis
                    ? "--"
                    : formatSmartNumber(monitoredRepos)
                }
                tone="blue"
              />
              <KpiCard
                label="Commits GitHub"
                value={
                  loadingGitHubKpis
                    ? "--"
                    : formatSmartNumber(githubSummary.totalCommits)
                }
                tone="blue"
              />
              <KpiCard
                label="Issues creados"
                value={
                  loadingGitHubKpis
                    ? "--"
                    : formatSmartNumber(githubSummary.openedIssues)
                }
                tone="blue"
              />
              <KpiCard
                label="Issues cerrados"
                value={
                  loadingGitHubKpis
                    ? "--"
                    : formatSmartNumber(githubSummary.closedIssues)
                }
                tone={getClosedIssuesKpiTone(
                  githubSummary.openedIssues,
                  githubSummary.closedIssues
                )}
              />
              <KpiCard
                label="Issues activos"
                value={
                  loadingGitHubKpis
                    ? "--"
                    : formatSmartNumber(githubSummary.activeIssues)
                }
                tone={getActiveIssuesKpiTone(githubSummary.activeIssues)}
              />
              <KpiCard
                label="Tasa de cierre"
                value={
                  loadingGitHubKpis
                    ? "--"
                    : formatPercentSmart(githubIssueClosureRate)
                }
                tone={getPercentKpiTone(githubIssueClosureRate)}
              />
            </div>

            {hasGitHubKpisError && (
              <Alert severity="error" className={styles.dashboardAlert}>
                No se pudieron cargar las metricas de GitHub.
              </Alert>
            )}

            <div className={styles.chartGridTwo}>
              <ChartCard title="Actividad técnica por integrante">
                {loadingGitHubKpis ? (
                  <ChartLoading />
                ) : hasGitHubContributions ? (
                  <ReactECharts
                    option={githubContributionsOption}
                    className={styles.chart260}
                  />
                ) : (
                  <EmptyState />
                )}
              </ChartCard>

              <ChartCard title="Distribución porcentual de commits">
                {loadingGitHubKpis ? (
                  <ChartLoading />
                ) : hasGitHubCommitShareData ? (
                  <ReactECharts
                    option={githubCommitShareOption}
                    className={styles.chart260}
                  />
                ) : (
                  <EmptyState />
                )}
              </ChartCard>
            </div>

            <div className={styles.chartGridTwo}>
              <ChartCard title="Actividad GitHub por sprint">
                {loadingGitHubKpis ? (
                  <ChartLoading />
                ) : hasGitHubSprintActivity ? (
                  <ReactECharts
                    option={githubSprintActivityOption}
                    className={styles.chart260}
                  />
                ) : (
                  <EmptyState />
                )}
              </ChartCard>

              <ChartCard title="Actividad GitHub por repositorio">
                {loadingGitHubKpis ? (
                  <ChartLoading />
                ) : hasGitHubRepositoryActivity ? (
                  <ReactECharts
                    option={githubRepositoryActivityOption}
                    className={styles.chart260}
                  />
                ) : (
                  <EmptyState />
                )}
              </ChartCard>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};

type KpiTone = "blue" | "green" | "orange" | "red";

const KPI_TONE_CLASS: Record<KpiTone, string> = {
  blue: styles.kpiBlue,
  green: styles.kpiGreen,
  orange: styles.kpiOrange,
  red: styles.kpiRed,
};

const getPercentKpiTone = (value: number | null): KpiTone => {
  if (value === null) return "blue";
  if (value >= 80) return "green";
  if (value >= 50) return "orange";
  return "red";
};

const getAccuracyKpiTone = (value: number | null): KpiTone => {
  if (value === null) return "blue";
  if (value > 0.9) return "green";
  if (value >= 0.6) return "orange";
  return "red";
};

const getActiveIssuesKpiTone = (value: number | null | undefined): KpiTone => {
  const activeIssues = Number(value ?? 0);
  if (activeIssues < 10) return "green";
  if (activeIssues < 30) return "orange";
  return "red";
};

const getClosedIssuesKpiTone = (
  openedIssues: number,
  closedIssues: number
): KpiTone => {
  if (openedIssues <= 0) return "green";
  return getPercentKpiTone((closedIssues / openedIssues) * 100);
};

const KpiCard = ({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: KpiTone;
}) => (
  <div className={`${styles.kpiCard} ${KPI_TONE_CLASS[tone]}`}>
    <span className={styles.kpiLabel}>{label}</span>
    <span className={styles.kpiValue}>{value}</span>
  </div>
);

const ChartCard = ({ title, children }: { title: string; children: ReactNode }) => (
  <div className={styles.chartCard}>
    <h3 className={styles.chartTitle}>{title}</h3>
    {children}
  </div>
);

const EmptyState = () => (
  <div className={styles.emptyState}>
    Sin datos suficientes
  </div>
);

const ChartLoading = () => (
  <div className={styles.emptyState}>
    <CircularProgress size={22} />
  </div>
);
