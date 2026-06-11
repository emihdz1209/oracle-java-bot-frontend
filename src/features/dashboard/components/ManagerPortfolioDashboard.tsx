/// src/features/dashboard/components/ManagerPortfolioDashboard.tsx

import { useMemo } from "react";
import type { ReactNode } from "react";
import { CircularProgress } from "@mui/material";
import ReactECharts from "echarts-for-react";

import {
  useMultiProjectSprints,
  useMultiProjectSprintKpis,
  useMultiProjectProgress,
  useMultiProjectDevPerformance,
} from "@/features/dashboard/hooks/dashboard";
import type { ManagedProject } from "@/features/dashboard/types/dashboard";

// ── Palette ───────────────────────────────────────────────────────────────────

const KPI_COLORS = {
  green: "#16a34a",
  orange: "#d97706",
  red: "#dc2626",
};

const shortName = (fullName: string): string => {
  const parts = fullName.trim().split(/\s+/);
  if (parts.length < 2) return fullName;
  return `${parts[0]} ${parts[1][0]}.`;
};

const getInitials = (fullName: string): string => {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  return parts
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
};

const getPercentKpiColor = (value: number) => {
  if (value >= 80) return KPI_COLORS.green;
  if (value >= 50) return KPI_COLORS.orange;
  return KPI_COLORS.red;
};

const getAccuracyKpiColor = (value: number) => {
  if (value > 0.9) return KPI_COLORS.green;
  if (value >= 0.6) return KPI_COLORS.orange;
  return KPI_COLORS.red;
};

const getActiveTasksKpiColor = (value: number) => {
  if (value < 10) return KPI_COLORS.green;
  if (value < 30) return KPI_COLORS.orange;
  return KPI_COLORS.red;
};

// ── Component ─────────────────────────────────────────────────────────────────

interface ManagerPortfolioDashboardProps {
  allProjects: ManagedProject[];
  selectedIds: string[];
  loadingProjects: boolean;
}

