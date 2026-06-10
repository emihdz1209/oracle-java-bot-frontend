/// src/features/dashboard/pages/DashboardPage.tsx

import { useEffect, useMemo, useState } from "react";
import { CircularProgress } from "@mui/material";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import type { SelectChangeEvent } from "@mui/material/Select";
import AccountTreeOutlinedIcon from "@mui/icons-material/AccountTreeOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import DoneAllOutlinedIcon from "@mui/icons-material/DoneAllOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useManagedProjects } from "@/features/dashboard/hooks/dashboard";
import { useEquipos } from "@/features/equipos/hooks/useEquipos";
import { useAllProyectos } from "@/features/proyectos/hooks/useProyectos";
import { ROUTES } from "@/app/router/routes";
import { NavBar } from "@/shared/pages/NavBar";
import { ManagerPortfolioDashboard } from "@/features/dashboard/components/ManagerPortfolioDashboard";
import type { ManagedProject } from "@/features/dashboard/types/dashboard";

const STATS = [
  {
    key: "activas",
    label: "Proyectos activos",
    bg: "#FFFBEB",
    border: "#FDE68A",
    num: "#B45309",
    sub: "#78350F",
    icon: AccountTreeOutlinedIcon,
  },
  {
    key: "equipos",
    label: "Equipos",
    bg: "#F5F3FF",
    border: "#C4B5FD",
    num: "#6D28D9",
    sub: "#4C1D95",
    icon: GroupOutlinedIcon,
  },
  {
    key: "proyectos",
    label: "Proyectos totales",
    bg: "#EFF6FF",
    border: "#93C5FD",
    num: "#1D4ED8",
    sub: "#1E3A8A",
    icon: AssignmentOutlinedIcon,
  },
  {
    key: "done",
    label: "Proyectos completados",
    bg: "#F0FDF4",
    border: "#86EFAC",
    num: "#15803D",
    sub: "#14532D",
    icon: DoneAllOutlinedIcon,
  },
];

function ProgressBadge({ value }: { value: number }) {
  const color = value >= 100 ? "#15803D" : value >= 50 ? "#2563EB" : "#D97706";

  return (
    <div className="progress-wrap">
      <div className="progress-track">
        <div
          className="progress-fill"
          style={{ width: `${Math.min(value, 100)}%`, background: color }}
        />
      </div>
      <span className="progress-label">{value}%</span>
    </div>
  );
}

interface ProjectPortfolioFilterProps {
  projects: ManagedProject[];
  selectedIds: string[];
  nameMap: Record<string, string>;
  loading: boolean;
  onChange: (event: SelectChangeEvent<string[]>) => void;
  onToggleAll: () => void;
}

