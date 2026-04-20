import { AppModal } from "@/shared/components/AppModal";
import type { CreateModalBaseProps } from "@/shared/components/modalProps";
import {
  CreateTareaForm,
  type CreateTareaFormData,
  type CreateTareaFormProps,
} from "@/features/tareas/components/CreateTareaForm";

export type { CreateTareaFormData };

export interface CreateTareaModalProps
  extends CreateModalBaseProps,
    Pick<CreateTareaFormProps, "onSubmit" | "projects" | "prioridades"> {}

export const CreateTareaModal = ({
  open,
  onClose,
  onSubmit,
  isPending,
  projects,
  prioridades,
}: CreateTareaModalProps) => {
  return (
    <AppModal open={open} onClose={onClose} title="Nueva tarea">
      <CreateTareaForm
        onSubmit={onSubmit}
        isPending={isPending}
        projects={projects}
        prioridades={prioridades}
      />
    </AppModal>
  );
};
