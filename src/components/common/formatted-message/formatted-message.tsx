import React, { FC } from 'react';
import { useAppTranslation } from '~/hooks/hooks';
import { AppLocalizationKey } from '~/common/types/types';

type Props = {
  as: string,
  message: AppLocalizationKey
  className?: string
};

export const FormattedMessage: FC<Props> = ({ as, message, className }) => {
  const { handleTranslate } = useAppTranslation();
  const element = React.createElement(as, { className }, handleTranslate(message));
  return element;
};

