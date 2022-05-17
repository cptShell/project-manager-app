import { FC } from 'react';

import styles from './styles.module.scss';

type Props = { 
  ava: string,
  name: JSX.Element,
  about: JSX.Element,
  contribution: JSX.Element,
};

export const MemberCard: FC<Props> = ({ ava, name, about, contribution }) => {
  return (
    <div className={styles.card}>
      <div className={styles['left-side']}>
        <div className={styles.ava} id={styles.ava} style={{
          background: `url(${ava})`,
          backgroundPosition: '50%',
          backgroundSize: 'cover',
        }}></div>
      </div>
      <div className={styles['right-side']}>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.about}>About me: {about}</p>
        <p className={styles.contribution}>Contribution: {contribution}</p>
      </div>
    </div>
  );
};
