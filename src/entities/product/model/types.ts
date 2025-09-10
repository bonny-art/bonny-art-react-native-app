export type Product = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  favorite: boolean;
  categoryId: string;
  width: number | null;
  height: number | null;
  colors: number | null;
  solids: number | null;
  blends: number | null;
};
