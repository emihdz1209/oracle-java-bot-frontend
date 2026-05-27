import type { UserSkillProfile } from "@/features/users/types/userSkillProfile";
import { BaseUserSkillCard } from "@/features/users/components/cards/BaseUserSkillCard";

interface BackendUserCardProps {
  user: UserSkillProfile;
}

export const BackendUserCard = ({ user }: BackendUserCardProps) => {
  return (
    <BaseUserSkillCard
      user={user}
      title="Backend"
      description="Servicios, APIs y lógica de negocio."
      accentColor="#1d4ed8"
    />
  );
};
