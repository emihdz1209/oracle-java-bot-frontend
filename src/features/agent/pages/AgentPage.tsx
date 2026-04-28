import { useState } from "react";

import { NavBar } from "@/shared/pages/NavBar";
import { useAppModal } from "@/shared/components/AppModal";
import {
  AgentOptionsGrid,
  type AgentOption,
} from "@/features/agent/components/AgentOptionsGrid";
import { AgentProjectSelectorModal } from "@/features/agent/components/AgentProjectSelectorModal";
import styles from "@/features/agent/styles/AgentPage.module.css";

const AGENT_OPTIONS: AgentOption[] = [
  {
    id: "generate-tasks",
    title: "Generar tareas",
    description:
      "Configura el proyecto objetivo y una cantidad de horas para preparar la generacion automatizada de tareas.",
  },
  {
    id: "duplicate-task-analysis",
    title: "Analisis de tareas duplicadas",
    description:
      "Selecciona el proyecto para inspeccionar coincidencias potenciales entre tareas existentes.",
  },
];

export const AgentPage = () => {
  const selectorModal = useAppModal();
  const [selectedOption, setSelectedOption] = useState<AgentOption | null>(null);

  const handleSelectOption = (option: AgentOption) => {
    setSelectedOption(option);
    selectorModal.openModal();
  };

  const handleCloseModal = () => {
    selectorModal.closeModal();
    setSelectedOption(null);
  };

  return (
    <div className="App">
      <NavBar />

      <div className="page-header">
        <div>
          <h2>Agent</h2>
          <p className="page-subtitle">
            Prepara tu flujo de automatizacion seleccionando la accion y el contexto de
            proyecto.
          </p>
        </div>
      </div>

      <p className={styles.introText}>
        Esta seccion centraliza capacidades de IA para planificacion y analitica.
      </p>

      <AgentOptionsGrid options={AGENT_OPTIONS} onSelectOption={handleSelectOption} />

      <AgentProjectSelectorModal
        open={selectorModal.isOpen}
        onClose={handleCloseModal}
        selectedOption={selectedOption}
      />
    </div>
  );
};
