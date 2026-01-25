import { fetchProductsApi } from '../api/endpoints/product';
import type { Product, InventoryResponse, InventoryItem } from '../types/models.types';

export class ProductService {
  async fetchProducts(warehouse_id?: string): Promise<Product[]> {
    try {
      const response = await fetchProductsApi(warehouse_id);
      const inventoryResponse = response.data as InventoryResponse;

      if (inventoryResponse.code !== 200 || !inventoryResponse.data) {
        return [];
      }

      return inventoryResponse.data.map(this.mapInventoryToProduct);
    } catch (error) {
      console.error('Fetch products failed:', error);
      return [];
    }
  }

  private mapInventoryToProduct(item: InventoryItem): Product {
    return {
      id: item.product_id,
      name: item.product_name,
      price: item.product_price,
      stock: item.quantity,
      categoryId: item.category, // 使用分类名称作为ID，或者根据业务决定
      categoryName: item.category,
      categorySort: item.category_soft,
      productSort: item.p_sort,
      imageUrl: item.product_image && item.product_image.length > 0 ? item.product_image[0] : undefined,
      isSoldOut: item.quantity <= 0 || item.status !== 'normal',
      warehouse_id: item.warehouse_id,
      warehouse_name: item.warehouse_name,
      status: item.status,
    };
  }

  filterByCategory(products: Product[], categoryId: string): Product[] {
    return products.filter((p) => p.categoryId === categoryId);
  }

  sortProducts(products: Product[]): Product[] {
    return [...products].sort((a, b) => {
      if (a.categorySort !== b.categorySort) return a.categorySort - b.categorySort;
      if (a.productSort !== b.productSort) return a.productSort - b.productSort;
      return a.name.localeCompare(b.name);
    });
  }
}
