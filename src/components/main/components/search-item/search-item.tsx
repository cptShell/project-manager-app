import { FC } from 'react';
import styles from './styles.module.scss';

type Props = {
  title: string,
  onClick: () => void,
};

export const SearchItem: FC<Props> = ({ title, onClick }) => {
  return (
    <li className={styles['search-item']} onClick={onClick}>
      <span>{title}</span>
    </li>
  );
};
