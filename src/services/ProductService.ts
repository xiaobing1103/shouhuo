import type { Product } from '../types/models.types';

export class ProductService {
  async fetchProducts(): Promise<Product[]> {
    // TODO: 调用商品列表接口
    return [];
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
