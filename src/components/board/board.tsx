import { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { column as columnActions } from '~/store/actions';
import { AppRoute } from '~/common/enums/enums';
import { useAppDispatch, useAppSelector } from '~/hooks/hooks';
import { Button } from './components/button';
import { Modal } from '../common/modal/modal';
import { CreateColumnForm } from './components/column-creating-form';
import { ConfirmationModal } from '../common/confirmation-modal/confirmation-modal';

export const Board: FC = () => {
  const navigate = useNavigate();
  const { id: boardId } = useParams();
  const columns = useAppSelector((state) => state.column.columns);
  const maxOrder = columns.reduce((maxValue, { order }) => {
    return Math.max(maxValue, order);
  }, 1);
  console.log(maxOrder);
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

  const handleConfirm = async (): Promise<void> => {
    if (boardId && Boolean(choosedId)) {
      await dispatch(columnActions.remove({ boardId, columnId: choosedId }));
    }
  };

  return (
    <div>
      <ConfirmationModal
        isOpen={Boolean(choosedId)}
        onClose={handleCloseConfirmation}
        onConfirm={handleConfirm}
      />
      <h1>You are on page {boardId}</h1>
      {boardId && (
        <Modal isOpen={Boolean(isModalOpen)} onClose={handleToggleModal}>
          <CreateColumnForm
            id={boardId}
            order={maxOrder + 1}
            onClose={handleToggleModal}
          />
        </Modal>
      )}
      <Button title={'Add column'} onClick={handleToggleModal} />
      {columns.map(({ id: columnId, title }) => {
        const handleDelete = (): void => {
          setChoosedId(columnId);
        };

        return (
          <div key={columnId}>
            <h3>{title}</h3>
            <Button title={'Delete column'} onClick={handleDelete} />
          </div>
        );
      })}
      <Button title={'Back to Main Page'} onClick={handleReturn} />
    </div>
  );
};
