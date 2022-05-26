import { FC, useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import update from 'immutability-helper';
import {
  column as columnActions,
  board as boardActions,
} from '~/store/actions';
import { AppRoute, DataStatus } from '~/common/enums/enums';
import { useAppDispatch, useAppSelector } from '~/hooks/hooks';
import { Button } from './components/button';
import { Modal } from '../common/modal/modal';
import { CreateColumnForm } from './components/column-creating-form';
import { ConfirmationModal } from '../common/confirmation-modal/confirmation-modal';
import { FullBoardDto, FullColumnDto } from '~/common/types/types';
import { FormattedMessage, Header } from '../common/common';
import { Column } from './components/column';
import { NotFound } from '../not-found-page/not-found-page';
import { Loader } from '../common/loader/loader';
import styles from './styles.module.scss';

type TaskPosition = {
  columnX: number;
  taskY: number;
};

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

        const insertedTask = targetTasks[dragPosition.taskY];

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
    if (boardId) {
      dispatch(boardActions.getById(boardId)).then((data) => {
        const currentBoard = data.payload as FullBoardDto;
        setColumns(currentBoard.columns);
      });
    }
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
        <CreateColumnForm id={boardId} onClose={handleToggleModal} />
      </Modal>
      <Button title={'board.buttons.addColumn'} onClick={handleToggleModal} />
      <div className={styles['column-wrapper']}>
        {columns.map((column, index) => (
          <Column
            key={column.id}
            item={column}
            boardId={boardId}
            moveColumn={moveColumn}
            moveTask={moveTask}
            columnIndex={index}
          />
        ))}
      </div>
      <Button title={'board.buttons.backToMainPage'} onClick={handleReturn} />
    </DndProvider>
  );
};
