import { FC, useState } from 'react';
import { FullColumnDto } from '~/common/types/types';
import { column as columnActions, task as taskActions } from '~/store/actions';
import styles from './styles.module.scss';
import { useAppDispatch } from '~/hooks/hooks';
import { Modal } from '~/components/common/modal/modal';
import { TaskCreatingForm } from '../task-creating-form';
import { ConfirmationModal } from '~/components/common/confirmation-modal/confirmation-modal';
import { TaskLink } from '../task-link/task-link';
import bucketImg from '~/assets/images/delete-bucket.svg';
import addImg from '~/assets/images/add.svg';
import cancelImg from '~/assets/images/cancel.svg';
import acceptImg from '~/assets/images/accept.svg';

type Props = {
  item: FullColumnDto;
  boardId: string;
};

export const Column: FC<Props> = ({ item, boardId }) => {
  const { id: columnId, title } = item;
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleDeleteColumn = (): void => {
    dispatch(columnActions.removeColumn({ boardId, columnId }));
  };

  const handleToggleModal = (): void => {
    setIsModalOpen(!isModalOpen);
  };

  const handleOpenConfirmation = (e: React.MouseEvent): void => {
    setConfirmationModalOpen(true);
    e.stopPropagation();
  };
  const handleCloseConfirmation = (): void => {
    setConfirmationModalOpen(false);
  };

  const handleEdit = (): void => {
    setIsEditOpen(!isEditOpen);
  };
  const handleCancelEdit = (): void => {
    setIsEditOpen(!isEditOpen);
  };
  const handleAcceptEdit = (): void => {
    setIsEditOpen(!isEditOpen);
  };
  const handleAddTask = (e: React.MouseEvent): void => {
    handleToggleModal();
    e.stopPropagation();
  };

  return (
    <div className={styles['column-item']}>
      {isEditOpen ?
        <div className={styles['column-header']}>
          <div className={styles['title-wrapper']}>
            <div className={styles['title-before-edit']}>
              <img className={styles['cancel']} src={cancelImg} alt="cancel" onClick={handleCancelEdit} />
              <img className={styles['accept']} src={acceptImg} alt="accept" onClick={handleAcceptEdit} />
            </div>
            <h3 className={styles['title-edit']}>{title}</h3>
            <input className={styles['input-edit']} type="text" placeholder={title} />
            <div className={styles['title-after-edit']}>1</div>
          </div>
          <img className={styles['add-task-edit']} src={addImg} alt="add task" />
          <img className={styles['delete-column-edit']} src={bucketImg} alt="delete column" />
        </div>
        :
        <div className={styles['column-header']} onClick={handleEdit}>
          <div className={styles['title-wrapper']}>
            <div className={styles['title-before']} />
            <h3 className={styles.title}>{title}</h3>
            <div className={styles['title-after']}>1</div>
          </div>
          <img className={styles['add-task']} src={addImg} alt="add task" onClick={handleAddTask} />
          <img className={styles['delete-column']} src={bucketImg} alt="delete column" onClick={handleOpenConfirmation} />
        </div>
      }
      <div>
        <ul className={styles['task-list']}>
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
    </div>
  );
};
