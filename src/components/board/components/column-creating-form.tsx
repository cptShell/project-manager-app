import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { CreateColumnDto } from '~/common/types/types';
import { createColumn } from '~/validation-schemas/validation-schemas';
import { InputName } from '~/common/enums/enums';
import { FormattedMessage, TextInput } from '~/components/common/common';
import { useAppDispatch } from '~/hooks/hooks';
import { column as columnActions } from '~/store/actions';

type Props = {
  id: string;
  onClose: () => void;
};

export const CreateColumnForm: FC<Props> = ({ id, onClose }) => {
  const { register, handleSubmit, formState } = useForm<CreateColumnDto>({
    resolver: joiResolver(createColumn),
  });
  const { title: titleError } = formState.errors;
  const dispatch = useAppDispatch();

  const handleCreateColumn = handleSubmit(
    ({ title }: CreateColumnDto): void => {
      const createColumnDto = {
        title,
      };
      dispatch(columnActions.createColumn({ id, createColumnDto }));
      onClose();
    },
  );

  return (
    <form onSubmit={handleCreateColumn}>
      <FormattedMessage as="h2" message="board.columnCreatingForm.title" />
      <TextInput
        title="board.columnCreatingForm.inputs.title"
        formRegisterValues={register(InputName.TITLE)}
        errorMessage={titleError?.message}
      />
      <button>
        <FormattedMessage as="span" message="board.columnCreatingForm.buttons.createColumn" />
      </button>
    </form>
  );
};
