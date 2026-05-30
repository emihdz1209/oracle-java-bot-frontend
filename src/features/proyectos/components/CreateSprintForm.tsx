import { useState } from "react";
import { Alert, Button, CircularProgress, TextField } from "@mui/material";
import type { CreateSprintRequest } from "@/features/proyectos/types/proyecto";

interface CreateSprintFormProps {
  onSubmit: (sprint: CreateSprintRequest) => void;
  isPending: boolean;
  submitError?: string | null;
  onClearSubmitError?: () => void;
}

const toDateTimeLocalValue = (date: Date) => {
  const offsetMinutes = date.getTimezoneOffset();
  return new Date(date.getTime() - offsetMinutes * 60_000).toISOString().slice(0, 16);
};

const toApiDateTime = (value: string) => (value.length === 16 ? `${value}:00` : value);

const getDefaultSprintForm = () => {
  const start = new Date();
  start.setHours(9, 0, 0, 0);

  const end = new Date(start);
  end.setDate(end.getDate() + 14);
  end.setHours(17, 0, 0, 0);

  return {
    nombre: "",
    fechaInicio: toDateTimeLocalValue(start),
    fechaFin: toDateTimeLocalValue(end),
  };
};

export const CreateSprintForm = ({
  onSubmit,
  isPending,
  submitError,
  onClearSubmitError,
}: CreateSprintFormProps) => {
  const [form, setForm] = useState(getDefaultSprintForm);
  const [validationError, setValidationError] = useState<string | null>(null);

  const clearFeedback = () => {
    if (validationError) {
      setValidationError(null);
    }

    onClearSubmitError?.();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    clearFeedback();
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!form.nombre.trim() || !form.fechaInicio || !form.fechaFin) {
      setValidationError("Completa nombre, fecha de inicio y fecha de fin.");
      return;
    }

    if (form.fechaInicio >= form.fechaFin) {
      setValidationError("La fecha de inicio debe ser menor que la fecha de fin.");
      return;
    }

    setValidationError(null);
    onClearSubmitError?.();
    onSubmit({
      nombre: form.nombre.trim(),
      fechaInicio: toApiDateTime(form.fechaInicio),
      fechaFin: toApiDateTime(form.fechaFin),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="modal-form">
      {(validationError || submitError) && (
        <Alert severity="error">{validationError || submitError}</Alert>
      )}

      <TextField
        name="nombre"
        label="Nombre del sprint"
        value={form.nombre}
        onChange={handleChange}
        required
        size="small"
        fullWidth
      />

      <div className="modal-form-row">
        <TextField
          name="fechaInicio"
          label="Fecha de inicio"
          type="datetime-local"
          value={form.fechaInicio}
          onChange={handleChange}
          required
          size="small"
          slotProps={{ inputLabel: { shrink: true } }}
        />
        <TextField
          name="fechaFin"
          label="Fecha de fin"
          type="datetime-local"
          value={form.fechaFin}
          onChange={handleChange}
          required
          size="small"
          slotProps={{ inputLabel: { shrink: true } }}
        />
      </div>

      <Button
        type="submit"
        variant="contained"
        className="AddButton"
        disabled={isPending}
        fullWidth
      >
        {isPending ? <CircularProgress size={18} /> : "Crear sprint"}
      </Button>
    </form>
  );
};
