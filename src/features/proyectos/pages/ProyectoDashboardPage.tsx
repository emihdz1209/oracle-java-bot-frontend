import { useState } from "react";
import { Button, CircularProgress } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { ROUTES } from "@/app/router/routes";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useEquipos } from "@/features/equipos/hooks/useEquipos";
import { CreateSprintForm } from "@/features/proyectos/components/CreateSprintForm";
import { ProyectoSideModal } from "@/features/proyectos/components/ProyectoSideModal";
import { ProyectosDashboardSection } from "@/features/proyectos/components/ProyectosDashboardSection";
import { useCreateSprint, useProyecto } from "@/features/proyectos/hooks/useProyectos";
import type { CreateSprintRequest } from "@/features/proyectos/types/proyecto";
import styles from "@/features/proyectos/styles/ProyectosDashboardPage.module.css";
import { NavBar } from "@/shared/pages/NavBar";
import { AppModal, useAppModal } from "@/shared/components/AppModal";

const progressToneClass = (percentage: number) =>
  percentage >= 75
    ? styles.progressHigh
    : percentage >= 40
      ? styles.progressMedium
      : styles.progressLow;

export const ProyectoDashboardPage = () => {
  const navigate = useNavigate();
  const { projectId } = useParams<{ projectId: string }>();
  const { auth } = useAuth();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [sprintError, setSprintError] = useState<string | null>(null);
  const createSprintModal = useAppModal();

  const { data: proyecto, isLoading, isError } = useProyecto(projectId);
  const { data: equipos = [] } = useEquipos();
  const createSprintMutation = useCreateSprint(proyecto?.projectId);
  const canManageProjects = auth.user?.role === "MANAGER";

  const teamName = proyecto
    ? equipos.find((equipo) => equipo.teamId === proyecto.teamId)?.nombre ?? proyecto.teamId
    : "";
  const progress = proyecto?.progreso ?? 0;
  const isSideModalOpen = isEditModalOpen && Boolean(proyecto);

  const handleBack = () => {
    navigate(ROUTES.proyectos);
  };

  const handleOpenEdit = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseEdit = () => {
    setIsEditModalOpen(false);
  };

  const handleProjectDeleted = () => {
    navigate(ROUTES.proyectos);
  };

  const handleOpenCreateSprint = () => {
    setSprintError(null);
    createSprintModal.openModal();
  };

  const handleCloseCreateSprint = () => {
    setSprintError(null);
    createSprintModal.closeModal();
  };

  const handleCreateSprint = (sprint: CreateSprintRequest) => {
    if (!proyecto) {
      return;
    }

    setSprintError(null);
    createSprintMutation.mutate(sprint, {
      onSuccess: () => {
        handleCloseCreateSprint();
      },
      onError: () => {
        setSprintError(
          "No se pudo crear el sprint. Verifica que las fechas no se traslapen con otro sprint."
        );
      },
    });
  };

  return (
    <div className="App">
      <NavBar />

      <div className={`page-header ${styles.header}`}>
        <div className={styles.headerInfo}>
          <Button
            variant="outlined"
            onClick={handleBack}
            className={styles.topBackButton}
            startIcon={(
              <span
                aria-hidden="true"
                className={`${styles.buttonIcon} ${styles.arrowBackIcon}`}
              />
            )}
          >
            Volver a proyectos
          </Button>

          <span className={`section-label ${styles.inlineSectionLabel}`}>
            Dashboard de proyecto
          </span>
          <h2>{proyecto?.nombre ?? "Proyecto"}</h2>
          <p className="page-subtitle">
            {proyecto
              ? "KPIs de sprints, progreso y rendimiento del equipo"
              : "Cargando información del proyecto"}
          </p>
          {proyecto && <p className={styles.teamText}>{teamName}</p>}
        </div>

        {proyecto ? (
          <div className={styles.headerProgress}>
            <div className={styles.progressMeta}>
              <span>Progreso</span>
              <strong>{progress}%</strong>
            </div>
            <progress
              className={`${styles.progressValue} ${progressToneClass(progress)}`}
              value={progress}
              max={100}
            />
          </div>
        ) : (
          <div className={styles.headerProgressPlaceholder} />
        )}

        <div className={styles.headerActions}>
          <Button
            variant="contained"
            onClick={handleOpenCreateSprint}
            className={styles.createSprintButton}
            disabled={!proyecto || !canManageProjects}
            startIcon={(
              <span
                aria-hidden="true"
                className={`${styles.buttonIcon} ${styles.createSprintIcon}`}
              />
            )}
          >
            Nuevo sprint
          </Button>
          <Button
            variant="outlined"
            onClick={handleOpenEdit}
            className={styles.editButton}
            disabled={!proyecto || !canManageProjects}
            startIcon={(
              <span
                aria-hidden="true"
                className={`${styles.buttonIcon} ${styles.editProjectIcon}`}
              />
            )}
          >
            Editar proyecto
          </Button>
        </div>
      </div>

      <div
        className={`tareas-layout ${styles.dashboardLayout} ${
          isSideModalOpen ? "tareas-layout--with-panel" : ""
        }`}
      >
        <div className={`tareas-main ${styles.dashboardMain}`}>
          {isLoading ? (
            <div className={styles.loadingState}>
              <CircularProgress />
            </div>
          ) : isError || !proyecto ? (
            <div className={styles.emptyState}>
              <p>No se pudo cargar el proyecto solicitado.</p>
              <Button variant="outlined" onClick={handleBack}>
                Regresar
              </Button>
            </div>
          ) : (
            <>
              <ProyectosDashboardSection
                projectId={proyecto.projectId}
              />
            </>
          )}
        </div>

        {isSideModalOpen && (
          <ProyectoSideModal
            project={proyecto ?? null}
            onClose={handleCloseEdit}
            onProjectDeleted={handleProjectDeleted}
            teamId={proyecto?.teamId ?? ""}
            canManageProjects={canManageProjects}
          />
        )}
      </div>

      <AppModal
        open={Boolean(proyecto) && createSprintModal.isOpen}
        onClose={handleCloseCreateSprint}
        title="Nuevo sprint                            "
      >
        <CreateSprintForm
          onSubmit={handleCreateSprint}
          isPending={createSprintMutation.isPending}
          submitError={sprintError}
          onClearSubmitError={() => setSprintError(null)}
        />
      </AppModal>
    </div>
  );
};
