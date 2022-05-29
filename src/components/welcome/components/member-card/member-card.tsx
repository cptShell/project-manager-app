import { FC } from 'react';
import { AppLocalizationKey } from '~/common/types/types';
import { FormattedMessage } from '~/components/common/common';

import styles from './styles.module.scss';

type Props = {
  avatar: string;
  name: AppLocalizationKey;
  about: AppLocalizationKey;
  contribution: AppLocalizationKey;
};

export const MemberCard: FC<Props> = ({
  avatar,
  name,
  about,
}) => {
  return (
    <div className={styles['card-wrapper']}>
      <div className={styles['card-image']}>
        <img
          className={styles.avatar}
          src={avatar}
          alt="team member avatar"
        ></img>
      </div>
      <div className={styles['card-text']}>
        <FormattedMessage as={'h3'} message={name} />
        <FormattedMessage as={'p'} message={about} />
      </div>
    </div>
  );
};
