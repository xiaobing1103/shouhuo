import { useSelector } from 'react-redux';

import type { RootState } from '../store';

export const useLayout = () => {
  const cartItems = useSelector((state: RootState) => state.cart);
  const config = useSelector((state: RootState) => state.config);

  const showCart = (cartItems as any).length > 0;

  const backgroundStyle = config.backgroundImage
    ? { backgroundImage: `url(${config.backgroundImage})` }
    : { backgroundColor: config.backgroundColor };

  return { showCart, backgroundStyle };
};
