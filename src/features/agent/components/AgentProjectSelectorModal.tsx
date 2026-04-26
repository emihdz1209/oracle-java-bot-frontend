import { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

import { AppModal } from "@/shared/components/AppModal";
import { useEquipos } from "@/features/equipos/hooks/useEquipos";
import { useProyectos } from "@/features/proyectos/hooks/useProyectos";
import type { AgentOption } from "@/features/agent/components/AgentOptionsGrid";
import styles from "@/features/agent/styles/AgentProjectSelectorModal.module.css";

interface AgentProjectSelectorModalProps {
  open: boolean;
  onClose: () => void;
  selectedOption: AgentOption | null;
}

const DEFAULT_HOURS = "8";

export const AgentProjectSelectorModal = ({
  open,
  onClose,
  selectedOption,
}: AgentProjectSelectorModalProps) => {
  const { data: equipos = [], isLoading: isEquiposLoading } = useEquipos();

  const [selectedTeamId, setSelectedTeamId] = useState("");
  const [selectedProjectId, setSelectedProjectId] = useState("");
  const [plannedHours, setPlannedHours] = useState(DEFAULT_HOURS);

  const { data: proyectos = [], isLoading: isProyectosLoading } = useProyectos(
    selectedTeamId
  );

  useEffect(() => {
    setSelectedProjectId("");
  }, [selectedTeamId]);

  useEffect(() => {
    if (!open) {
      setSelectedTeamId("");
      setSelectedProjectId("");
      setPlannedHours(DEFAULT_HOURS);
    }
  }, [open, selectedOption?.id]);

  const isGenerateTasksOption = selectedOption?.id === "generate-tasks";

  const selectedTeamName = useMemo(
    () => equipos.find((equipo) => equipo.teamId === selectedTeamId)?.nombre ?? "",
    [equipos, selectedTeamId]
  );

  const selectedProjectName = useMemo(
    () =>
      proyectos.find((proyecto) => proyecto.projectId === selectedProjectId)?.nombre ??
      "",
    [proyectos, selectedProjectId]
  );

  return (
    <AppModal
      open={open}
      onClose={onClose}
      title={`Agent · ${selectedOption?.title ?? "Seleccionar contexto"}`}
    >
      <div className={styles.container}>
        <p className={styles.helperText}>
          Selecciona un equipo para cargar sus proyectos. La ejecución inteligente aún
          está en construcción.
        </p>

        {isEquiposLoading ? (
          <div className={styles.loadingState}>
            <CircularProgress size={24} />
          </div>
        ) : (
          <FormControl size="small" fullWidth>
            <InputLabel id="agent-team-select-label">Equipo</InputLabel>
            <Select
              labelId="agent-team-select-label"
              value={selectedTeamId}
              label="Equipo"
              onChange={(event) => setSelectedTeamId(event.target.value as string)}
            >
              <MenuItem value="">
                <em>Seleccionar equipo</em>
              </MenuItem>
              {equipos.map((equipo) => (
                <MenuItem key={equipo.teamId} value={equipo.teamId}>
                  {equipo.nombre}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}

        {selectedTeamId ? (
          <FormControl size="small" fullWidth disabled={isProyectosLoading}>
            <InputLabel id="agent-project-select-label">Proyecto</InputLabel>
            <Select
              labelId="agent-project-select-label"
              value={selectedProjectId}
              label="Proyecto"
              onChange={(event) => setSelectedProjectId(event.target.value as string)}
            >
              <MenuItem value="">
                <em>
                  {isProyectosLoading
                    ? "Cargando proyectos..."
                    : "Seleccionar proyecto"}
                </em>
              </MenuItem>
              {proyectos.map((proyecto) => (
                <MenuItem key={proyecto.projectId} value={proyecto.projectId}>
                  {proyecto.nombre}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        ) : (
          <p className={styles.pendingText}>Selecciona un equipo para continuar.</p>
        )}

        {isGenerateTasksOption && (
          <TextField
            type="number"
            size="small"
            label="Horas de trabajo"
            value={plannedHours}
            onChange={(event) => setPlannedHours(event.target.value)}
            inputProps={{ min: 1, step: 1 }}
            disabled={!selectedProjectId}
            fullWidth
          />
        )}

        <Alert severity="info" className={styles.placeholderAlert}>
          <strong>En desarrollo:</strong> las funcionalidades de IA se habilitaran en la
          siguiente fase.
          {selectedTeamName ? ` Equipo: ${selectedTeamName}.` : ""}
          {selectedProjectName ? ` Proyecto: ${selectedProjectName}.` : ""}
        </Alert>

        <Button className="AddButton" disabled fullWidth>
          Proximamente
        </Button>
      </div>
    </AppModal>
  );
};
