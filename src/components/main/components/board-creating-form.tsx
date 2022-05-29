import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { board as boardActions } from '~/store/actions';
import { joiResolver } from '@hookform/resolvers/joi';
import { createBoard } from '~/validation-schemas/validation-schemas';
import { FormattedMessage, TextInput } from '~/components/common/common';
import { AppLocalizationKey, CreateBoardDto } from '~/common/types/types';
import { InputName } from '~/common/enums/enums';
import { useAppDispatch } from '~/hooks/hooks';
import { Modal } from '~/components/common/modal/modal';
import styles from './styles.module.scss';

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
        className={styles['wrapper']}
        onSubmit={handleSubmit(handleCreateForm)}
      >
        <TextInput
          className={styles['title']}
          title="main.boardCreatingForm.inputs.titles.title"
          formRegisterValues={register(InputName.TITLE)}
          errorMessage={titleError?.message}
        />
        <div>
          <FormattedMessage
            className={styles['description-title']}
            as="span"
            message={'main.boardCreatingForm.inputs.titles.description'}
          />
          <textarea
            className={styles['description']}
            {...register(InputName.DESCRIPTION)}
          />
          {Boolean(descriptionError?.message) && (
            <FormattedMessage
              as="span"
              message={descriptionError?.message as AppLocalizationKey}
            />
          )}
        </div>

        <FormattedMessage
          className={styles['button']}
          as="button"
          message="main.boardCreatingForm.buttons.createBoard"
        />
      </form>
    </Modal>
  );
};
