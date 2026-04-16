/// src/features/dashboard/pages/ManagerDashboardPage.tsx

import React from "react";
import { NavBar } from "@/shared/pages/NavBar";
import { ManagerPortfolioDashboard } from "@/features/dashboard/components/ManagerPortfolioDashboard";

export const ManagerDashboardPage = () => {
  return (
    <div className="App">
      <NavBar />

      <div className="page-header">
        <div>
          <h2>Portfolio Dashboard</h2>
          <p className="page-subtitle">
            Vista consolidada de todos tus proyectos
          </p>
        </div>
      </div>

      <ManagerPortfolioDashboard />
    </div>
  );
};
