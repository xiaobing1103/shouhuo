import type { Product } from '../types/models.types';

export interface CartItem {
  product: Product;
  quantity: number;
}

export class CartService {
  addToCart(items: CartItem[], product: Product, quantity: number): CartItem[] {
    // TODO: 校验库存并返回新的购物车列表
    return items;
  }

  clearCart(): CartItem[] {
    return [];
  }
}
