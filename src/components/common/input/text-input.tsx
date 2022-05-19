import { FC } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { InputType } from '~/common/enums/enums';

type Props = {
  formRegisterValues: UseFormRegisterReturn;
  errorMessage?: string;
};

export const TextInput: FC<Props> = ({ formRegisterValues, errorMessage }) => {
  const { name: title } = formRegisterValues;

  return (
    <label>
      <span>{title}</span>
      <input type={InputType.TEXT} {...formRegisterValues} />
      {Boolean(errorMessage) && <span>{errorMessage}</span>}
    </label>
  );
};
