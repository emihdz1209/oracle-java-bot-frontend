import type { UserSkillProfile } from "@/features/users/types/userSkillProfile";
import { BaseUserSkillCard } from "@/features/users/components/cards/BaseUserSkillCard";

interface AiUserCardProps {
  user: UserSkillProfile;
}

export const AiUserCard = ({ user }: AiUserCardProps) => {
  return (
    <BaseUserSkillCard
      user={user}
      title="AI / Data"
      description="Automatización inteligente, embeddings y analítica."
      accentColor="#9333ea"
    />
  );
};
