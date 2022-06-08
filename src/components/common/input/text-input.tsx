import clsx from 'clsx';
import { FC } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { InputType } from '~/common/enums/enums';
import { AppLocalizationKey } from '~/common/types/types';
import { FormattedMessage } from '../common';
import styles from './styles.module.scss';

type Props = {
  title: AppLocalizationKey;
  formRegisterValues: UseFormRegisterReturn;
  errorMessage?: string;
  className?: string;
  disabled?: boolean;
};

export const TextInput: FC<Props> = ({
  formRegisterValues,
  errorMessage,
  title,
  className,
  disabled,
}) => {
  const isError = Boolean(errorMessage);
  const inputStyle = clsx(styles.input, {
    [styles['input-error']]: isError,
  });
  return (
    <label className={className}>
      <FormattedMessage as="span" message={title} />
      <input
        className={inputStyle}
        type={InputType.TEXT}
        {...formRegisterValues}
        disabled={disabled}
      />
      {isError && (
        <FormattedMessage
          className={styles.error}
          as="span"
          message={errorMessage as AppLocalizationKey}
        />
      )}
    </label>
  );
};
