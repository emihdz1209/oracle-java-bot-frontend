import styles from "@/features/agent/styles/AgentOptionsGrid.module.css";

export type AgentOptionId =
  | "generate-tasks"
  | "duplicate-task-analysis";

export interface AgentOption {
  id: AgentOptionId;
  title: string;
  description: string;
}

interface AgentOptionsGridProps {
  options: AgentOption[];
  onSelectOption: (option: AgentOption) => void;
}

export const AgentOptionsGrid = ({
  options,
  onSelectOption,
}: AgentOptionsGridProps) => {
  return (
    <section className={styles.section}>
      <span className="section-label">Opciones del agente · {options.length}</span>

      <div className={styles.grid}>
        {options.map((option) => (
          <button
            key={option.id}
            type="button"
            className={styles.card}
            onClick={() => onSelectOption(option)}
          >
            <div className={styles.cardHeader}>
              <span aria-hidden="true" className={styles.headerIcon} />
            </div>

            <h3 className={styles.optionName}>{option.title}</h3>
            <p className={styles.description}>{option.description}</p>
          </button>
        ))}
      </div>
    </section>
  );
};
