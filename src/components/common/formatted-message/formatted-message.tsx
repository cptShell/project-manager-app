import { FC } from 'react';
import { useAppTranslation } from '~/hooks/hooks';
import { AppLocalizationKey } from '~/common/types/types';

type Props = {
  message: AppLocalizationKey
  className?: string
};

export const FormattedMessage: FC<Props> = ({ message, className }) => {
  const { handleTranslate } = useAppTranslation();

  return (
  <span className={ className } dangerouslySetInnerHTML={{ __html: handleTranslate(message) }} />
  );
};