export const ManagerPortfolioDashboard = ({
  allProjects,
  selectedIds,
  loadingProjects,
}: ManagerPortfolioDashboardProps) => {

  // Build name map for convenience
  const nameMap = useMemo(() => {
    const m: Record<string, string> = {};
    allProjects.forEach((p) => (m[p.projectId] = p.nombre));
    return m;
  }, [allProjects]);

  // ── Data fetching for selected projects ─────────────────────────
  const { data: sprintsByProject, isLoading: loadingSprints } =
    useMultiProjectSprints(selectedIds);

  const { data: kpisByProject, isLoading: loadingKpis } =
    useMultiProjectSprintKpis(sprintsByProject);

  const { data: progressByProject, isLoading: loadingProgress } =
    useMultiProjectProgress(selectedIds);

  const { data: devPerfByProject, isLoading: loadingDevs } =
    useMultiProjectDevPerformance(selectedIds);

  const isLoading =
    loadingProjects ||
    loadingSprints ||
    loadingKpis ||
    loadingProgress ||
    loadingDevs;

  // ── KPI aggregation ─────────────────────────────────────────────
  const kpiAgg = useMemo(() => {
    if (selectedIds.length === 0)
      return {
        avgProgress: 0,
        avgSprintCompletion: 0,
        avgOnTime: 0,
        avgEstimationPrecision: 0,
        totalActiveTasks: 0,
      };

    let totalProgress = 0;
    let totalCompletionRate = 0;
    let totalOnTimeRate = 0;
    let totalPrecision = 0;
    let activeTasks = 0;
    let projectsWithSprints = 0;

    for (const pid of selectedIds) {
      // Progress
      const prog = progressByProject[pid]?.progress ?? 0;
      totalProgress += prog;

      // Sprint KPIs aggregated per project
      const kpis = kpisByProject[pid] ?? [];
      if (kpis.length > 0) {
        projectsWithSprints++;

        let pTotalTareas = 0;
        let pCompletadas = 0;
        let pATiempo = 0;
        let pEstimado = 0;
        let pReal = 0;

        for (const k of kpis) {
          pTotalTareas += k.totalTareas;
          pCompletadas += k.tareasCompletadas;
          pATiempo += k.aTiempo;
          pEstimado += k.totalEstimadoHrs;
          pReal += k.totalRealHrs;
        }

        activeTasks += pTotalTareas;

        if (pTotalTareas > 0) {
          totalCompletionRate += (pCompletadas / pTotalTareas) * 100;
        }
        if (pCompletadas > 0) {
          totalOnTimeRate += (pATiempo / pCompletadas) * 100;
        }
        if (pReal > 0) {
          totalPrecision += pEstimado / pReal;
        }
      }
    }

    const n = selectedIds.length;
    const ns = projectsWithSprints || 1;

    return {
      avgProgress: Math.round(totalProgress / n),
      avgSprintCompletion: Math.round(totalCompletionRate / ns),
      avgOnTime: Math.round(totalOnTimeRate / ns),
      avgEstimationPrecision: (totalPrecision / ns).toFixed(2),
      totalActiveTasks: activeTasks,
    };
  }, [selectedIds, progressByProject, kpisByProject]);

  // ── Chart 1: Delivery Health (Stacked Bar — one column per project) ─────
  const deliveryHealthOption = useMemo(() => {
    const projectNames = selectedIds.map((pid) => nameMap[pid] ?? pid);
    const onTimeData = selectedIds.map((pid) => {
      const kpis = kpisByProject[pid] ?? [];
      return kpis.reduce((sum, k) => sum + k.aTiempo, 0);
    });
    const delayedData = selectedIds.map((pid) => {
      const kpis = kpisByProject[pid] ?? [];
      return kpis.reduce((sum, k) => sum + k.conRetraso, 0);
    });

    return {
      tooltip: {
        trigger: "axis" as const,
        axisPointer: { type: "shadow" as const },
      },
      legend: {
        data: ["Tareas a tiempo", "Tareas con retraso"],
        top: 0,
        textStyle: { fontSize: 11 },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "8%",
        top: "56px",
        containLabel: true,
      },
      xAxis: {
        type: "category" as const,
        data: projectNames,
        axisLabel: { rotate: projectNames.length > 4 ? 25 : 0, fontSize: 11 },
      },
      yAxis: {
        type: "value" as const,
        name: "Tareas",
        nameTextStyle: { fontSize: 11 },
      },
      series: [
        {
          name: "Tareas a tiempo",
          type: "bar" as const,
          stack: "delivery",
          data: onTimeData,
          itemStyle: { color: "#16a34a" },
          label: {
            show: true,
            position: "top" as const,
            fontSize: 10,
            formatter: (p: { value: number }) =>
              p.value > 0 ? `${p.value}` : "",
          },
        },
        {
          name: "Tareas con retraso",
          type: "bar" as const,
          stack: "delivery",
          data: delayedData,
          itemStyle: { color: "#dc2626" },
          label: {
            show: true,
            position: "top" as const,
            fontSize: 10,
            formatter: (p: { value: number }) =>
              p.value > 0 ? `${p.value}` : "",
          },
        },
      ],
    };
  }, [selectedIds, kpisByProject, nameMap]);

  // ── Chart 2: Estimation vs Real (Grouped Bar — one group per project) ───
  const estimationOption = useMemo(() => {
    const projectNames = selectedIds.map((pid) => nameMap[pid] ?? pid);
    const estimatedData = selectedIds.map((pid) => {
      const kpis = kpisByProject[pid] ?? [];
      return (
        Math.round(kpis.reduce((sum, k) => sum + k.totalEstimadoHrs, 0) * 10) /
        10
      );
    });
    const realData = selectedIds.map((pid) => {
      const kpis = kpisByProject[pid] ?? [];
      return (
        Math.round(kpis.reduce((sum, k) => sum + k.totalRealHrs, 0) * 10) / 10
      );
    });

    return {
      tooltip: {
        trigger: "axis" as const,
        axisPointer: { type: "shadow" as const },
      },
      legend: {
        data: ["Horas estimadas", "Horas reales"],
        top: 0,
        textStyle: { fontSize: 11 },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "8%",
        top: "56px",
        containLabel: true,
      },
      xAxis: {
        type: "category" as const,
        data: projectNames,
        axisLabel: { rotate: projectNames.length > 4 ? 25 : 0, fontSize: 11 },
      },
      yAxis: {
        type: "value" as const,
        name: "hrs",
        nameTextStyle: { fontSize: 11 },
      },
      series: [
        {
          name: "Horas estimadas",
          type: "bar" as const,
          data: estimatedData,
          itemStyle: { color: "#2563eb" },
          label: {
            show: true,
            position: "top" as const,
            fontSize: 10,
            formatter: (p: { value: number }) =>
              p.value > 0 ? `${p.value}h` : "",
          },
        },
        {
          name: "Horas reales",
          type: "bar" as const,
          data: realData,
          itemStyle: { color: "#16a34a" },
          label: {
            show: true,
            position: "top" as const,
            fontSize: 10,
            formatter: (p: { value: number }) =>
              p.value > 0 ? `${p.value}h` : "",
          },
        },
      ],
    };
  }, [selectedIds, kpisByProject, nameMap]);

  const workloadEntries = useMemo(() => {
    const devMap: Record<
      string,
      { nombre: string; asignadas: number; completadas: number }
    > = {};

    for (const pid of selectedIds) {
      const devs = devPerfByProject[pid] ?? [];
      for (const dev of devs) {
        if (!devMap[dev.userId]) {
          devMap[dev.userId] = {
            nombre: dev.nombre,
            asignadas: 0,
            completadas: 0,
          };
        }
        devMap[dev.userId].asignadas += dev.rendimientoGlobal.asignadas;
        devMap[dev.userId].completadas += dev.rendimientoGlobal.completadas;
      }
    }

    return Object.values(devMap)
      .sort((a, b) => b.completadas - a.completadas)
      .map((entry) => {
        const capacidad = Math.max(entry.asignadas, entry.completadas, 1);
        const porcentaje = Math.round((entry.completadas / capacidad) * 100);

        return {
          nombre: entry.nombre,
          nombreCorto: shortName(entry.nombre),
          iniciales: getInitials(entry.nombre),
          completadas: entry.completadas,
          capacidad,
          porcentaje,
        };
      });
  }, [selectedIds, devPerfByProject]);

  // ── Render ──────────────────────────────────────────────────────

  if (loadingProjects) {
    return (
      <div style={{ display: "flex", justifyContent: "center", padding: 40 }}>
        <CircularProgress />
      </div>
    );
  }

  if (allProjects.length === 0) {
    return (
      <p
        style={{ color: "var(--text-3)", fontSize: "0.875rem", marginTop: 16 }}
      >
        No se encontraron proyectos administrados para esta cuenta.
      </p>
    );
  }

  return (
    <div style={{ width: "100%" }}>
      {selectedIds.length === 0 && (
        <p style={{ color: "var(--text-3)", fontSize: "0.875rem" }}>
          Selecciona al menos un proyecto para ver el panel de portafolio.
        </p>
      )}

      {selectedIds.length > 0 && (
        <>
          {/* KPI cards */}
          {isLoading ? (
            <div
              style={{ display: "flex", justifyContent: "center", padding: 24 }}
            >
              <CircularProgress size={28} />
            </div>
          ) : (
            <>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(5, 1fr)",
                  gap: 12,
                  marginBottom: 24,
                }}
              >
                <KpiCard
                  label="Promedio Progreso General"
                  value={`${kpiAgg.avgProgress}%`}
                  color={getPercentKpiColor(kpiAgg.avgProgress)}
                />
                <KpiCard
                  label="Promedio Completitud del Sprint"
                  value={`${kpiAgg.avgSprintCompletion}%`}
                  color={getPercentKpiColor(kpiAgg.avgSprintCompletion)}
                />
                <KpiCard
                  label="Promedio Entrega a Tiempo"
                  value={`${kpiAgg.avgOnTime}%`}
                  color={getPercentKpiColor(kpiAgg.avgOnTime)}
                />
                <KpiCard
                  label="Promedio Precisión de Estimación"
                  value={String(kpiAgg.avgEstimationPrecision)}
                  color={getAccuracyKpiColor(Number(kpiAgg.avgEstimationPrecision))}
                />
                <KpiCard
                  label="Tareas Activas Totales"
                  value={String(kpiAgg.totalActiveTasks)}
                  color={getActiveTasksKpiColor(kpiAgg.totalActiveTasks)}
                />
              </div>

              {/* Charts row 1: Delivery Health + Estimation vs Real */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 16,
                  marginBottom: 16,
                }}
              >
                <ChartCard title="Entrega a Tiempo">
                  <ReactECharts
                    option={deliveryHealthOption}
                    style={{ height: 220 }}
                  />
                </ChartCard>
                <ChartCard title="Estimación vs Real (hrs)">
                  <ReactECharts
                    option={estimationOption}
                    style={{ height: 220 }}
                  />
                </ChartCard>
              </div>

              <TeamWorkloadCard entries={workloadEntries} />
            </>
          )}
        </>
      )}
    </div>
  );
};

