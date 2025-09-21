import { USER_ENDPOINTS } from "@/shared/api/endpoints";
import { usersHttpClient } from "@/shared/api/httpClient";

import type { User, UserCartItem } from "../model";
import { AxiosError } from "axios";

const normalizeEmail = (value: string): string => value.trim().toLowerCase();

export type CreateUserPayload = {
  email: string;
  passwordHash: string;
  name: string;
  favorites?: string[];
  cart?: UserCartItem[];
  avatarUrl?: string;
};

/**
 * Finds users by normalized email, handling empty values gracefully.
 */
export async function fetchUsersByEmail(email: string): Promise<User[]> {
  const normalizedEmail = normalizeEmail(email);
  if (!normalizedEmail) {
    return [];
  }

  try {
    const res = await usersHttpClient.get<User[]>(USER_ENDPOINTS.users, {
      params: { email: normalizedEmail },
    });
    const users = Array.isArray(res.data) ? res.data : [];
    return users.filter(
      (user) => normalizeEmail(user.email ?? "") === normalizedEmail
    );
  } catch (err) {
    const e = err as AxiosError;
    if (e.response?.status === 404) {
      return [];
    }
    throw err;
  }
}

/**
 * Creates a new user record with optional favorites and cart data.
 */
export async function createUser(payload: CreateUserPayload): Promise<User> {
  const res = await usersHttpClient.post<User>(USER_ENDPOINTS.users, {
    favorites: [],
    cart: [],
    ...payload,
  });
  return res.data;
}

/**
 * Retrieves a user by identifier.
 */
export async function fetchUserById(id: string): Promise<User> {
  const res = await usersHttpClient.get<User>(`${USER_ENDPOINTS.users}/${id}`);
  return res.data;
}

/**
 * Replaces an existing user record with updated data.
 */
export async function replaceUser(user: User): Promise<User> {
  const res = await usersHttpClient.put<User>(
    `${USER_ENDPOINTS.users}/${user.id}`,
    user
  );
  return res.data;
}
