import type { UserSkillProfile } from "@/features/users/types/userSkillProfile";
import { BaseUserSkillCard } from "@/features/users/components/cards/BaseUserSkillCard";

interface QaUserCardProps {
  user: UserSkillProfile;
}

export const QaUserCard = ({ user }: QaUserCardProps) => {
  return (
    <BaseUserSkillCard
      user={user}
      title="QA"
      description="Pruebas funcionales y aseguramiento de calidad."
      accentColor="#be123c"
    />
  );
};
