import { FC } from 'react';
import { AppLocalizationKey } from '~/common/types/types';
import { FormattedMessage } from '~/components/common/common';

import styles from './styles.module.scss';

type Props = { 
  avatar: string,
  name: AppLocalizationKey,
  about: AppLocalizationKey,
  contribution: AppLocalizationKey,
};

export const MemberCard: FC<Props> = ({ avatar, name, about, contribution }) => {
  return (
    <div className={styles.card}>
      <div className={styles['left-side']}>
        <img className={styles.avatar} src={avatar} style={{
          objectFit: 'cover',
        }}></img>
      </div>
      <div className={styles['right-side']}>
      <FormattedMessage className={styles.name} as={'h3'} message={name}/>
      <FormattedMessage className={styles.about} as={'p'} message={about}/>
      <FormattedMessage className={styles.contribution} as={'p'} message={contribution}/>
      </div>
    </div>
  );
};
