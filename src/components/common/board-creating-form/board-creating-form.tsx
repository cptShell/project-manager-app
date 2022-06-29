import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { board as boardActions } from '~/store/actions';
import { joiResolver } from '@hookform/resolvers/joi';
import { createBoard } from '~/validation-schemas/validation-schemas';
import { TextInput } from '~/components/common/common';
import { CreateBoardDto } from '~/common/types/types';
import { InputName } from '~/common/enums/enums';
import { useAppDispatch } from '~/hooks/hooks';
import { Modal } from '~/components/common/modal/modal';
import styles from './styles.module.scss';
import { Button } from '../button/button';
import { Textarea } from '../input/textarea/textarea';

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
      <form
        className={styles['form']}
        onSubmit={handleSubmit(handleCreateForm)}
      >
        <TextInput
          className={styles['title']}
          title="main.boardCreatingForm.inputs.titles.title"
          formRegisterValues={register(InputName.TITLE)}
          errorMessage={titleError?.message}
        />
        <Textarea
          className={styles['description']}
          title="main.boardCreatingForm.inputs.titles.description"
          formRegisterValues={register(InputName.DESCRIPTION)}
          errorMessage={descriptionError?.message}
        />
        <Button
          title={'main.boardCreatingForm.buttons.createBoard'}
        />
      </form>
    </Modal>
  );
};
