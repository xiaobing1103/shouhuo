export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  categoryId: string;
  categoryName: string;
  categorySort: number;
  productSort: number;
  imageUrl?: string;
  isSoldOut: boolean;
}
