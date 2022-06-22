import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { SearchData, TaskDto, UserDto } from '~/common/types/types';
import { useAppSelector } from '~/hooks/hooks';
import { SearchItem } from '../search-item/search-item';
import styles from './styles.module.scss';

type Props = {
  updateColumns: () => void;
};

type SearchDataItem = {
  columnId: string,
  task: TaskDto
};

export const SearchBar: FC<Props> = ({ updateColumns }) => {
  const { id: boardId } = useParams();
  const { tasks, usersMap } = useAppSelector((state) => ({
    usersMap: state.users.registeredUsers.reduce((result, user) => {
      return result.set(user.id, user);
    }, new Map<string, UserDto>()),
    tasks: state.boards.currentBoard?.columns.reduce((acc, column) => {
      const { tasks } = column;
      const searchDataItems: Array<SearchDataItem> = tasks.map((task) => ({
        columnId: column.id,
        task,
      }));
      return acc.concat(...searchDataItems);
    }, [] as Array<SearchDataItem>) || [],
  }));

  const [searchResults, setsearchResults] = useState<Array<SearchDataItem>>([]);
  const { register, handleSubmit } = useForm<SearchData>();

  const handleSearch = (payload: SearchData): void => {
    const { targetName } = payload;
    if (targetName) {
      const regExp = new RegExp(targetName, 'i');
      const results = tasks.filter(({ task }) => {
        return regExp.test(task.title);
      });
      setsearchResults(results);
      return;
    }
    setsearchResults([]);
  };

  return (
    <form className={styles['search-container']} onChange={handleSubmit(handleSearch)}>
      <input
        className={styles['search-input']}
        type="text" {...register('targetName')}
        placeholder="Search task"
        autoComplete="off"
      />
      <ul className={styles['search-results']}>
        {searchResults.map(({ columnId, task }) => {
          const { id, userId } = task;
          return (
            <SearchItem
              key={id}
              data={task as TaskDto}
              columnId={columnId}
              boardId={boardId as string}
              taskOwner={usersMap.get(userId)}
              updateColumns={updateColumns}
            />
          );
        })}
      </ul>
    </form>
  );
};
