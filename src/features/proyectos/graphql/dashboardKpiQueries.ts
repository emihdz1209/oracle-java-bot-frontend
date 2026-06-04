export const DASHBOARD_SPRINT_OPTIONS = `
  query DashboardSprintOptions($projectId: ID!) {
    dashboardSprintOptions(projectId: $projectId) {
      id
      name
      startDate
      endDate
    }
  }
`;

export const DASHBOARD_DEVELOPER_OPTIONS = `
  query DashboardDeveloperOptions($projectId: ID!) {
    dashboardDeveloperOptions(projectId: $projectId) {
      id
      name
      email
    }
  }
`;

export const PROJECT_DASHBOARD_KPIS = `
  query ProjectDashboardKpis(
    $projectId: ID!
    $sprintId: ID
    $developerId: ID
  ) {
    projectDashboardKpis(
      projectId: $projectId
      sprintId: $sprintId
      developerId: $developerId
    ) {
      projectId
      sprintId
      sprintName
      developerId
      developerName
      scopeLabel
      summary {
        totalTasks
        completedTasks
        onTimeTasks
        delayedTasks
        totalEstimatedHours
        totalRealHours
        completionRate
        onTimeRate
        estimationAccuracy
        avgTasksPerDeveloper
        avgHoursPerDeveloper
      }
      sprintHistory {
        sprintId
        sprintName
        totalTasks
        completedTasks
        onTimeTasks
        delayedTasks
        totalEstimatedHours
        totalRealHours
      }
    }
  }
`;

export const GITHUB_KPIS = `
  query GitHubKpis($projectId: ID!) {
    githubContributions(projectId: $projectId) {
      name
      githubUsername
      totalCommits
      openedIssues
      closedIssues
    }
    githubSprintActivity(projectId: $projectId) {
      sprintName
      totalCommits
      openedIssues
      closedIssues
    }
    githubRepositoryActivity(projectId: $projectId) {
      owner
      repoName
      totalCommits
      openedIssues
      closedIssues
    }
  }
`;
