import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { getUsers, createUser, updateUser, deactivateUser } from "@/features/users/services/userService";

import type { CreateUserRequest, UpdateUserRequest, User } from "@/features/users/types/user";

export const useUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (user: CreateUserRequest) => createUser(user),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, data }: { userId: string; data: UpdateUserRequest }) =>
      updateUser(userId, data),

    onSuccess: (updatedUser, { userId, data }) => {
      queryClient.setQueryData<User[]>(["users"], (current) => {
        if (!current) return current;

        return current.map((user) =>
          user.userId === userId || user.userId === updatedUser?.userId
            ? {
                ...user,
                ...data,
                ...updatedUser,
              }
            : user
        );
      });

      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (user: User) => deactivateUser(user),

    onSuccess: (updatedUser, userToDeactivate) => {
      queryClient.setQueryData<User[]>(["users"], (current) => {
        if (!current) return current;

        return current.map((user) =>
          user.userId === userToDeactivate.userId || user.userId === updatedUser?.userId
            ? {
                ...user,
                estadoId: 0,
                ...updatedUser,
              }
            : user
        );
      });

      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
  });
};
