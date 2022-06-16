import { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import update from 'immutability-helper';
import {
  column as columnActions,
  board as boardActions,
  user as userActions,
  task as taskActions,
} from '~/store/actions';
import { AppRoute, DataStatus } from '~/common/enums/enums';
import { useAppDispatch, useAppSelector } from '~/hooks/hooks';
import { Modal } from '../common/modal/modal';
import { CreateColumnForm } from './components/column-creating-form';
import { ConfirmationModal } from '../common/confirmation-modal/confirmation-modal';
import {
  FullBoardDto,
  FullColumnDto,
  UpdateTaskDto,
  UserDto,
} from '~/common/types/types';
import { FormattedMessage } from '../common/common';
import { Column } from './components/column/column';
import { NotFound } from '../not-found-page/not-found-page';
import { Loader } from '../common/loader/loader';
import plusImg from '~/assets/images/plus.svg';
import arrowImg from '~/assets/images/back-arrow.svg';
import styles from './styles.module.scss';
import { TaskUpdatePayload } from '~/store/task/common';

export const Board: FC = () => {
  const navigate = useNavigate();
  const { id: boardId } = useParams();
  const { board, status, usersMap } = useAppSelector((state) => ({
    board: state.boards.currentBoard,
    status: state.boards.currentBoardStatus,
    usersMap: state.users.registeredUsers.reduce((result, user) => {
      return result.set(user.id, user);
    }, new Map<string, UserDto>()),
  }));
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [choosedId, setChoosedId] = useState('');
  const [columns, setColumns] = useState<Array<FullColumnDto>>(
    board?.columns || [],
  );
  const [isOnlyMyTasks, setIsOnlyMyTasks] = useState<boolean>(false);

  const handleChangeFilter = (): void => {
    setIsOnlyMyTasks(!isOnlyMyTasks);
  };

  const updateColumns = async (): Promise<void> => {
    if (boardId) {
      const data = await dispatch(boardActions.getById(boardId)).unwrap();
      const currentBoard = data as FullBoardDto;

      setColumns(currentBoard.columns);
    }
  };

  useEffect(() => {
    dispatch(userActions.getUsers());
  }, []);

  useEffect(() => {
    updateColumns();
  }, []);

  const handleReturn = (): void => {
    navigate(AppRoute.MAIN);
  };

  const handleToggleModal = (): void => {
    setIsModalOpen(!isModalOpen);
  };

  const handleCloseConfirmation = (): void => {
    setChoosedId('');
  };

  const handleConfirm = (): void => {
    if (boardId && Boolean(choosedId)) {
      dispatch(columnActions.removeColumn({ boardId, columnId: choosedId }));
    }
  };

  if (status === DataStatus.REJECTED) {
    return <NotFound />;
  }

  if (!boardId || !board || !usersMap.size) {
    return <Loader />;
  }

  const handleDragEnd = ({ source, destination }: DropResult): void => {
    if (!destination) {
      return;
    }

    const sourceId = source.droppableId;
    const targetId = destination.droppableId;
    const sourceColumn = columns.find((column) => column.id === sourceId);
    const sourceTask = sourceColumn?.tasks[source.index];
    const targetTask = sourceColumn?.tasks[destination.index];

    if (!sourceTask || !targetTask) {
      return;
    }

    const sourceIndex = columns.findIndex((column) => column.id === sourceId);
    const targetIndex = columns.findIndex((column) => column.id === targetId);
    let result: Array<FullColumnDto>;

    if (sourceIndex !== targetIndex) {
      result = update(columns, {
        [sourceIndex]: {
          tasks: { $splice: [[source.index, 1]] },
        },
        [targetIndex]: {
          tasks: { $splice: [[destination.index, 0, sourceTask]] },
        },
      });
    } else {
      result = update(columns, {
        [sourceIndex]: {
          tasks: {
            $splice: [
              [source.index, 1],
              [destination.index, 0, sourceTask],
            ],
          },
        },
      });
    }

    const updateTaskResponseDto: UpdateTaskDto = {
      title: sourceTask.title,
      description: sourceTask.description,
      order: targetTask.order,
      userId: sourceTask.userId,
      boardId: board.id,
      columnId: targetId,
    };

    const taskResponse: TaskUpdatePayload = {
      columnId: sourceId,
      boardId: board.id,
      taskId: sourceTask.id,
      updateTaskResponseDto,
    };

    setColumns(result);
    dispatch(taskActions.updateTask(taskResponse));
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <main className={styles.main}>
        <ConfirmationModal
          message={'modals.confirmation.deleteColumn'}
          isOpen={Boolean(choosedId)}
          onClose={handleCloseConfirmation}
          onConfirm={handleConfirm}
        />
        <div className={styles['board-header']}>
          <div
            className={styles['back-to-main-container']}
            onClick={handleReturn}
          >
            <img
              className={styles['back-to-main-icon']}
              src={arrowImg}
              alt="back arrow"
            />
            <FormattedMessage
              className={styles['back-to-main']}
              as="h3"
              message="board.buttons.backToMainPage"
            />
          </div>
          <div className={styles['board-header-top']}>
            <h1 className={styles['board-title']}>{board.title}</h1>
            <div className={styles['board-filter-container']}>
              <span>Only my tasks</span>
              <input
                type="checkbox"
                checked={isOnlyMyTasks}
                onChange={handleChangeFilter}
              />
            </div>
          </div>
        </div>
        <section className={styles.section}>
          <div className={styles['column-wrapper']}>
            {[...columns].map((column) => {
              const handleDeleteColumn = (): void => {
                const deleteIndex = columns.findIndex(
                  (item) => item.id === column.id,
                );

                if (deleteIndex !== -1) {
                  const updatedColumns = [...columns];
                  const [{ id: columnId }] = updatedColumns.splice(
                    deleteIndex,
                    1,
                  );

                  dispatch(columnActions.removeColumn({ boardId, columnId }));
                  setColumns(updatedColumns);
                }
              };

              return (
                <Column
                  key={column.id}
                  item={column}
                  boardId={boardId}
                  handleDeleteColumn={handleDeleteColumn}
                  updateColumns={updateColumns}
                  usersMap={usersMap}
                  filter={{ onlyMyTasks: isOnlyMyTasks }}
                />
              );
            })}
            <div
              className={styles['add-column-wrapper']}
              onClick={handleToggleModal}
            >
              <img
                className={styles['add-column-img']}
                src={plusImg}
                alt="plus"
              />
              <FormattedMessage as="h3" message="board.buttons.addColumn" />
            </div>
          </div>
          <Modal isOpen={isModalOpen} onClose={handleToggleModal}>
            <CreateColumnForm
              id={boardId}
              onClose={handleToggleModal}
              updateColumns={updateColumns}
            />
          </Modal>
        </section>
      </main>
    </DragDropContext>
  );
};
