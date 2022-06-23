import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  column as columnActions,
  board as boardActions,
  user as userActions,
} from '~/store/actions';
import { DataStatus } from '~/common/enums/enums';
import { useAppDispatch, useAppSelector } from '~/hooks/hooks';
import { ConfirmationModal } from '../common/confirmation-modal/confirmation-modal';
import { FullColumnDto, UserDto } from '~/common/types/types';
import { MainButton } from '../common/common';
import { NotFound } from '../not-found-page/not-found-page';
import { Loader } from '../common/loader/loader';
import { FilterContainer } from './components/filter-container/filter-container';
import { ColumnList } from './components/column-list';
import { SearchBar } from './components/search-bar/search-bar';
import styles from './styles.module.scss';

export const Board: FC = () => {
  const { id: boardId } = useParams();
  const { board, status, usersMap } = useAppSelector((state) => ({
    board: state.boards.currentBoard,
    status: state.boards.currentBoardStatus,
    usersMap: state.users.registeredUsers.reduce((result, user) => {
      return result.set(user.id, user);
    }, new Map<string, UserDto>()),
  }));
  const dispatch = useAppDispatch();
  const [choosedId, setChoosedId] = useState('');
  const [onlyMyTasks, setOnlyMyTasks] = useState(false);
  const [columns, setColumns] = useState<Array<FullColumnDto>>(
    board?.columns || [],
  );

  const handleChangeFilter = (): void => {
    setOnlyMyTasks(!onlyMyTasks);
  };

  const updateColumns = async (): Promise<void> => {
    if (boardId) {
      dispatch(boardActions.updateColumns(boardId));
    }
  };

  useEffect(() => {
    if (boardId) {
      dispatch(boardActions.getById(boardId));
    }
  }, []);

  useEffect(() => {
    setColumns(board?.columns || []);
  }, [board?.columns]);

  useEffect(() => {
    dispatch(userActions.getUsers());
  }, []);

  useEffect(() => {
    updateColumns();

    return () => {
      dispatch(boardActions.reset());
    };
  }, []);

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

  if (!board || !boardId || !usersMap.size) {
    return <Loader />;
  }

  return (
    <main className={styles.main}>
      <ConfirmationModal
        message={'modals.confirmation.deleteColumn'}
        isOpen={Boolean(choosedId)}
        onClose={handleCloseConfirmation}
        onConfirm={handleConfirm}
      />
      <div className={styles['board-header']}>
        <div className={styles['board-header-top']}>
          <MainButton />
          <SearchBar updateColumns={updateColumns} />
        </div>
        <div className={styles['board-header-bottom']}>
          <h1 className={styles['board-title']}>{board.title}</h1>
          <FilterContainer
            handleChangeFilter={handleChangeFilter}
            filter={{ onlyMyTasks }}
          />
        </div>
      </div>
      <ColumnList
        boardId={boardId}
        usersMap={usersMap}
        filter={{ onlyMyTasks }}
        columns={columns}
        updateColumns={updateColumns}
        setColumns={setColumns}
      />
    </main>
  );
};
