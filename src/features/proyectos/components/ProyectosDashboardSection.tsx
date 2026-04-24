import { ProjectDashboard } from "@/features/proyectos/components/ProjectDashboard";
import styles from "@/features/proyectos/styles/ProyectosPage.module.css";

interface ProyectosDashboardSectionProps {
  projectId: string;
  projectName: string;
}

export const ProyectosDashboardSection = ({
  projectId,
  projectName,
}: ProyectosDashboardSectionProps) => {
  return (
    <div className={styles.dashboardSection}>
      <div className="divider" />
      <div className={styles.dashboardHeader}>
        <span className={`section-label ${styles.inlineSectionLabel}`}>Dashboard</span>
        <span className={styles.dashboardProjectName}>{projectName}</span>
      </div>
      <ProjectDashboard projectId={projectId} />
    </div>
  );
};
