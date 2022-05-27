import { FC } from 'react';
import { AppLocalizationKey } from '~/common/types/types';
import { FormattedMessage } from '~/components/common/common';

type Props = {
  title: AppLocalizationKey;
  onClick?: () => void;
  className?: string;
};

export const Button: FC<Props> = ({ title, onClick, className }) => {
  return (
    <button className={className} onClick={onClick}>
      <FormattedMessage as="span" message={title} />
    </button>
  );
};
