import { useSelector } from 'react-redux';

import type { RootState } from '../store';

export const usePayment = () => {
  const payment = useSelector((state: RootState) => state.payment);
  return payment;
};
