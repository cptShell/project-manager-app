import { FC, useState } from 'react';
import { FullColumnDto } from '~/common/types/types';
import { column as columnActions, task as taskActions } from '~/store/actions';
import { Button } from './button';
import { useAppDispatch } from '~/hooks/hooks';
import { Modal } from '~/components/common/modal/modal';
import { TaskCreatingForm } from './task-creating-form';
import { ConfirmationModal } from '~/components/common/confirmation-modal/confirmation-modal';
import { TaskLink } from './task-link/task-link';
import styles from '../styles.module.scss';

type Props = {
  moveColumn: (dragIndex: number, hoverIndex: number) => void;
  item: FullColumnDto;
  boardId: string;
};

export const Column: FC<Props> = ({ item, boardId }) => {
  const { id: columnId, title } = item;
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);

  const handleDeleteColumn = (): void => {
    dispatch(columnActions.removeColumn({ boardId, columnId }));
  };

  const handleToggleModal = (): void => {
    setIsModalOpen(!isModalOpen);
  };

  const handleOpenConfirmation = (): void => {
    setConfirmationModalOpen(true);
  };
  const handleCloseConfirmation = (): void => {
    setConfirmationModalOpen(false);
  };

  return (
    <div className={styles['column-item']}>
      <h3>{title}</h3>
      <div>
        <ul>
          {item.tasks &&
            [...item.tasks].map((task) => {
              const { id } = task;
              const handleDeleteTask = (): void => {
                dispatch(
                  taskActions.removeTask({ boardId, columnId, taskId: id }),
                );
              };
              return (
                <TaskLink key={id} data={task} onClick={handleDeleteTask} />
              );
            })}
        </ul>
      </div>
      <Modal isOpen={isModalOpen} onClose={handleToggleModal}>
        <TaskCreatingForm
          boardId={boardId}
          columnId={columnId}
          onClose={handleToggleModal}
        />
      </Modal>
      <ConfirmationModal
        isOpen={confirmationModalOpen}
        onClose={handleCloseConfirmation}
        onConfirm={handleDeleteColumn}
      />
      <Button title={'board.buttons.addColumn'} onClick={handleToggleModal} />
      <Button
        title={'board.buttons.deleteColumn'}
        onClick={handleOpenConfirmation}
      />
    </div>
  );
};
