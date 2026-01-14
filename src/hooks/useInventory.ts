import { useSelector } from 'react-redux';

import type { RootState } from '../store';

export const useInventory = () => {
  const product = useSelector((state: RootState) => state.product);
  return product;
};