// ── Helper sub-components ─────────────────────────────────────────────────────

const KpiCard = ({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color: string;
}) => (
  <div
    style={{
      background: "#fff",
      border: "1px solid var(--border)",
      borderRadius: "var(--r-md)",
      borderTop: `3px solid ${color}`,
      padding: "14px 16px",
      display: "flex",
      flexDirection: "column",
      gap: 4,
      boxShadow: "var(--shadow-sm)",
    }}
  >
    <span
      style={{
        fontSize: "0.65rem",
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: "0.08em",
        color: "var(--text-3)",
      }}
    >
      {label}
    </span>
    <span
      style={{ fontSize: "1.5rem", fontWeight: 800, color, lineHeight: 1.1 }}
    >
      {value}
    </span>
  </div>
);

const ChartCard = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => (
  <div
    style={{
      background: "#fff",
      border: "1px solid var(--border)",
      borderRadius: "var(--r-md)",
      padding: "16px",
      boxShadow: "var(--shadow-sm)",
    }}
  >
    <h3 style={{ fontSize: "0.78rem", marginBottom: 12 }}>{title}</h3>
    {children}
  </div>
);

interface TeamWorkloadEntry {
  nombre: string;
  nombreCorto: string;
  iniciales: string;
  completadas: number;
  capacidad: number;
  porcentaje: number;
}

