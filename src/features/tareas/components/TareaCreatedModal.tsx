import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";

interface TareaCreatedModalProps {
  open: boolean;
  onClose: () => void;
}

export const TareaCreatedModal = ({ open, onClose }: TareaCreatedModalProps) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="xs"
      slotProps={{
        paper: {
          className: "tarea-created-modal-paper",
        },
      }}
    >
      <DialogContent className="tarea-created-modal-content">
        <p>la tarea ha sido creada correctamente</p>
      </DialogContent>
      <DialogActions className="tarea-created-modal-actions">
        <Button onClick={onClose} variant="contained" className="AddButton" autoFocus>
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
