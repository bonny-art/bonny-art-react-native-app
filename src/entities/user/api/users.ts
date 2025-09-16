import { USER_ENDPOINTS } from "@/shared/api/endpoints";
import { usersHttpClient } from "@/shared/api/httpClient";

import type { User, UserCartItem } from "../model";

export type CreateUserPayload = {
  email: string;
  passwordHash: string;
  name: string;
  favorites?: string[];
  cart?: UserCartItem[];
  avatarUrl?: string;
};

export async function fetchUsersByEmail(email: string): Promise<User[]> {
  const res = await usersHttpClient.get<User[]>(USER_ENDPOINTS.users, {
    params: { email },
  });
  return Array.isArray(res.data) ? res.data : [];
}

export async function createUser(payload: CreateUserPayload): Promise<User> {
  const res = await usersHttpClient.post<User>(USER_ENDPOINTS.users, {
    favorites: [],
    cart: [],
    ...payload,
  });
  return res.data;
}

export async function fetchUserById(id: string): Promise<User> {
  const res = await usersHttpClient.get<User>(`${USER_ENDPOINTS.users}/${id}`);
  return res.data;
}

export async function replaceUser(user: User): Promise<User> {
  const res = await usersHttpClient.put<User>(
    `${USER_ENDPOINTS.users}/${user.id}`,
    user
  );
  return res.data;
}