const TeamWorkloadCard = ({ entries }: { entries: TeamWorkloadEntry[] }) => (
  <ChartCard title="Carga del equipo">
    {entries.length > 0 ? (
      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        {entries.map((entry) => {
          const completedWidth = Math.min(entry.porcentaje, 100);
          const pendingWidth = Math.max(0, 100 - completedWidth);

          return (
            <div
              key={entry.nombre}
              style={{
                display: "grid",
                gridTemplateColumns: "52px minmax(0, 1fr) auto",
                gap: 14,
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: "50%",
                  background: "#f4f4f5",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                  color: "var(--text-2)",
                }}
              >
                {entry.iniciales}
              </div>
              <div style={{ minWidth: 0 }}>
                <div
                  title={entry.nombre}
                  style={{
                    fontWeight: 700,
                    marginBottom: 8,
                    color: "var(--text-1)",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {entry.nombreCorto}
                </div>
                <div
                  style={{
                    height: 10,
                    borderRadius: 999,
                    background: "#f4f4f5",
                    overflow: "hidden",
                    display: "flex",
                  }}
                >
                  <div
                    style={{
                      width: `${completedWidth}%`,
                      height: "100%",
                      background: "#2563eb",
                    }}
                  />
                  <div
                    style={{
                      width: `${pendingWidth}%`,
                      height: "100%",
                      background: "#dbeafe",
                    }}
                  />
                </div>
              </div>
              <div
                style={{
                  fontWeight: 700,
                  color: getActiveTasksKpiColor(
                    entry.capacidad - entry.completadas,
                  ),
                  whiteSpace: "nowrap",
                }}
              >
                {entry.completadas} / {entry.capacidad} ({entry.porcentaje}%)
              </div>
            </div>
          );
        })}
        <div
          style={{
            display: "flex",
            gap: 18,
            color: "var(--text-2)",
            fontSize: "0.82rem",
            borderTop: "1px solid var(--border)",
            paddingTop: 12,
          }}
        >
          <span>
            <span style={{ color: "#2563eb" }}>●</span> Completadas
          </span>
          <span>
            <span style={{ color: "#dbeafe" }}>●</span> Pendientes
          </span>
          <span>
            <span style={{ color: "#f4f4f5" }}>●</span> Capacidad
          </span>
        </div>
      </div>
    ) : (
      <EmptyState />
    )}
  </ChartCard>
);

const EmptyState = () => (
  <div
    style={{
      height: 200,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "var(--text-3)",
      fontSize: "0.82rem",
    }}
  >
    Sin datos disponibles
  </div>
);
