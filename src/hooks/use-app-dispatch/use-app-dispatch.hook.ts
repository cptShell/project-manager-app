import { useDispatch } from 'react-redux';
import { AppDispatch } from 'common/types/types';

export const useAppDispatch: () => AppDispatch = () => {
  return useDispatch<AppDispatch>();
};
