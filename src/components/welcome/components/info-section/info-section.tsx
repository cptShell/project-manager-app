import { FC } from 'react';
import { AppLocalizationKey } from '~/common/types/types';
import { FormattedMessage } from '~/components/common/common';

type Props = {
  content: AppLocalizationKey;
};

export const InfoSection: FC<Props> = ({ content }) => {
  return (
    <section>
      <FormattedMessage as={'p'} message={content} />
    </section>
  );
};
