import { FC } from 'react';

import styles from './styles.module.scss';

type Props = { 
  avatar: string,
  name: JSX.Element,
  about: JSX.Element,
  contribution: JSX.Element,
};

export const MemberCard: FC<Props> = ({ avatar, name, about, contribution }) => {
  return (
    <div className={styles.card}>
      <div className={styles['left-side']}>
        <div className={styles.avatar} id={styles.avatar} style={{
          background: `url(${avatar})`,
          backgroundPosition: '50%',
          backgroundSize: 'cover',
        }}></div>
      </div>
      <div className={styles['right-side']}>
        {name}
        {about}
        {contribution}
      </div>
    </div>
  );
};
