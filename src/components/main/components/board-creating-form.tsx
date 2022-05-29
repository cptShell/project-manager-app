import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { board as boardActions } from '~/store/actions';
import { joiResolver } from '@hookform/resolvers/joi';
import { createBoard } from '~/validation-schemas/validation-schemas';
import { FormattedMessage, TextInput } from '~/components/common/common';
import { CreateBoardDto } from '~/common/types/types';
import { InputName } from '~/common/enums/enums';
import { useAppDispatch } from '~/hooks/hooks';
import { Modal } from '~/components/common/modal/modal';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const BoardCreatingForm: FC<Props> = ({ isOpen, onClose }) => {
  const { register, handleSubmit, formState, reset } = useForm<CreateBoardDto>({
    resolver: joiResolver(createBoard),
  });
  const { title: titleError, description: descriptionError } = formState.errors;
  const dispatch = useAppDispatch();

  const handleCreateForm = ({ title, description }: CreateBoardDto): void => {
    dispatch(boardActions.create({ title, description }));
    reset();
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(handleCreateForm)}>
        <FormattedMessage as="h2" message="main.boardCreatingForm.title" />
        <TextInput
          title="main.boardCreatingForm.inputs.titles.title"
          formRegisterValues={register(InputName.TITLE)}
          errorMessage={titleError?.message}
        />
        <TextInput
          title="main.boardCreatingForm.inputs.titles.description"
          formRegisterValues={register(InputName.DESCRIPTION)}
          errorMessage={descriptionError?.message}
        />
        <button>
          <FormattedMessage as="span" message="main.boardCreatingForm.buttons.createBoard" />
        </button>
      </form>
    </Modal>
  );
};
