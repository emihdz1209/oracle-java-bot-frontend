import { useState } from "react";
import { Alert, Button, CircularProgress, IconButton, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import HubOutlinedIcon from "@mui/icons-material/HubOutlined";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/app/router/routes";
import { useDeleteUser, useUsers } from "@/features/users/hooks/useUsers";
import { CreateUserForm } from "@/features/users/components/CreateUserForm";
import type { User } from "@/features/users/types/user";
import { AppModal } from "@/shared/components/AppModal";
import { NavBar } from "@/shared/pages/NavBar";
import styles from "@/features/users/pages/CreateUserPage.module.css";

export const CreateUserPage = () => {
  const navigate = useNavigate();
  const { data: users, isLoading, isError } = useUsers();
  const deleteMutation = useDeleteUser();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [pendingDeleteUser, setPendingDeleteUser] = useState<User | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const closeCreateModal = () => setModalOpen(false);
  const closeEditModal = () => setEditingUser(null);

  const closeDeleteModal = () => {
    if (deleteMutation.isPending) return;
    setPendingDeleteUser(null);
    setDeleteError(null);
  };

  const handleDeleteUser = () => {
    if (!pendingDeleteUser) return;

    setDeleteError(null);
    deleteMutation.mutate(pendingDeleteUser, {
      onSuccess: () => {
        setPendingDeleteUser(null);
      },
      onError: () => {
        setDeleteError("No se pudo desactivar el usuario seleccionado.");
      },
    });
  };

  return (
    <div className="App">
      <NavBar />
      <div className="page-header">
        <div>
          <h2>Usuarios</h2>
          <p className="page-subtitle">Gestion de usuarios del sistema</p>
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          <Button
            variant="outlined"
            startIcon={<HubOutlinedIcon />}
            onClick={() => navigate(ROUTES.usersGraphql)}
          >
            Perfiles tecnicos
          </Button>

          <Button
            className="AddButton"
            startIcon={<AddIcon />}
            onClick={() => setModalOpen(true)}
          >
            Nuevo usuario
          </Button>
        </div>
      </div>

      <div style={{ width: "100%" }}>
        <span className="section-label">
          Usuarios registrados - {(users || []).length}
        </span>
        {isLoading ? (
          <CircularProgress />
        ) : isError ? (
          <Alert severity="error">No se pudieron cargar los usuarios.</Alert>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Email</th>
                <th>Telefono</th>
                <th>Telegram ID</th>
                <th>Estado</th>
                <th className={styles.actionsHeader}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {(users || []).map((user) => (
                <tr
                  key={user.userId || user.email}
                  className={user.estadoId === 0 ? styles.inactiveRow : undefined}
                >
                  <td className="cell-primary">{user.primerNombre}</td>
                  <td>{user.apellido}</td>
                  <td>{user.email}</td>
                  <td>{user.telefono || "-"}</td>
                  <td>{user.telegramId}</td>
                  <td>
                    <span
                      className={`${styles.statusBadge} ${
                        user.estadoId === 1 ? styles.statusActive : styles.statusInactive
                      }`}
                    >
                      {user.estadoId === 1 ? "Activo" : "Inactivo"}
                    </span>
                  </td>
                  <td>
                    <div className={styles.actionsCell}>
                      <Tooltip title="Editar usuario">
                        <IconButton
                          size="small"
                          onClick={() => setEditingUser(user)}
                          aria-label={`Editar usuario ${user.primerNombre} ${user.apellido}`}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title={user.estadoId === 0 ? "Usuario inactivo" : "Desactivar usuario"}>
                        <span>
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => setPendingDeleteUser(user)}
                            aria-label={`Desactivar usuario ${user.primerNombre} ${user.apellido}`}
                            disabled={user.estadoId === 0}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </span>
                      </Tooltip>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <AppModal open={modalOpen} onClose={closeCreateModal} title="Nuevo usuario">
        <CreateUserForm onSuccess={closeCreateModal} />
      </AppModal>

      <AppModal open={Boolean(editingUser)} onClose={closeEditModal} title="Editar usuario">
        <CreateUserForm
          mode="edit"
          user={editingUser ?? undefined}
          onSuccess={closeEditModal}
        />
      </AppModal>

      <AppModal
        open={Boolean(pendingDeleteUser)}
        onClose={closeDeleteModal}
        title="Confirmar desactivacion"
      >
        <div className={styles.confirmDeleteContent}>
          {deleteError && <Alert severity="error">{deleteError}</Alert>}
          <p>
            Desactivar al usuario{" "}
            <strong>
              {pendingDeleteUser?.primerNombre} {pendingDeleteUser?.apellido}
            </strong>
            ? Podras reactivarlo editando su estado.
          </p>
          <p className={styles.deleteHint}>
            Se actualizara su estado a Inactivo.
          </p>
          <div className={styles.confirmDeleteActions}>
            <Button onClick={closeDeleteModal} disabled={deleteMutation.isPending}>
              Cancelar
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={handleDeleteUser}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? (
                <CircularProgress size={18} color="inherit" />
              ) : (
                "Desactivar"
              )}
            </Button>
          </div>
        </div>
      </AppModal>
    </div>
  );
};
