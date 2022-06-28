import { FC } from 'react';
import { BoardFilter } from '~/common/types/types';
import { FormattedMessage } from '~/components/common/common';
import styles from '../../styles.module.scss';

type Props = {
  filter: BoardFilter;
  handleChangeFilter: () => void;
};

export const FilterContainer: FC<Props> = ({ filter, handleChangeFilter }) => {
  const { onlyMyTasks } = filter;

  return (
    <div className={styles['board-filter-container']}>
      <FormattedMessage as="span" message="board.filterTitle" />
      <input
        type="checkbox"
        checked={onlyMyTasks}
        onChange={handleChangeFilter}
      />
    </div>
  );
};
