// 商品类目
export interface Category {
  id: string;
  name: string;
  sort: number;
}

// 商品信息
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

// 购物车项
export interface CartItem {
  product: Product;
  quantity: number;
}
