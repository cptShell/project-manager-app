import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { createBoard } from '~/validation-schemas/validation-schemas';
import { InputName } from '~/common/enums/enums';
import { TextInput } from '~/components/common/common';
import { CreateBoardDto } from '~/common/types/types';

export const BoardCreatingForm: FC = () => {
  const { register, handleSubmit, formState, reset } = useForm<CreateBoardDto>({
    resolver: joiResolver(createBoard),
  });
  const { title: titleError } = formState.errors;

  const handleCreateForm = (payload: CreateBoardDto): void => {
    //TODO: add boardAction & replace <{title: string}> to BoardCreateDto
    alert(payload.title);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(handleCreateForm)}>
      <h2>Board creating form</h2>
      <TextInput
        formRegisterValues={register(InputName.TITLE)}
        errorMessage={titleError?.message}
      />
      <button>Create board</button>
    </form>
  );
};
