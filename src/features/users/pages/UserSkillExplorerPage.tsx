import { useEffect, useState } from "react";
import { NavBar } from "@/shared/pages/NavBar";
import { graphqlRequest } from "@/features/users/graphql/graphqlClient";
import {
  GET_ALL_USER_SKILL_PROFILES,
  GET_SKILL_CATEGORIES,
  GET_USERS_BY_PRIMARY_SKILL_CATEGORY,
  SEARCH_USER_SKILL_PROFILES,
  type GetAllUserSkillProfilesData,
  type GetSkillCategoriesData,
  type GetUsersByPrimarySkillCategoryData,
  type GetUsersByPrimarySkillCategoryVariables,
  type SearchUserSkillProfilesData,
  type SearchUserSkillProfilesVariables,
} from "@/features/users/graphql/userSkillQueries";
import { SkillCategoryFilter } from "@/features/users/components/SkillCategoryFilter";
import { UserSkillSearchBar } from "@/features/users/components/UserSkillSearchBar";
import { UserSkillCardGrid } from "@/features/users/components/UserSkillCardGrid";
import type {
  SkillCategoryFilterValue,
  SkillCategoryOption,
  UserSkillProfile,
} from "@/features/users/types/userSkillProfile";
import styles from "@/features/users/components/UserSkillExplorer.module.css";

export const UserSkillExplorerPage = () => {
  const [categories, setCategories] = useState<SkillCategoryOption[]>([]);
  const [users, setUsers] = useState<UserSkillProfile[]>([]);
  const [selectedCategory, setSelectedCategory] =
    useState<SkillCategoryFilterValue>("ALL");
  const [searchInput, setSearchInput] = useState("");
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    let cancelled = false;

    const loadCategories = async () => {
      try {
        const data = await graphqlRequest<GetSkillCategoriesData>(
          GET_SKILL_CATEGORIES,
          undefined,
          { signal: controller.signal }
        );

        if (!cancelled) {
          setCategories(data.skillCategories);
        }
      } catch (caughtError) {
        if (caughtError instanceof DOMException && caughtError.name === "AbortError") {
          return;
        }

        if (!cancelled) {
          const message =
            caughtError instanceof Error
              ? caughtError.message
              : "No fue posible cargar las categorías técnicas.";
          setError(message);
        }
      }
    };

    void loadCategories();

    return () => {
      controller.abort();
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setSearchText(searchInput);
    }, 400);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [searchInput]);

  useEffect(() => {
    const controller = new AbortController();
    let cancelled = false;

    /**
     * Observer (React): selectedCategory y searchText son estados observables.
     * Al cambiar, este efecto reacciona, ejecuta la query GraphQL correcta
     * y actualiza la UI automáticamente.
     */
    const loadUsers = async () => {
      setLoading(true);
      setError(null);

      try {
        if (searchText.trim().length > 0) {
          const data = await graphqlRequest<
            SearchUserSkillProfilesData,
            SearchUserSkillProfilesVariables
          >(SEARCH_USER_SKILL_PROFILES, {
            text: searchText.trim(),
          }, { signal: controller.signal });

          if (!cancelled) {
            setUsers(data.searchUserSkillProfiles);
          }

          return;
        }

        if (selectedCategory === "ALL") {
          const data = await graphqlRequest<GetAllUserSkillProfilesData>(
            GET_ALL_USER_SKILL_PROFILES,
            undefined,
            { signal: controller.signal }
          );

          if (!cancelled) {
            setUsers(data.usersSkillProfiles);
          }

          return;
        }

        const data = await graphqlRequest<
          GetUsersByPrimarySkillCategoryData,
          GetUsersByPrimarySkillCategoryVariables
        >(GET_USERS_BY_PRIMARY_SKILL_CATEGORY, {
          category: selectedCategory,
        }, { signal: controller.signal });

        if (!cancelled) {
          setUsers(data.usersByPrimarySkillCategory);
        }
      } catch (caughtError) {
        if (caughtError instanceof DOMException && caughtError.name === "AbortError") {
          return;
        }

        if (!cancelled) {
          const message =
            caughtError instanceof Error
              ? caughtError.message
              : "No fue posible consultar perfiles técnicos.";
          setError(message);
          setUsers([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    void loadUsers();

    return () => {
      controller.abort();
      cancelled = true;
    };
  }, [searchText, selectedCategory]);

  return (
    <div className="App">
      <NavBar />

      <div className={styles.page}>
        <div className="page-header">
          <div>
            <h2>Explorador de Perfiles Técnicos</h2>
            <p className="page-subtitle">Usuarios + GraphQL + Observer + Factory Method</p>
          </div>
        </div>

        <p className={styles.intro}>
          Consulta dinámica de perfiles técnicos del equipo usando GraphQL. Los resultados se
          actualizan automáticamente al cambiar filtros o búsqueda.
        </p>

        <div className={styles.controls}>
          <UserSkillSearchBar value={searchInput} onChange={setSearchInput} />
          <SkillCategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </div>

        {loading && <p className={styles.loadingText}>Cargando perfiles...</p>}

        {!loading && error && <p className={styles.errorText}>Error: {error}</p>}

        {!loading && !error && (
          <p className={styles.resultCount}>{users.length} perfiles encontrados</p>
        )}

        {!loading && !error && users.length === 0 && (
          <p className={styles.emptyState}>
            No se encontraron perfiles técnicos para esta consulta.
          </p>
        )}

        {!loading && !error && users.length > 0 && <UserSkillCardGrid users={users} />}
      </div>
    </div>
  );
};
