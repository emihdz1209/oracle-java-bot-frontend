import { TextField, Button, CircularProgress } from "@mui/material";
import { AppModal } from "@/shared/components/AppModal";
import type { CreateModalBaseProps } from "@/shared/components/modalProps";

export interface ProyectoCreateFormState {
  nombre: string;
  descripcion: string;
  fechaInicio: string;
  fechaFin: string;
}

export interface CreateProyectoModalProps extends CreateModalBaseProps {
  form: ProyectoCreateFormState;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: React.FormEvent) => void;
}

export const CreateProyectoModal = ({
  open,
  onClose,
  form,
  onChange,
  onSubmit,
  isPending,
}: CreateProyectoModalProps) => {
  return (
    <AppModal
      open={open}
      onClose={onClose}
      title="Nuevo proyecto"
    >
      <form onSubmit={onSubmit} className="modal-form">
        <TextField
          name="nombre"
          label="Nombre del proyecto"
          value={form.nombre}
          onChange={onChange}
          required
          size="small"
          fullWidth
        />
        <TextField
          name="descripcion"
          label="Descripción"
          value={form.descripcion}
          onChange={onChange}
          multiline
          rows={2}
          size="small"
          fullWidth
        />
        <div className="modal-form-row">
          <TextField
            name="fechaInicio"
            label="Fecha inicio"
            type="datetime-local"
            value={form.fechaInicio}
            onChange={onChange}
            size="small"
            slotProps={{ inputLabel: { shrink: true } }}
          />
          <TextField
            name="fechaFin"
            label="Fecha fin"
            type="datetime-local"
            value={form.fechaFin}
            onChange={onChange}
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
          {isPending ? <CircularProgress size={18} /> : "Crear proyecto"}
        </Button>
      </form>
    </AppModal>
  );
};
