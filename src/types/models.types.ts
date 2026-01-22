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
  warehouse_id?: string;
  warehouse_name?: string;
  status?: string;
}

// 接口返回的原始库存项数据结构
export interface InventoryItem {
  category: string;
  category_soft: number;
  created_at: string;
  inventory_ps: string;
  max_stock: number;
  min_stock: number;
  p_sort: number;
  product_id: string;
  product_image: string[];
  product_name: string;
  product_price: number;
  quantity: number;
  status: string;
  updated_at: string;
  warehouse_id: string;
  warehouse_name: string;
}

export interface InventoryResponse {
  code: number;
  data: InventoryItem[];
  message: string;
  total: number;
}

// 购物车项
export interface CartItem {
  product: Product;
  quantity: number;
}
