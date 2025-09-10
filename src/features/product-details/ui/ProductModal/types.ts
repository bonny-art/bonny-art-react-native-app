import type { Product } from "@/entities/product/model";

/** Пропси екрана. id беремо з роутера, але залишив тут для можливого реюзу. */
export type ProductModalProps = {
  id?: string;
};

/** Локальний стан (коли підвантажуємо по id) */
export type ProductState = Product | null;
