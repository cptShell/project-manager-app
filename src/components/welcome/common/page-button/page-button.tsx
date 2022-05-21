import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppLocalizationKey } from '~/common/types/types';
import { FormattedMessage } from '~/components/common/common';

import styles from './styles.module.scss';

type Props = {
  path: string;
  title: string;
  className?: string;
};

export const PageButton: FC<Props> = ({ path, title, className }) => {
  const navigate = useNavigate();

  const handleClick = (): void => {
    navigate(path);
  };

  return (
    <li className={styles.li}>
      <button className={className} onClick={handleClick}>
        <FormattedMessage as={'span'} message={title as AppLocalizationKey} />
      </button>
    </li>
  );
};
