import type { UserSkillProfile } from "@/features/users/types/userSkillProfile";
import { BackendUserCard } from "@/features/users/components/cards/BackendUserCard";
import { FrontendUserCard } from "@/features/users/components/cards/FrontendUserCard";
import { DevOpsUserCard } from "@/features/users/components/cards/DevOpsUserCard";
import { DatabaseUserCard } from "@/features/users/components/cards/DatabaseUserCard";
import { QaUserCard } from "@/features/users/components/cards/QaUserCard";
import { CloudUserCard } from "@/features/users/components/cards/CloudUserCard";
import { AiUserCard } from "@/features/users/components/cards/AiUserCard";
import { DefaultUserCard } from "@/features/users/components/cards/DefaultUserCard";

interface UserCardFactoryProps {
  user: UserSkillProfile;
}

/**
 * Factory Method:
 * decide qué tarjeta concreta renderizar según el cardType recibido desde GraphQL.
 */
export const UserCardFactory = ({ user }: UserCardFactoryProps) => {
  switch (user.cardType) {
    case "BackendUserCard":
      return <BackendUserCard user={user} />;
    case "FrontendUserCard":
      return <FrontendUserCard user={user} />;
    case "DevOpsUserCard":
      return <DevOpsUserCard user={user} />;
    case "DatabaseUserCard":
      return <DatabaseUserCard user={user} />;
    case "QaUserCard":
      return <QaUserCard user={user} />;
    case "CloudUserCard":
      return <CloudUserCard user={user} />;
    case "AiUserCard":
      return <AiUserCard user={user} />;
    default:
      return <DefaultUserCard user={user} />;
  }
};
