import type { CartItem } from "@/store/cartSlice";
import type { Product } from "@/entities/product/model";

export type ItemWithProduct = CartItem & { product: Product };

export interface CartItemRowProps {
  item: ItemWithProduct;
  onIncrement: () => void;
  onDecrement: () => void;
}
