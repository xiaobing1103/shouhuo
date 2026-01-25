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

// ========== 轮询任务相关类型 ==========

// 任务状态基础结构
export interface TaskStatus<T = any[]> {
  data: T;
  message: string;
  status: boolean;
}

// request 任务数据结构
export interface RequestTaskData {
  base_url: string;
  json_data: any[];
  route: string;
}

// task_get 接口响应数据结构
export interface TaskGetData {
  get_image: TaskStatus;
  inventory: TaskStatus;
  request: TaskStatus<RequestTaskData>;
  screenshot: TaskStatus;
}

// task_get 接口完整响应
export interface TaskGetResponse {
  code: number;
  data: TaskGetData;
  message: string;
}

// yht_image 图片配置数据
export interface ImageConfigItem {
  background: string;
  created_at: string;
  payment_background: string;
  payment_success: string;
  sold_out: string;
  updated_at: string;
  warehouse_id: string;
}

// yht_image 接口响应
export interface YhtImageResponse {
  code: number;
  data: ImageConfigItem[];
  message: string;
}

// screenshot 上传响应
export interface ScreenshotUploadResponse {
  code: number;
  message: string;
}
