import type { UserSkillProfile } from "@/features/users/types/userSkillProfile";
import { BaseUserSkillCard } from "@/features/users/components/cards/BaseUserSkillCard";

interface DatabaseUserCardProps {
  user: UserSkillProfile;
}

export const DatabaseUserCard = ({ user }: DatabaseUserCardProps) => {
  return (
    <BaseUserSkillCard
      user={user}
      title="Database"
      description="Modelado, consultas y administración de datos."
      accentColor="#b45309"
    />
  );
};
