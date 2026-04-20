import type { ReactNode } from "react";

interface SidePanelLayoutProps {
  isPanelOpen: boolean;
  children: ReactNode;
  panel: ReactNode;
}

export const SidePanelLayout = ({ isPanelOpen, children, panel }: SidePanelLayoutProps) => {
  return (
    <div className={`tareas-layout ${isPanelOpen ? "tareas-layout--with-panel" : ""}`}>
      <div className="tareas-main">{children}</div>
      {panel}
    </div>
  );
};
