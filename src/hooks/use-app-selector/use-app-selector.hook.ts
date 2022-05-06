import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { RootState } from 'common/types/types';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
