import { FC, MouseEvent } from 'react';
import { FormattedMessage } from '../common';
import styles from './styles.module.scss';
import { AppLocalizationKey } from '~/common/types/types';

type Props = {
  title: AppLocalizationKey,
  onClick?: () => void | ((e: MouseEvent<HTMLButtonElement>) => void),
  className?: string
};

export const Button: FC<Props> = ({ title, onClick, className }) => {

  return (
    <button className={`${styles.button} ${className}`} onClick={onClick}>
      <FormattedMessage as="span" message={title} />
    </button>
  );
};
