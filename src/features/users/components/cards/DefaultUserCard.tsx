import type { UserSkillProfile } from "@/features/users/types/userSkillProfile";
import { BaseUserSkillCard } from "@/features/users/components/cards/BaseUserSkillCard";

interface DefaultUserCardProps {
  user: UserSkillProfile;
}

export const DefaultUserCard = ({ user }: DefaultUserCardProps) => {
  return (
    <BaseUserSkillCard
      user={user}
      title="Perfil técnico"
      description="Perfil sin mapeo específico de tarjeta."
      accentColor="#6b7280"
    />
  );
};
