import { useSelector, useDispatch } from 'react-redux';

import type { RootState } from '../store';
import { addToCart, removeFromCart, updateQuantity, clearCart } from '../store/slices/cartSlice';
import type { Product } from '../types/models.types';

export const useCart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart);

  const add = (product: Product) => {
    dispatch(addToCart(product));
  };

  const remove = (productId: string) => {
    dispatch(removeFromCart(productId));
  };

  const update = (productId: string, quantity: number) => {
    dispatch(updateQuantity({ productId, quantity }));
  };

  const clear = () => {
    dispatch(clearCart());
  };

  return {
    ...cart,
    addToCart: add,
    removeFromCart: remove,
    updateQuantity: update,
    clearCart: clear,
  };
};
