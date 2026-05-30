import { useEffect, useState } from "react";
import {
  TextField,
  Button,
  CircularProgress,
  Alert,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useCreateUser, useUpdateUser } from "@/features/users/hooks/useUsers";
import type { User } from "@/features/users/types/user";

interface CreateUserFormProps {
  onSuccess?: () => void;
  user?: User;
  mode?: "create" | "edit";
}

const emptyForm = {
  primerNombre: "",
  apellido: "",
  telefono: "",
  email: "",
  telegramId: "",
  estadoId: "1",
};

const getInitialFormData = (user?: User) => {
  if (!user) return emptyForm;

  return {
    primerNombre: user.primerNombre ?? "",
    apellido: user.apellido ?? "",
    telefono: user.telefono ?? "",
    email: user.email ?? "",
    telegramId: user.telegramId ?? "",
    estadoId: String(user.estadoId ?? 1),
  };
};

export const CreateUserForm = ({ onSuccess, user, mode = "create" }: CreateUserFormProps) => {
  const createMutation = useCreateUser();
  const updateMutation = useUpdateUser();
  const isEditing = mode === "edit";
  const isPending = isEditing ? updateMutation.isPending : createMutation.isPending;

  const [formData, setFormData] = useState(() => getInitialFormData(user));
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    setFormData(getInitialFormData(user));
    setFormError(null);
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (isEditing && user) {
      updateMutation.mutate(
        {
          userId: user.userId,
          data: {
            primerNombre: formData.primerNombre,
            apellido: formData.apellido,
            telefono: formData.telefono,
            email: formData.email,
            telegramId: formData.telegramId,
            rolId: user.rolId,
            estadoId: Number(formData.estadoId),
            managerId: user.managerId,
            telegramChatId: user.telegramChatId ?? null,
          },
        },
        {
          onSuccess: () => {
            onSuccess?.();
          },
          onError: () => {
            setFormError("No se pudo actualizar el usuario.");
          },
        }
      );
      return;
    }

    createMutation.mutate({
      primerNombre: formData.primerNombre,
      apellido: formData.apellido,
      telefono: formData.telefono,
      email: formData.email,
      telegramId: formData.telegramId,
    }, {
      onSuccess: () => {
        setFormData(emptyForm);
        onSuccess?.();
      },
      onError: () => {
        setFormError("No se pudo crear el usuario.");
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="modal-form">
      {formError && <Alert severity="error">{formError}</Alert>}

      <div className="modal-form-row">
        <TextField
          name="primerNombre"
          label="Nombre"
          value={formData.primerNombre}
          onChange={handleChange}
          required
          size="small"
        />
        <TextField
          name="apellido"
          label="Apellido"
          value={formData.apellido}
          onChange={handleChange}
          required
          size="small"
        />
      </div>

      <TextField
        name="email"
        label="Correo electrónico"
        type="email"
        value={formData.email}
        onChange={handleChange}
        required
        size="small"
        fullWidth
      />

      <div className="modal-form-row">
        <TextField
          name="telefono"
          label="Teléfono"
          value={formData.telefono}
          onChange={handleChange}
          size="small"
        />
        <TextField
          name="telegramId"
          label="Telegram ID"
          value={formData.telegramId}
          onChange={handleChange}
          required
          size="small"
        />
      </div>

      {isEditing && (
        <FormControl size="small" fullWidth>
          <InputLabel>Estado</InputLabel>
          <Select
            name="estadoId"
            label="Estado"
            value={formData.estadoId}
            onChange={(event) =>
              setFormData((prev) => ({
                ...prev,
                estadoId: event.target.value,
              }))
            }
          >
            <MenuItem value="1">Activo</MenuItem>
            <MenuItem value="0">Inactivo</MenuItem>
          </Select>
        </FormControl>
      )}

      <Button
        type="submit"
        variant="contained"
        className="AddButton"
        disabled={isPending || (isEditing && !user)}
        fullWidth
      >
        {isPending ? (
          <CircularProgress size={18} />
        ) : isEditing ? (
          "Guardar cambios"
        ) : (
          "Crear usuario"
        )}
      </Button>
    </form>
  );
};
