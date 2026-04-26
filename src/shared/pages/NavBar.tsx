import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from "@/app/router/routes";
import { useAuth } from "@/features/auth/hooks/useAuth";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import AccountTreeOutlinedIcon from "@mui/icons-material/AccountTreeOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import SmartToyOutlinedIcon from "@mui/icons-material/SmartToyOutlined";

const NAV_ITEMS = [
  { path: ROUTES.dashboard, label: "Inicio",    icon: <DashboardOutlinedIcon /> },
  { path: ROUTES.tareas,    label: "Tareas",    icon: <AssignmentOutlinedIcon /> },
  { path: ROUTES.agent,     label: "Agent",     icon: <SmartToyOutlinedIcon /> },
  { path: ROUTES.proyectos, label: "Proyectos", icon: <AccountTreeOutlinedIcon /> },
  { path: ROUTES.equipos,   label: "Equipos",   icon: <GroupOutlinedIcon /> },
];

export const NavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { auth, logout } = useAuth();

  const isNavItemActive = (path: string) => {
    if (path === ROUTES.dashboard) {
      return location.pathname === path;
    }

    return (
      location.pathname === path || location.pathname.startsWith(`${path}/`)
    );
  };

  const handleLogout = () => {
    logout();
    navigate(ROUTES.login, { replace: true });
  };

  return (
    <aside className="nav-quick-rail" role="navigation" aria-label="Menú principal">
      <div className="nav-rail-header">
        <span className="nav-logo-icon">W</span>
        <span className="nav-rail-title">Workspace</span>
      </div>

      <div className="nav-quick-links" aria-label="Accesos rápidos">
        {NAV_ITEMS.map(({ path, label, icon }) => (
          <Link
            key={path}
            to={path}
            className={`nav-quick-link${isNavItemActive(path) ? " active" : ""}`}
            aria-label={label}
            title={label}
          >
            <span className="nav-quick-link-icon">{icon}</span>
            <span className="nav-quick-link-label">{label}</span>
          </Link>
        ))}
      </div>

      <div className="nav-rail-bottom">
        {auth.user && (
          <span className="nav-rail-email">{auth.user.email}</span>
        )}

        <button className="nav-rail-logout-btn" onClick={handleLogout} type="button">
          <LogoutIcon />
          <span>Cerrar sesión</span>
        </button>
      </div>

      <div className="nav-rail-footer">MtdrSpring · v1.0</div>
    </aside>
  );
};
