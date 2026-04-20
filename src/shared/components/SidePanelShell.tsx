import type { ReactNode } from "react";
import CloseIcon from "@mui/icons-material/Close";

interface SidePanelShellProps {
  open: boolean;
  onClose: () => void;
  ariaLabel: string;
  headerLabel: string;
  title: string;
  children: ReactNode;
}

export const SidePanelShell = ({
  open,
  onClose,
  ariaLabel,
  headerLabel,
  title,
  children,
}: SidePanelShellProps) => {
  return (
    <aside
      className={`tareas-side-modal ${open ? "tareas-side-modal--open" : ""}`}
      aria-hidden={!open}
      aria-label={ariaLabel}
    >
      <div className="tareas-side-modal-inner">
        <div className="tareas-side-modal-header">
          <div>
            <span className="task-detail-label">{headerLabel}</span>
            <h3 className="tareas-side-modal-title">{title}</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="app-modal-close-btn"
            aria-label="Cerrar panel"
          >
            <CloseIcon />
          </button>
        </div>

        <div className="tareas-side-modal-body">{children}</div>
      </div>
    </aside>
  );
};
