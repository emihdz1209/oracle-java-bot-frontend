import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import HubOutlinedIcon from "@mui/icons-material/HubOutlined";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/app/router/routes";

interface EquiposPageHeaderProps {
  onCreateEquipo: () => void;
  disableCreate: boolean;
}

export const EquiposPageHeader = ({
  onCreateEquipo,
  disableCreate,
}: EquiposPageHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="page-header">
      <div>
        <span className="section-label">Team management</span>
        <h2>Equipos</h2>
        <p className="page-subtitle">Gestión de equipos de trabajo</p>
      </div>

      <div style={{ display: "flex", gap: "8px" }}>
        <Button
          variant="outlined"
          startIcon={<HubOutlinedIcon />}
          onClick={() => navigate(ROUTES.usersGraphql)}
        >
          Perfiles técnicos
        </Button>

        <Button
          className="AddButton"
          startIcon={<AddIcon />}
          onClick={onCreateEquipo}
          disabled={disableCreate}
        >
          Nuevo equipo
        </Button>
      </div>
    </div>
  );
};
