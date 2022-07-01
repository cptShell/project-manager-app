import React, { FC, MouseEvent } from 'react';
import { useAppTranslation } from '~/hooks/hooks';
import { AppLocalizationKey } from '~/common/types/types';

type Props = {
  as: string;
  message: AppLocalizationKey;
  className?: string;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
};

export const FormattedMessage: FC<Props> = ({
  as,
  message,
  className,
  onClick,
}) => {
  const { handleTranslate } = useAppTranslation();
  const element = React.createElement(
    as,
    { className, onClick },
    handleTranslate(message),
  );
  return element;
};
