import type { UserSkillProfile } from "@/features/users/types/userSkillProfile";
import { BaseUserSkillCard } from "@/features/users/components/cards/BaseUserSkillCard";

interface FrontendUserCardProps {
  user: UserSkillProfile;
}

export const FrontendUserCard = ({ user }: FrontendUserCardProps) => {
  return (
    <BaseUserSkillCard
      user={user}
      title="Frontend"
      description="Interfaces web y experiencia de usuario."
      accentColor="#7c3aed"
    />
  );
};
