import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { CreateColumnDto } from '~/common/types/types';
import { createColumn } from '~/validation-schemas/validation-schemas';
import { InputName } from '~/common/enums/enums';
import { FormattedMessage, TextInput } from '~/components/common/common';
import { useAppDispatch } from '~/hooks/hooks';
import { column as columnActions } from '~/store/actions';
import styles from './styles.module.scss';

type Props = {
  id: string;
  onClose: () => void;
  updateColumns: () => void;
};

export const CreateColumnForm: FC<Props> = ({ id, onClose, updateColumns }) => {
  const { register, handleSubmit, formState } = useForm<CreateColumnDto>({
    resolver: joiResolver(createColumn),
  });
  const { title: titleError } = formState.errors;
  const dispatch = useAppDispatch();

  const handleCreateColumn = handleSubmit(
    async ({ title }: CreateColumnDto): Promise<void> => {
      const createColumnDto = {
        title,
      };
      await dispatch(columnActions.createColumn({ id, createColumnDto }));

      updateColumns();
      onClose();
    },
  );

  return (
    <form onSubmit={handleCreateColumn} className={styles['wrapper']}>
      <TextInput
        className={styles['title']}
        title="board.columnCreatingForm.inputs.title"
        formRegisterValues={register(InputName.TITLE)}
        errorMessage={titleError?.message}
      />
      <FormattedMessage
        className={styles['button']}
        as="button"
        message="board.columnCreatingForm.buttons.createColumn"
      />
    </form>
  );
};
