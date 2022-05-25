import { FC, useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import update from 'immutability-helper';
import {
  column as columnActions,
  board as boardActions,
} from '~/store/actions';
import { AppRoute } from '~/common/enums/enums';
import { useAppDispatch, useAppSelector } from '~/hooks/hooks';
import { Button } from './components/button';
import { Modal } from '../common/modal/modal';
import { CreateColumnForm } from './components/column-creating-form';
import { ConfirmationModal } from '../common/confirmation-modal/confirmation-modal';
import { FormattedMessage } from '../common/common';
import { Column } from './components/column';
import styles from './styles.module.scss';
import { FullColumnDto } from '~/common/types/types';

const mockedFullColumns: Array<FullColumnDto> = [
  {
    'id': '08cc10f4-1aeb-4cce-9793-9fea8313b591',
    'title': 'Done1',
    'order': 1,
    tasks: [],
  },
  {
    'id': '08cc10f4-1aeb-4cce-9793-9fea8313b592',
    'title': 'Done2',
    'order': 2,
    tasks: [],
  },
  {
    'id': '08cc10f4-1aeb-4cce-9793-9fea8313b593',
    'title': 'Done3',
    'order': 3,
    tasks: [],
  },
  {
    'id': '08cc10f4-1aeb-4cce-9793-9fea8313b594',
    'title': 'Done4',
    'order': 4,
    tasks: [],
  },
  {
    'id': '08cc10f4-1aeb-4cce-9793-9fea8313b595',
    'title': 'Done5',
    'order': 5,
    tasks: [],
  },
];

export const Board: FC = () => {
  const navigate = useNavigate();
  const { id: boardId } = useParams();
  const board = useAppSelector((state) => state.boards.currentBoard);
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [choosedId, setChoosedId] = useState('');
  const [columns, setColumns] =
    useState<Array<FullColumnDto>>(mockedFullColumns);

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

  useEffect(() => {
    if (boardId) {
      dispatch(boardActions.getById(boardId));
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

  return (
    <DndProvider backend={HTML5Backend}>
      <ConfirmationModal
        isOpen={Boolean(choosedId)}
        onClose={handleCloseConfirmation}
        onConfirm={handleConfirm}
      />
      <h1>
        <FormattedMessage as="span" message="board.title" /> {boardId}
      </h1>
      {!!(boardId && board) && (
        <>
          <Modal isOpen={isModalOpen} onClose={handleToggleModal}>
            <CreateColumnForm id={boardId} onClose={handleToggleModal} />
          </Modal>
          <Button
            title={'board.buttons.addColumn'}
            onClick={handleToggleModal}
          />
          <div className={styles['column-wrapper']}>
            {[...columns].map((column, index) => (
              <Column
                key={column.id}
                item={column}
                boardId={boardId}
                moveColumn={moveColumn}
                index={index}
              />
            ))}
          </div>
          <Button
            title={'board.buttons.backToMainPage'}
            onClick={handleReturn}
          />
        </>
      )}
    </DndProvider>
  );
};
