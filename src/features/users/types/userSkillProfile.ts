export type SkillCategory =
  | "BACKEND"
  | "FRONTEND"
  | "DEVOPS"
  | "DATABASE"
  | "QA"
  | "CLOUD"
  | "AI";

export type SkillCategoryFilterValue = SkillCategory | "ALL";

export interface UserSkillProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  primarySkillCategory: SkillCategory;
  primarySkillCode: string;
  primarySkillName: string;
  primarySkillLevel: string;
  primarySkillYears: number | null;
  cardType: string;
}

export interface SkillCategoryOption {
  code: SkillCategory;
  name: string;
  description: string | null;
  cardType: string;
}
