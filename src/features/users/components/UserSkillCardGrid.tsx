import { UserCardFactory } from "@/features/users/components/cards/UserCardFactory";
import type { UserSkillProfile } from "@/features/users/types/userSkillProfile";
import styles from "@/features/users/components/UserSkillExplorer.module.css";

interface UserSkillCardGridProps {
  users: UserSkillProfile[];
}

export const UserSkillCardGrid = ({ users }: UserSkillCardGridProps) => {
  return (
    <section className={styles.grid}>
      {users.map((user) => (
        <UserCardFactory key={user.id} user={user} />
      ))}
    </section>
  );
};
