import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { AppLocalizationKey, CreateColumnDto } from '~/common/types/types';
import { createColumn } from '~/validation-schemas/validation-schemas';
import { InputName } from '~/common/enums/enums';
import { TextInput } from '~/components/common/common';
import { useAppDispatch } from '~/hooks/hooks';
import { column as columnActions } from '~/store/actions';

type Props = {
  id: string;
  order: number;
  onClose: () => void;
};

export const CreateColumnForm: FC<Props> = ({ id, order, onClose }) => {
  const { register, handleSubmit, formState } = useForm<CreateColumnDto>({
    resolver: joiResolver(createColumn),
  });
  const { title: titleError } = formState.errors;
  const dispatch = useAppDispatch();

  const handleCreateColumn = handleSubmit(
    ({ title }: CreateColumnDto): void => {
      const createColumnDto = {
        title,
        order,
      };
      dispatch(columnActions.create({ id, createColumnDto }));
      onClose();
    },
  );

  return (
    <form onSubmit={handleCreateColumn}>
      <h2>Column creating form</h2>
      <TextInput
        title="auth.inputs.name"
        formRegisterValues={register(InputName.TITLE)}
        errorMessage={titleError?.message as AppLocalizationKey}
      />
      <button>Create column</button>
    </form>
  );
};
