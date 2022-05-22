import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { board as boardActions } from '~/store/actions';
import { joiResolver } from '@hookform/resolvers/joi';
import { createBoard } from '~/validation-schemas/validation-schemas';
import { FormattedMessage, TextInput } from '~/components/common/common';
import { AppLocalizationKey, CreateBoardDto } from '~/common/types/types';
import { InputName } from '~/common/enums/enums';
import { useAppDispatch } from '~/hooks/hooks';

type Props = {
  isOpen: boolean;
  setIsOpen: (arg: boolean) => void;
};

export const BoardCreatingForm: FC<Props> = ({ isOpen, setIsOpen }) => {
  const { register, handleSubmit, formState, reset } = useForm<CreateBoardDto>({
    resolver: joiResolver(createBoard),
  });
  const { title: titleError } = formState.errors;
  const dispatch = useAppDispatch();

  const handleCreateForm = ({ title }: CreateBoardDto): void => {
    dispatch(boardActions.create({ title }));
    reset();
    setIsOpen(false);
  };

  if (!isOpen) {
    return null;
  }

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
