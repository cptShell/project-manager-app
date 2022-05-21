import { FC } from 'react';
import { AppLocalizationKey } from '~/common/types/types';
import { FormattedMessage } from '~/components/common/common';
import styles from './styles.module.scss';

type Props = {
  content: AppLocalizationKey
};

export const InfoSection: FC<Props> = ({ content }) => {
  return (
    <section className={styles['about-project']}>
      <p className={styles.paragraph}>
        <FormattedMessage as={'span'} message={content} />
      </p>
    </section>
  );
};
