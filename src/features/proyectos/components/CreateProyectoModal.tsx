import { AppModal } from "@/shared/components/AppModal";
import {
  CreateProyectoForm,
  type ProyectoCreateFormState,
} from "@/features/proyectos/components/CreateProyectoForm";

export type { ProyectoCreateFormState };

interface CreateProyectoModalProps {
  open: boolean;
  onClose: () => void;
  form: ProyectoCreateFormState;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: React.FormEvent) => void;
  isPending: boolean;
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
      <CreateProyectoForm
        form={form}
        onChange={onChange}
        onSubmit={onSubmit}
        isPending={isPending}
      />
    </AppModal>
  );
};
