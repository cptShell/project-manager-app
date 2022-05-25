import { FC } from 'react';
import { AppLocalizationKey } from '~/common/types/types';

type Props = {
  title: AppLocalizationKey;
  onClick?: () => void;
};

export const Button: FC<Props> = ({ title, onClick }) => {
  return <button onClick={onClick}>{title}</button>;
};
