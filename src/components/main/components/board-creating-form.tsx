import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { createBoard } from '~/validation-schemas/validation-schemas';
import { FormattedMessage, TextInput } from '~/components/common/common';
import { AppLocalizationKey, CreateBoardDto } from '~/common/types/types';
import { InputName } from '~/common/enums/enums';

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
      <FormattedMessage as="h2" message="main.boardCreatingForm.title" />
      <TextInput
        title="main.boardCreatingForm.inputs.title"
        formRegisterValues={register(InputName.TITLE)}
        errorMessage={titleError?.message as AppLocalizationKey}
      />
      <button>
        <FormattedMessage as="span" message="main.boardCreatingForm.buttons.createBoard" />
      </button>
    </form>
  );
};
