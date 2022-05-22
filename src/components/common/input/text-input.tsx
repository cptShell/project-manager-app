import { FC } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { InputType } from '~/common/enums/enums';
import { AppLocalizationKey } from '~/common/types/types';
import { FormattedMessage } from '../common';

type Props = {
  title: AppLocalizationKey
  formRegisterValues: UseFormRegisterReturn;
  errorMessage?: AppLocalizationKey;
};

export const TextInput: FC<Props> = ({ formRegisterValues, errorMessage, title }) => {

  return (
    <label>
      <FormattedMessage as="span" message={title} />
      <input type={InputType.TEXT} {...formRegisterValues} />
      {Boolean(errorMessage) && <FormattedMessage as="span" message={errorMessage as AppLocalizationKey} />}
    </label>
  );
};
