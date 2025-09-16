export type UserCartItem = {
  productId: string;
  qty: number;
};

export type User = {
  id: string;
  email: string;
  passwordHash: string;
  name: string;
  favorites: string[];
  cart: UserCartItem[];
  avatarUrl?: string;
  createdAt: string;
  updatedAt: string;
};

export type UserSession = {
  userId: string;
  token: string;
};
