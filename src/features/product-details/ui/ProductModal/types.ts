import type { Product } from "@/entities/product/model";

export type ProductModalProps = {
  id?: string;
};

export type ProductState = Product | null;
