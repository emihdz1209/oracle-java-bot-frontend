import type { UserSkillProfile } from "@/features/users/types/userSkillProfile";
import styles from "@/features/users/components/cards/UserSkillCards.module.css";

interface BaseUserSkillCardProps {
  user: UserSkillProfile;
  title: string;
  description: string;
  accentColor: string;
}

const getExperienceLabel = (years: number | null) => {
  if (years === null || Number.isNaN(years)) {
    return "Sin dato";
  }

  return `${years} años`;
};

export const BaseUserSkillCard = ({
  user,
  title,
  description,
  accentColor,
}: BaseUserSkillCardProps) => {
  return (
    <article className={styles.card} style={{ borderLeftColor: accentColor }}>
      <header className={styles.header}>
        <div className={styles.titles}>
          <h3 className={styles.name}>{`${user.firstName} ${user.lastName}`}</h3>
          <p className={styles.email}>{user.email}</p>
        </div>

        <span className={styles.tag} style={{ backgroundColor: accentColor }}>
          {title}
        </span>
      </header>

      <p className={styles.description}>{description}</p>

      <dl className={styles.details}>
        <div className={styles.detailItem}>
          <dt className={styles.detailLabel}>Categoría principal</dt>
          <dd className={styles.detailValue}>{user.primarySkillCategory}</dd>
        </div>

        <div className={styles.detailItem}>
          <dt className={styles.detailLabel}>Skill principal</dt>
          <dd className={styles.detailValue}>{user.primarySkillName}</dd>
        </div>

        <div className={styles.detailItem}>
          <dt className={styles.detailLabel}>Código</dt>
          <dd className={styles.detailValue}>{user.primarySkillCode}</dd>
        </div>

        <div className={styles.detailItem}>
          <dt className={styles.detailLabel}>Nivel</dt>
          <dd className={styles.detailValue}>{user.primarySkillLevel}</dd>
        </div>

        <div className={styles.detailItem}>
          <dt className={styles.detailLabel}>Experiencia</dt>
          <dd className={styles.detailValue}>{getExperienceLabel(user.primarySkillYears)}</dd>
        </div>
      </dl>
    </article>
  );
};
