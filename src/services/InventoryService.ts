import { ProductService } from './ProductService';

export class InventoryService {
  private productService = new ProductService();

  async updateInventory(trigger: 'payment' | 'polling' | 'startup'): Promise<void> {
    // TODO: 根据触发来源调用接口并更新本地缓存 / Redux
    const products = await this.productService.fetchProducts();
    // 这里后续可以 dispatch 到 Redux，并写入 AsyncStorage
    void trigger;
    void products;
  }
}
