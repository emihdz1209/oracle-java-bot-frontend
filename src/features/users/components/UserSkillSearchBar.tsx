import { TextField } from "@mui/material";

interface UserSkillSearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export const UserSkillSearchBar = ({
  value,
  onChange,
}: UserSkillSearchBarProps) => {
  return (
    <TextField
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder="Buscar por nombre, email, skill o categoría..."
      size="small"
      fullWidth
      aria-label="Buscar perfiles técnicos"
    />
  );
};
