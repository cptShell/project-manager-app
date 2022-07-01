import { FC, MouseEvent } from 'react';
import { FormattedMessage } from '../common';
import { AppLocalizationKey } from '~/common/types/types';
import clsx from 'clsx';
import styles from './styles.module.scss';

type Props = {
  title: AppLocalizationKey,
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void,
  className?: string
};

export const Button: FC<Props> = ({ title, onClick, className }) => {
  const buttonStyle = clsx(styles.button, className);

  return (
    <button className={buttonStyle} onClick={onClick}>
      <FormattedMessage as="span" message={title} />
    </button>
  );
};
