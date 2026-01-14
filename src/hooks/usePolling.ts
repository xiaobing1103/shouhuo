import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { setPollingRunning } from '../store/slices/pollingSlice';

export const usePolling = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPollingRunning(true));

    return () => {
      dispatch(setPollingRunning(false));
    };
  }, [dispatch]);
};
