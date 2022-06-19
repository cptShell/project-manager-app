import { FC } from 'react';
import { BoardFilter } from '~/common/types/types';
import styles from '../../styles.module.scss';

type Props = {
  filter: BoardFilter;
  handleChangeFilter: () => void;
};

export const FilterContainer: FC<Props> = ({ filter, handleChangeFilter }) => {
  const { onlyMyTasks } = filter;

  return (
    <div className={styles['board-filter-container']}>
      <span>Only my tasks</span>
      <input
        type="checkbox"
        checked={onlyMyTasks}
        onChange={handleChangeFilter}
      />
    </div>
  );
};
