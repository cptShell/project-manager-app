import { FC, useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import update from 'immutability-helper';
import {
  column as columnActions,
  board as boardActions,
  task as taskActions,
  user as userActions,
} from '~/store/actions';
import { AppRoute, DataStatus } from '~/common/enums/enums';
import { useAppDispatch, useAppSelector } from '~/hooks/hooks';
import { Modal } from '../common/modal/modal';
import { CreateColumnForm } from './components/column-creating-form';
import { ConfirmationModal } from '../common/confirmation-modal/confirmation-modal';
import {
  ColumnDto,
  FullBoardDto,
  FullColumnDto,
  TaskPosition,
  UpdateTaskDto,
  UserDto,
} from '~/common/types/types';
import { FormattedMessage } from '../common/common';
import { Column } from './components/column/column';
import { NotFound } from '../not-found-page/not-found-page';
import { Loader } from '../common/loader/loader';
import { TaskUpdatePayload } from '~/store/task/common';
import plusImg from '~/assets/images/plus.svg';
import arrowImg from '~/assets/images/back-arrow.svg';
import styles from './styles.module.scss';

export const Board: FC = () => {
  const navigate = useNavigate();
  const { id: boardId } = useParams();
  const { board, status } = useAppSelector(({ boards }) => ({
    board: boards.currentBoard,
    status: boards.currentBoardStatus,
  }));
  const usersMap: Map<string, UserDto> = useAppSelector(({ users }) =>
    users.registeredUsers.reduce((result, user) => {
      return result.set(user.id, user);
    }, new Map()),
  );
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [choosedId, setChoosedId] = useState('');
  const [columns, setColumns] = useState<Array<FullColumnDto>>(
    board?.columns || [],
  );

  const updateColumns = async (): Promise<void> => {
    if (boardId) {
      const data = await dispatch(boardActions.getById(boardId)).unwrap();
      const currentBoard = data as FullBoardDto;

      setColumns(currentBoard.columns);
    }
  };

  const dropColumn = (dropIndex: number): void => {
    const targetColumn = columns[dropIndex];
    const createColumnResponseDto: ColumnDto = {
      ...targetColumn,
      order: dropIndex + 1,
    };
    const columnResponse = {
      boardId: board?.id || '',
      createColumnResponseDto,
    };

    dispatch(columnActions.update(columnResponse));
  };

  const dropTask = (dropPosition: TaskPosition): void => {
    if (!board) {
      return;
    }

    const { columnX: columnIndex, taskY: taskIndex } = dropPosition;
    const targetColumn = columns[columnIndex];
    const updatedColumnId = targetColumn.id;
    const targetTask = targetColumn.tasks[taskIndex];
    const prevColumn = board.columns.find((column) => {
      return column.tasks.findIndex((task) => task.id === targetTask.id) !== -1;
    });

    const updateTaskResponseDto: UpdateTaskDto = {
      title: targetTask.title,
      order: dropPosition.taskY + 1,
      description: targetTask.description,
      userId: targetTask.userId,
      boardId: board.id,
      columnId: updatedColumnId,
    };

    const taskResponse: TaskUpdatePayload = {
      columnId: prevColumn?.id || '',
      boardId: board.id,
      taskId: targetTask.id,
      updateTaskResponseDto,
    };

    dispatch(taskActions.updateTask(taskResponse));
  };

  const moveColumn = useCallback((dragIndex: number, hoverIndex: number) => {
    setColumns((prevColumns: Array<FullColumnDto>) =>
      update(prevColumns, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevColumns[dragIndex] as FullColumnDto],
        ],
      }),
    );
  }, []);

  const moveTask = useCallback(
    (dragPosition: TaskPosition, hoverPosition: TaskPosition) => {
      setColumns((prevColumns: Array<FullColumnDto>) => {
        const targetTasks = prevColumns[dragPosition.columnX].tasks;
        const insertedTask = targetTasks[dragPosition.taskY];

        if (dragPosition.columnX === hoverPosition.columnX) {
          return update(prevColumns, {
            [dragPosition.columnX]: {
              tasks: {
                $splice: [
                  [dragPosition.taskY, 1],
                  [hoverPosition.taskY, 0, targetTasks[dragPosition.taskY]],
                ],
              },
            },
          });
        }

        return update(prevColumns, {
          [dragPosition.columnX]: {
            tasks: {
              $splice: [[dragPosition.taskY, 1]],
            },
          },
          [hoverPosition.columnX]: {
            tasks: {
              $splice: [[hoverPosition.taskY, 0, insertedTask]],
            },
          },
        });
      });
    },
    [],
  );

  useEffect(() => {
    updateColumns();
  }, []);

  useEffect(() => {
    dispatch(userActions.getUsers());
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

  return (
    <DndProvider backend={HTML5Backend}>
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
          <h1 className={styles['board-title']}>{board.title}</h1>
        </div>
        <section className={styles.section}>
          <div className={styles['column-wrapper']}>
            {columns.map((column, index) => {
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
                  moveColumn={moveColumn}
                  dropColumn={dropColumn}
                  moveTask={moveTask}
                  dropTask={dropTask}
                  columnIndex={index}
                  handleDeleteColumn={handleDeleteColumn}
                  updateColumns={updateColumns}
                  usersMap={usersMap}
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
    </DndProvider>
  );
};
