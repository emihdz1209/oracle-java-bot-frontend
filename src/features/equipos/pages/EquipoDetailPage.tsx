import { useParams } from "react-router-dom";
import {
  useEquipoMembers,
  useAddMember,
  useRemoveMember,
} from "@/features/equipos/hooks/useEquipoMembers";
import { useUsers } from "@/features/users/hooks/useUsers";
import {
  Button,
  CircularProgress,
  Select,
  MenuItem,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { NavBar } from "@/shared/pages/NavBar";
import { useState } from "react";
import styles from "./EquipoDetailPage.module.css"; // 🔹 NUEVO

export const EquipoDetailPage = () => {
  const { teamId } = useParams<{ teamId: string }>();

  const { data: members, isLoading } = useEquipoMembers(teamId!);
  const { data: users } = useUsers();

  const addMutation = useAddMember(teamId!);
  const removeMutation = useRemoveMember(teamId!);

  const [selectedUser, setSelectedUser] = useState("");

  return (
    <div className="App">
      <NavBar />

      <div className={styles.container}>
        <Typography variant="h5" className={styles.title}>
          Detalle del Equipo
        </Typography>

        {/* ADD MEMBER */}
        <Card className={styles.card}>
          <CardContent className={styles.cardContent}>
            <Typography variant="subtitle1">
              Agregar miembro
            </Typography>

            <div className={styles.formRow}>
              <Select
                value={selectedUser}
                onChange={(e) => setSelectedUser(e.target.value as string)}
                displayEmpty
                className={styles.select}
              >
                <MenuItem value="">Seleccionar usuario</MenuItem>
                {(users || []).map((u) => (
                  <MenuItem key={u.userId} value={u.userId}>
                    {u.primerNombre} {u.apellido}
                  </MenuItem>
                ))}
              </Select>

              <Button
                variant="contained"
                onClick={() => addMutation.mutate(selectedUser)}
                disabled={!selectedUser}
              >
                Agregar
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* MEMBERS */}
        <Card className={styles.card}>
          <CardContent>
            <Typography variant="subtitle1" gutterBottom>
              Miembros del equipo
            </Typography>

            {isLoading ? (
              <CircularProgress />
            ) : !members || members.length === 0 ? (
              <p className={styles.empty}>No hay miembros</p>
            ) : (
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th className={styles.actions}>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {members.map((m) => (
                    <tr key={m.userId}>
                      <td>{m.nombre || m.userId}</td>
                      <td className={styles.actions}>
                        <Button
                          color="error"
                          size="small"
                          onClick={() => removeMutation.mutate(m.userId)}
                        >
                          Eliminar
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};