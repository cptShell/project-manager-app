import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { createBoard } from '~/validation-schemas/validation-schemas';
import { FormattedMessage, TextInput } from '~/components/common/common';
import { CreateBoardDto } from '~/common/types/types';
import { useAppTranslation } from '~/hooks/hooks';

export const BoardCreatingForm: FC = () => {
  const { handleTranslate } = useAppTranslation();
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
      <FormattedMessage as="h2" message="main.boardCreatingForm.title" />
      <TextInput
        formRegisterValues={register(handleTranslate('main.boardCreatingForm.inputs.title') as 'title')}
        errorMessage={titleError && handleTranslate('main.boardCreatingForm.inputs.errors.titleRequired')}
      />
      <FormattedMessage as="button" message="main.boardCreatingForm.buttons.createBoard" />
    </form>
  );
};
