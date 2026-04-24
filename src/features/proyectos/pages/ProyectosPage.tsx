/// src/features/proyectos/pages/ProyectosPage.tsx

import { useEffect, useState } from "react";
import { useEquipos } from "@/features/equipos/hooks/useEquipos";
import {
  useProyectos,
  useCreateProyecto,
} from "@/features/proyectos/hooks/useProyectos";
import { useAuth } from "@/features/auth/hooks/useAuth";
import type { Proyecto } from "@/features/proyectos/types/proyecto";
import {
  CreateProyectoModal,
  type ProyectoCreateFormState,
} from "@/features/proyectos/components/CreateProyectoModal";
import { ProyectosFilters } from "@/features/proyectos/components/ProyectosFilters";
import { ProyectosTable } from "@/features/proyectos/components/ProyectosTable";
import { ProyectoSideModal } from "@/features/proyectos/components/ProyectoSideModal";
import { ProyectosPageHeader } from "@/features/proyectos/components/ProyectosPageHeader";
import { ProyectosDashboardSection } from "@/features/proyectos/components/ProyectosDashboardSection";
import { NavBar } from "@/shared/pages/NavBar";
import { useAppModal } from "@/shared/components/AppModal";

// ── Persistence helpers ──────────────────────────────────────────────────────

const TEAM_STORAGE_KEY = "proyectos.selectedTeamId";
const PROJECT_STORAGE_KEY = "proyectos.selectedProjectId";

const readStoredValue = (key: string): string => {
  try {
    return localStorage.getItem(key) ?? "";
  } catch {
    return "";
  }
};

const persistStoredValue = (key: string, value: string): void => {
  try {
    if (value) {
      localStorage.setItem(key, value);
      return;
    }
    localStorage.removeItem(key);
  } catch {
    // Ignore storage errors to keep filtering functional.
  }
};

const EMPTY: ProyectoCreateFormState = {
  nombre: "",
  descripcion: "",
  fechaInicio: "",
  fechaFin: "",
};

// ── ProyectosPage ─────────────────────────────────────────────────────────────

export const ProyectosPage = () => {
  const { auth } = useAuth();
  const { data: equipos, isLoading: loadingEquipos } = useEquipos();
  const canManageProjects = auth.user?.role === "MANAGER";

  const [selectedTeamId, setSelectedTeamId] = useState<string>(
    () => readStoredValue(TEAM_STORAGE_KEY)
  );
  const [selectedProjectId, setSelectedProjectId] = useState<string>(
    () => readStoredValue(PROJECT_STORAGE_KEY)
  );
  const [detailProject, setDetailProject] = useState<Proyecto | null>(null);
  const [form, setForm] = useState(EMPTY);
  const createModal = useAppModal();

  const { data: proyectos, isLoading: loadingProyectos } = useProyectos(
    selectedTeamId || undefined
  );
  const createMutation = useCreateProyecto(selectedTeamId);

  const isSideModalOpen = Boolean(detailProject);

  // ── Persistence effects ────────────────────────────────────────
  useEffect(() => {
    persistStoredValue(TEAM_STORAGE_KEY, selectedTeamId);
  }, [selectedTeamId]);

  useEffect(() => {
    persistStoredValue(PROJECT_STORAGE_KEY, selectedProjectId);
  }, [selectedProjectId]);

  // Validate stored team still exists
  useEffect(() => {
    if (!equipos || !selectedTeamId) return;
    const teamExists = equipos.some((eq) => eq.teamId === selectedTeamId);
    if (!teamExists) {
      setSelectedTeamId("");
      setSelectedProjectId("");
    }
  }, [equipos, selectedTeamId]);

  // Validate stored project still belongs to selected team
  useEffect(() => {
    if (!selectedProjectId) return;
    if (!selectedTeamId) {
      setSelectedProjectId("");
      return;
    }
    if (!proyectos) return;
    const projectExists = proyectos.some((p) => p.projectId === selectedProjectId);
    if (!projectExists) setSelectedProjectId("");
  }, [selectedProjectId, selectedTeamId, proyectos]);

  // ── Handlers ──────────────────────────────────────────────────────
  const handleTeamChange = (teamId: string) => {
    setSelectedTeamId(teamId);
    setSelectedProjectId("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canManageProjects || !form.nombre.trim() || !selectedTeamId) return;
    createMutation.mutate(
      {
        ...form,
        fechaInicio: form.fechaInicio || null,
        fechaFin: form.fechaFin || null,
      },
      {
        onSuccess: () => {
          setForm(EMPTY);
          createModal.closeModal();
        },
      }
    );
  };

  const handleOpenCreateModal = () => {
    if (!canManageProjects) {
      return;
    }

    createModal.openModal();
  };

  const selectedProject = proyectos?.find((p) => p.projectId === selectedProjectId);

  // ── Render ────────────────────────────────────────────────────────
  return (
    <div className="App">
      <NavBar />

      <ProyectosPageHeader
        onCreateProject={handleOpenCreateModal}
        isCreateDisabled={!selectedTeamId || !canManageProjects}
      />

      {/* Main layout with side modal */}
      <div className={`tareas-layout ${isSideModalOpen ? "tareas-layout--with-panel" : ""}`}>
        <div className="tareas-main">
          <ProyectosFilters
            selectedTeamId={selectedTeamId}
            selectedProjectId={selectedProjectId}
            equipos={equipos}
            proyectos={proyectos}
            onTeamChange={handleTeamChange}
            onProjectChange={setSelectedProjectId}
          />

          <ProyectosTable
            isLoading={loadingEquipos || loadingProyectos}
            selectedTeamId={selectedTeamId}
            selectedProjectId={selectedProjectId}
            detailProjectId={detailProject?.projectId || null}
            proyectos={proyectos}
            onDetailProjectChange={setDetailProject}
            onDashboardProjectChange={(projectId) => {
              setSelectedProjectId(projectId === selectedProjectId ? "" : projectId);
            }}
          />

          {/* Dashboard section */}
          {selectedProjectId && selectedProject && (
            <ProyectosDashboardSection
              projectId={selectedProjectId}
              projectName={selectedProject.nombre}
            />
          )}
        </div>

        {/* Side modal */}
        <ProyectoSideModal
          project={detailProject}
          teamId={selectedTeamId}
          canManageProjects={canManageProjects}
          onClose={() => setDetailProject(null)}
          onProjectDeleted={(deletedId) => {
            if (deletedId === selectedProjectId) {
              setSelectedProjectId("");
            }
            setDetailProject(null);
          }}
        />
      </div>

      {/* Create project modal */}
      <CreateProyectoModal
        open={canManageProjects && createModal.isOpen}
        onClose={createModal.closeModal}
        form={form}
        onChange={handleChange}
        onSubmit={handleSubmit}
        isPending={createMutation.isPending}
      />
    </div>
  );
};