function ProjectPortfolioFilter({
  projects,
  selectedIds,
  nameMap,
  loading,
  onChange,
  onToggleAll,
}: ProjectPortfolioFilterProps) {
  if (loading || projects.length === 0) {
    return null;
  }

  const allSelected = selectedIds.length === projects.length;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        gap: 12,
        flexWrap: "wrap",
        marginLeft: "auto",
      }}
    >
      <FormControl size="small" style={{ minWidth: 280, maxWidth: 420 }}>
        <Select
          multiple
          value={selectedIds}
          onChange={onChange}
          renderValue={(selected) => {
            if (selected.length === 0) return "Sin proyectos seleccionados";
            if (selected.length === projects.length) return "Todos los proyectos";
            return selected.map((id) => nameMap[id] ?? id).join(", ");
          }}
        >
          {projects.map((project) => (
            <MenuItem key={project.projectId} value={project.projectId}>
              <Checkbox
                checked={selectedIds.includes(project.projectId)}
                size="small"
              />
              <ListItemText primary={project.nombre} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button
        size="small"
        variant="outlined"
        onClick={onToggleAll}
        style={{ textTransform: "none", fontSize: "0.75rem" }}
      >
        {allSelected ? "Deseleccionar todos" : "Seleccionar todos"}
      </Button>
    </div>
  );
}

export const DashboardPage = () => {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const userId = auth.user?.userId;
  const { data: equipos, isLoading: le } = useEquipos();
  const teamIds = (equipos || []).map((e) => e.teamId);
  const { data: proyectos, isLoading: lp } = useAllProyectos(teamIds);
  const { data: managedProjects = [], isLoading: loadingManagedProjects } =
    useManagedProjects(userId);
  const [selectedPortfolioProjectIds, setSelectedPortfolioProjectIds] =
    useState<string[]>([]);
  const [portfolioFilterInitialized, setPortfolioFilterInitialized] =
    useState(false);

  useEffect(() => {
    if (!portfolioFilterInitialized && managedProjects.length > 0) {
      setSelectedPortfolioProjectIds(managedProjects.map((p) => p.projectId));
      setPortfolioFilterInitialized(true);
    }
  }, [portfolioFilterInitialized, managedProjects]);

  useEffect(() => {
    const availableIds = new Set(managedProjects.map((p) => p.projectId));
    setSelectedPortfolioProjectIds((current) =>
      current.filter((id) => availableIds.has(id)),
    );
  }, [managedProjects]);

  const isLoading = le || lp;

  const proyectosActivos = proyectos.filter((p) => p.progreso < 100);
  const proyectosCompletados = proyectos.filter((p) => p.progreso >= 100);

  const values = {
    activas: proyectosActivos.length,
    equipos: (equipos || []).length,
    proyectos: proyectos.length,
    done: proyectosCompletados.length,
  };
  const managedProjectNameMap = useMemo(() => {
    const map: Record<string, string> = {};
    managedProjects.forEach((project) => {
      map[project.projectId] = project.nombre;
    });
    return map;
  }, [managedProjects]);
  const handlePortfolioProjectChange = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value;
    setSelectedPortfolioProjectIds(
      typeof value === "string" ? value.split(",") : value,
    );
  };
  const toggleAllPortfolioProjects = () => {
    setSelectedPortfolioProjectIds((current) =>
      current.length === managedProjects.length
        ? []
        : managedProjects.map((p) => p.projectId),
    );
  };

  const today = new Intl.DateTimeFormat("es-MX", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(new Date());
  const summaryDate = today.charAt(0).toUpperCase() + today.slice(1);
  const summaryText = `${summaryDate} - ${proyectos.length} proyectos - ${
    (equipos || []).length
  } equipos`;

  return (
    <div className="App">
      <NavBar />

      <div className="page-header">
        <div>
          <h2>Resumen</h2>
          <p className="page-subtitle">{summaryText}</p>
        </div>
        <ProjectPortfolioFilter
          projects={managedProjects}
          selectedIds={selectedPortfolioProjectIds}
          nameMap={managedProjectNameMap}
          loading={loadingManagedProjects}
          onChange={handlePortfolioProjectChange}
          onToggleAll={toggleAllPortfolioProjects}
        />
      </div>

      {isLoading ? (
        <CircularProgress style={{ marginTop: 40 }} />
      ) : (
        <>
          <div
            className="stat-row"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 16,
              width: "100%",
              marginBottom: 24,
            }}
          >
            {STATS.map(({ key, label, bg, border, num, sub, icon: Icon }) => (
              <div
                key={key}
                className="stat-card"
                style={{
                  background: bg,
                  borderColor: border,
                  maxWidth: "none",
                  minHeight: 104,
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 16,
                }}
              >
                <span
                  className="stat-card-icon"
                  style={{
                    color: num,
                    background: "#fff",
                    borderRadius: 12,
                    width: 42,
                    height: 42,
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 0,
                  }}
                >
                  <Icon fontSize="small" />
                </span>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span className="stat-card-label" style={{ color: sub }}>
                    {label}
                  </span>
                  <span className="stat-card-value" style={{ color: num }}>
                    {values[key as keyof typeof values]}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div style={{ width: "100%", marginBottom: 24 }}>
            <ManagerPortfolioDashboard
              allProjects={managedProjects}
              selectedIds={selectedPortfolioProjectIds}
              loadingProjects={loadingManagedProjects}
            />
          </div>

          {proyectos.length > 0 && (
            <div className="page-section">
              <span className="section-label">Proyectos en curso</span>
              <table>
                <thead>
                  <tr>
                    <th>Proyecto</th>
                    <th>Progreso</th>
                    <th>Inicio</th>
                    <th>Fin</th>
                  </tr>
                </thead>
                <tbody>
                  {proyectos.slice(0, 10).map((p) => (
                    <tr
                      key={p.projectId}
                      role="button"
                      tabIndex={0}
                      onClick={() => navigate(`${ROUTES.proyectos}/${p.projectId}`)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          navigate(`${ROUTES.proyectos}/${p.projectId}`);
                        }
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      <td className="cell-primary">{p.nombre}</td>
                      <td>
                        <ProgressBadge value={p.progreso || 0} />
                      </td>
                      <td>
                        {p.fechaInicio
                          ? new Date(p.fechaInicio).toLocaleDateString("es-MX")
                          : "Sin fecha"}
                      </td>
                      <td>
                        {p.fechaFin
                          ? new Date(p.fechaFin).toLocaleDateString("es-MX")
                          : "Sin fecha"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
};
