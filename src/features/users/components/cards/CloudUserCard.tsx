import type { UserSkillProfile } from "@/features/users/types/userSkillProfile";
import { BaseUserSkillCard } from "@/features/users/components/cards/BaseUserSkillCard";

interface CloudUserCardProps {
  user: UserSkillProfile;
}

export const CloudUserCard = ({ user }: CloudUserCardProps) => {
  return (
    <BaseUserSkillCard
      user={user}
      title="Cloud"
      description="Arquitectura distribuida y operación en nube."
      accentColor="#0891b2"
    />
  );
};
