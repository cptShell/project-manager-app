import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { CreateColumnDto } from '~/common/types/types';
import { signInUser } from '~/validation-schemas/validation-schemas';
import { InputName } from '~/common/enums/enums';
import { TextInput } from '~/components/common/common';

export const ColumnCreatingForm: FC = () => {
  const { register, handleSubmit, formState } = useForm<CreateColumnDto>({
    resolver: joiResolver(signInUser),
  });
  const { title: titleError, order: orderError } = formState.errors;

  const handleCreateColumn = ({ title, order }: CreateColumnDto): void => {
    //TODO: add dispatch
    alert(`Title: ${title}/nOrder: ${order}`);
  };

  return (
    <form onSubmit={handleSubmit(handleCreateColumn)}>
      <h2>Column creating form</h2>
      <TextInput
        formRegisterValues={register(InputName.TITLE)}
        errorMessage={titleError?.message}
      />
      <TextInput
        formRegisterValues={register(InputName.ORDER)}
        errorMessage={orderError?.message}
      />
      <button>Create column</button>
    </form>
  );
};
