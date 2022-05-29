import { FC, useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import update from 'immutability-helper';
import {
  column as columnActions,
  board as boardActions,
  task as taskActions,
} from '~/store/actions';
import { AppRoute, DataStatus } from '~/common/enums/enums';
import { useAppDispatch, useAppSelector } from '~/hooks/hooks';
import { Button } from './components/button';
import { Modal } from '../common/modal/modal';
import { CreateColumnForm } from './components/column-creating-form';
import { ConfirmationModal } from '../common/confirmation-modal/confirmation-modal';
import {
  ColumnDto,
  FullBoardDto,
  FullColumnDto,
  TaskPosition,
  UpdateTaskDto,
} from '~/common/types/types';
import { FormattedMessage, Header } from '../common/common';
import { Column } from './components/column/column';
import { NotFound } from '../not-found-page/not-found-page';
import { Loader } from '../common/loader/loader';
import styles from './styles.module.scss';
import { TaskUpdatePayload } from '~/store/task/common';

export const Board: FC = () => {
  const navigate = useNavigate();
  const { id: boardId } = useParams();
  const { board, status } = useAppSelector(({ boards }) => ({
    board: boards.currentBoard,
    status: boards.currentBoardStatus,
  }));
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [choosedId, setChoosedId] = useState('');
  const [columns, setColumns] = useState<Array<FullColumnDto>>(
    board?.columns || [],
  );

  const updateColumns = (): void => {
    if (boardId) {
      dispatch(boardActions.getById(boardId)).then((data) => {
        const currentBoard = data.payload as FullBoardDto;
        setColumns(currentBoard.columns);
      });
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

  if (!boardId || !board) {
    return <Loader />;
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <main className={styles.main}>
        <Header />
        <ConfirmationModal
          isOpen={Boolean(choosedId)}
          onClose={handleCloseConfirmation}
          onConfirm={handleConfirm}
        />
        <h1>
          <FormattedMessage as="span" message="board.title" /> {board.title}
        </h1>
        <Modal isOpen={isModalOpen} onClose={handleToggleModal}>
          <CreateColumnForm
            id={boardId}
            onClose={handleToggleModal}
            updateColumns={updateColumns}
          />
        </Modal>
        <Button title={'board.buttons.addColumn'} onClick={handleToggleModal} />
        <div className={styles['column-wrapper']}>
          {columns.map((column, index) => {
            const handleDeleteColumn = (): void => {
              const deleteIndex = columns.findIndex(
                (item) => item.id === column.id,
              );

              if (deleteIndex !== -1) {
                const updatedColumns = [...columns];
                const { id: columnId } = updatedColumns.splice(
                  deleteIndex,
                  1,
                )[0];

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
              />
            );
          })}
        </div>
        <Button title={'board.buttons.backToMainPage'} onClick={handleReturn} />
      </main>
    </DndProvider>
  );
};
