import type {
  SkillCategory,
  SkillCategoryOption,
  UserSkillProfile,
} from "@/features/users/types/userSkillProfile";

export const GET_SKILL_CATEGORIES = `
  query {
    skillCategories {
      code
      name
      description
      cardType
    }
  }
`;

export const GET_ALL_USER_SKILL_PROFILES = `
  query {
    usersSkillProfiles {
      id
      firstName
      lastName
      email
      primarySkillCategory
      primarySkillCode
      primarySkillName
      primarySkillLevel
      primarySkillYears
      cardType
    }
  }
`;

export const GET_USERS_BY_PRIMARY_SKILL_CATEGORY = `
  query UsersByPrimarySkillCategory($category: SkillCategory!) {
    usersByPrimarySkillCategory(category: $category) {
      id
      firstName
      lastName
      email
      primarySkillCategory
      primarySkillCode
      primarySkillName
      primarySkillLevel
      primarySkillYears
      cardType
    }
  }
`;

export const SEARCH_USER_SKILL_PROFILES = `
  query SearchUserSkillProfiles($text: String!) {
    searchUserSkillProfiles(text: $text) {
      id
      firstName
      lastName
      email
      primarySkillCategory
      primarySkillCode
      primarySkillName
      primarySkillLevel
      primarySkillYears
      cardType
    }
  }
`;

export interface GetSkillCategoriesData {
  skillCategories: SkillCategoryOption[];
}

export interface GetAllUserSkillProfilesData {
  usersSkillProfiles: UserSkillProfile[];
}

export interface GetUsersByPrimarySkillCategoryData {
  usersByPrimarySkillCategory: UserSkillProfile[];
}

export interface SearchUserSkillProfilesData {
  searchUserSkillProfiles: UserSkillProfile[];
}

export interface GetUsersByPrimarySkillCategoryVariables {
  category: SkillCategory;
}

export interface SearchUserSkillProfilesVariables {
  text: string;
}
