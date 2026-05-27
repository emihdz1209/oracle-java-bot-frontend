import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import type { SelectChangeEvent } from "@mui/material";
import type {
  SkillCategoryFilterValue,
  SkillCategoryOption,
} from "@/features/users/types/userSkillProfile";

interface SkillCategoryFilterProps {
  categories: SkillCategoryOption[];
  selectedCategory: SkillCategoryFilterValue;
  onCategoryChange: (value: SkillCategoryFilterValue) => void;
}

export const SkillCategoryFilter = ({
  categories,
  selectedCategory,
  onCategoryChange,
}: SkillCategoryFilterProps) => {
  const handleChange = (event: SelectChangeEvent<SkillCategoryFilterValue>) => {
    onCategoryChange(event.target.value as SkillCategoryFilterValue);
  };

  return (
    <FormControl size="small" fullWidth>
      <InputLabel id="skill-category-filter-label">Categoría técnica</InputLabel>
      <Select
        labelId="skill-category-filter-label"
        value={selectedCategory}
        label="Categoría técnica"
        onChange={handleChange}
      >
        <MenuItem value="ALL">ALL · Todas las categorías</MenuItem>
        {categories.map((category) => (
          <MenuItem key={category.code} value={category.code}>
            {category.code} · {category.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
