import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '~/common/enums/enums';
import { SearchData, SearchItemMain } from '~/common/types/types';
import { useAppSelector } from '~/hooks/hooks';
import { SearchItem } from '../search-item/search-item';
import styles from './styles.module.scss';

export const SearchBar: FC = () => {
  const navigate = useNavigate();
  const { boards } = useAppSelector((state) => state.boards);
  const [searchResults, setSearchResults] = useState<Array<SearchItemMain>>([]);
  const { register, handleSubmit } = useForm<SearchData>();

  const handleSearch = async (payload: SearchData): Promise<void> => {
    const { targetName } = payload;
    if (targetName) {
      const regExp = new RegExp(targetName, 'i');
      const results = boards.filter(({ title }) => regExp.test(title));
      setSearchResults(results);
      return;
    }
    setSearchResults([]);
  };

  return (
    <form className={styles['search-container']} onChange={handleSubmit(handleSearch)}>
      <input
        className={styles['search-input']}
        type="text"
        placeholder="Search board"
        autoComplete="off"
        {...register('targetName')}
      />
      <ul className={styles['search-results']}>
        {searchResults.map(({ title, id }) => {
          const handleClick = (): void => {
            navigate(`${AppRoute.BOARD}/${id}`);
          };
          return (
            <SearchItem
              onClick={handleClick}
              key={id}
              title={title}
            />
          );
        })}
      </ul>
    </form>
  );
};
