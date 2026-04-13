import apiClient from "@/shared/api/apiClient";

import type {
	AuthUser,
	LoginRequest,
	LoginResponse,
	RegisterRequest,
	Role,
} from "@/features/auth/types/auth";
import { TOKEN_STORAGE_KEY } from "@/features/auth/constants/authStorage";

const mapRoleByRolId = (rolId: number): Role => {
	return rolId === 1 ? "Manager" : "Developer";
};

export const login = async (credentials: LoginRequest): Promise<LoginResponse> => {
	const response = await apiClient.post<LoginResponse>("/auth/login", credentials);
	return response.data;
};

export const register = async (payload: RegisterRequest): Promise<void> => {
	await apiClient.post("/auth/register", payload);
};

export const toAuthUser = (loginResponse: LoginResponse): AuthUser => {
	return {
		userId: loginResponse.userId,
		email: loginResponse.email,
		rolId: loginResponse.rolId,
		role: mapRoleByRolId(loginResponse.rolId),
	};
};
