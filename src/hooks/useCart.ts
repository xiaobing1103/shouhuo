import { useSelector } from 'react-redux';

import type { RootState } from '../store';

export const useCart = () => {
  const cart = useSelector((state: RootState) => state.cart);
  return cart;
};
