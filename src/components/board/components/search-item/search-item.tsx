import { FC, useState } from 'react';
import {
  TaskDto,
  UserDto,
} from '~/common/types/types';
import { Task } from '../task';
import styles from './styles.module.scss';

type Props = {
  key: string;
  data: TaskDto;
  boardId: string;
  columnId: string;
  updateColumns: () => void;
  taskOwner: UserDto | undefined;
};

export const SearchItem: FC<Props> = ({
  data,
  boardId,
  columnId,
  updateColumns,
  taskOwner,
}) => {
  const { id, title } = data;
  const [isOpen, setIsOpen] = useState(false);

  const handleModalOpen = (): void => {
    setIsOpen(true);
  };
  const handleModalClose = (): void => {
    setIsOpen(false);
  };

  return (
    <>
      {taskOwner && (
        <Task
          isOpen={isOpen}
          item={data}
          boardId={boardId}
          columnId={columnId}
          updateColumns={updateColumns}
          handleModalClose={handleModalClose}
          taskOwner={taskOwner}
        />
      )}
      <li className={styles['search-item']} key={id} onClick={handleModalOpen}>
        <span>{title}</span>
      </li>
    </>
  );
};
