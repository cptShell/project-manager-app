import { FC } from 'react';
import styles from './styles.module.scss';

export const Loader: FC = () => {
  return (
    <div className={styles.wrapper}>
      Loading
      <span className={styles['loader-span']}></span>
    </div>
  );
};
