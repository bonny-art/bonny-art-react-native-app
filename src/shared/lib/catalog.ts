export type Category = {
  id: string;
  name: string;
};

export type Product = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  favorite?: boolean;
  categoryId: string;
};

export function buildSectionsByCategory(
  categories: Category[],
  products: Product[],
  hideEmpty = true
) {
  return categories
    .map((cat) => ({
      category: cat,
      items: products.filter((p) => p.categoryId === cat.id),
    }))
    .filter((sec) => (hideEmpty ? sec.items.length > 0 : true));
}
