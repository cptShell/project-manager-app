import clsx from 'clsx';
import { FC } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { AppLocalizationKey } from '~/common/types/types';
import { FormattedMessage } from '../../common';
import styles from './styles.module.scss';

type Props = {
  title: AppLocalizationKey;
  formRegisterValues: UseFormRegisterReturn;
  errorMessage?: string;
  className?: string;
};

export const Textarea: FC<Props> = ({
  formRegisterValues,
  errorMessage,
  title,
  className,
}) => {
  const isError = Boolean(errorMessage);
  const inputStyle = clsx(styles.input, {
    [styles['input-error']]: isError,
  });
  return (
    <label className={className}>
      <FormattedMessage className={styles.title} as="span" message={title} />
      <textarea
        className={inputStyle}
        {...formRegisterValues}
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
