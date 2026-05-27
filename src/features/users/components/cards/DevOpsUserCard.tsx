import type { UserSkillProfile } from "@/features/users/types/userSkillProfile";
import { BaseUserSkillCard } from "@/features/users/components/cards/BaseUserSkillCard";

interface DevOpsUserCardProps {
  user: UserSkillProfile;
}

export const DevOpsUserCard = ({ user }: DevOpsUserCardProps) => {
  return (
    <BaseUserSkillCard
      user={user}
      title="DevOps"
      description="Automatización, contenedores y despliegue continuo."
      accentColor="#0f766e"
    />
  );
};
