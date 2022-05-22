import { Task } from './components/task';
import { TaskResponseDto } from './common/type/type';
import { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { column as columnActions } from '~/store/actions';
import { AppRoute } from '~/common/enums/enums';
import { useAppDispatch, useAppSelector } from '~/hooks/hooks';
import { Button } from './components/button';
import { Modal } from '../common/modal/modal';
import { CreateColumnForm } from './components/column-creating-form';
import { ConfirmationModal } from '../common/confirmation-modal/confirmation-modal';
import { FormattedMessage } from '../common/common';

const mockTaskDto: TaskResponseDto = {
  id: '40af606c-c0bb-47d1-bc20-a2857242cde3',
  title: 'Task: pet the cat',
  order: 1,
  description: 'Domestic cat needs to be stroked gently',
  userId: '40af606c-c0bb-47d1-bc20-a2857242cde3',
  boardId: '8d3bad56-ad8a-495d-9500-18ae4d1de8dc',
  columnId: '41344d09-b995-451f-93dc-2f17ae13a4a9',
};

export const Board: FC = () => {
  const navigate = useNavigate();
  const { id: boardId } = useParams();
  const columns = useAppSelector((state) => state.column.columns);
  const maxOrder = columns.reduce((maxValue, { order }) => {
    return Math.max(maxValue, order);
  }, 1);
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [choosedId, setChoosedId] = useState('');

  useEffect(() => {
    if (boardId) {
      dispatch(columnActions.getAll(boardId));
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
      dispatch(columnActions.remove({ boardId, columnId: choosedId }));
    }
  };

  return (
    <div>
      <ConfirmationModal
        isOpen={Boolean(choosedId)}
        onClose={handleCloseConfirmation}
        onConfirm={handleConfirm}
      />
      <h1><FormattedMessage as="span" message="board.title" /> {boardId}</h1>
      {boardId && (
        <Modal isOpen={isModalOpen} onClose={handleToggleModal}>
          <CreateColumnForm
            id={boardId}
            order={maxOrder + 1}
            onClose={handleToggleModal}
          />
        </Modal>
      )}
      <Button title={'board.buttons.addColumn'} onClick={handleToggleModal} />
      {columns.map(({ id: columnId, title }) => {
        const handleDelete = (): void => {
          setChoosedId(columnId);
        };

        return (
          <div key={columnId}>
            <h3>{title}</h3>
            <Button title={'board.buttons.addColumn'} onClick={handleDelete} />
          </div>
        );
      })}
      <Button title={'board.buttons.backToMainPage'} onClick={handleReturn} />
      <Task item={mockTaskDto} />
    </div>
  );
};
