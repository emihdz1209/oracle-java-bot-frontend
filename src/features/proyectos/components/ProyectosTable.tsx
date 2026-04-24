import { CircularProgress } from "@mui/material";
import type { Proyecto } from "@/features/proyectos/types/proyecto";
import styles from "@/features/proyectos/styles/ProyectosTable.module.css";

const fmtDate = (value: string | null) =>
  value ? new Date(value).toLocaleDateString("es-MX") : "—";

const progressToneClass = (percentage: number) =>
  percentage >= 75
    ? styles.progressHigh
    : percentage >= 40
      ? styles.progressMedium
      : styles.progressLow;

interface ProyectosTableProps {
  isLoading: boolean;
  selectedTeamId: string;
  selectedProjectId: string;
  detailProjectId: string | null;
  proyectos?: Proyecto[];
  onDetailProjectChange: (project: Proyecto | null) => void;
  onDashboardProjectChange: (projectId: string) => void;
}

export const ProyectosTable = ({
  isLoading,
  selectedTeamId,
  selectedProjectId,
  detailProjectId,
  proyectos,
  onDetailProjectChange,
  onDashboardProjectChange,
}: ProyectosTableProps) => {
  return (
    <div className={styles.tableContainer}>
      <span className="section-label">
        Proyectos registrados · {(proyectos || []).length}
      </span>

      {isLoading ? (
        <CircularProgress />
      ) : !selectedTeamId ? (
        <p className={styles.emptyState}>
          Selecciona un equipo para ver sus proyectos.
        </p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Progreso</th>
              <th>Inicio</th>
              <th>Fin</th>
              <th>Dashboard</th>
            </tr>
          </thead>
          <tbody>
            {(proyectos || []).map((proyecto) => {
              const progress = proyecto.progreso || 0;
              const isActive = proyecto.projectId === selectedProjectId;
              const isDetailOpen = detailProjectId === proyecto.projectId;

              return (
                <tr key={proyecto.projectId} className={isActive ? styles.activeRow : undefined}>
                  <td className="cell-primary">
                    <button
                      onClick={() => onDetailProjectChange(isDetailOpen ? null : proyecto)}
                      className={`${styles.detailButton} ${
                        isDetailOpen ? styles.detailButtonActive : ""
                      }`}
                    >
                      {proyecto.nombre}
                    </button>
                  </td>
                  <td>{proyecto.descripcion || "—"}</td>
                  <td>
                    <div className="progress-wrap">
                      <progress
                        className={`${styles.progressValue} ${progressToneClass(progress)}`}
                        value={progress}
                        max={100}
                      />
                      <span className="progress-label">{progress}%</span>
                    </div>
                  </td>
                  <td>{fmtDate(proyecto.fechaInicio)}</td>
                  <td>{fmtDate(proyecto.fechaFin)}</td>
                  <td>
                    <button
                      onClick={() => onDashboardProjectChange(proyecto.projectId)}
                      className={`${styles.dashboardButton} ${
                        isActive ? styles.dashboardButtonActive : ""
                      }`}
                    >
                      {isActive ? "Cerrar" : "Ver"}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};
