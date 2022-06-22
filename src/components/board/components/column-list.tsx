import { FC, useState } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import {
  column as columnActions,
  task as taskActions,
} from '~/store/actions';
import { BoardFilter, FullColumnDto, UserDto } from '~/common/types/types';
import { useAppDispatch } from '~/hooks/hooks';
import { Modal } from '~/components/common/modal/modal';
import { CreateColumnForm } from './column-creating-form';
import { Column } from './column/column';
import { FormattedMessage } from '~/components/common/common';
import { moveColumn, moveTask } from '../helpers/helpers';
import { ItemType } from '~/common/enums/enums';
import plusImg from '~/assets/images/plus.svg';
import styles from '../styles.module.scss';

type Props = {
  columns: Array<FullColumnDto>;
  usersMap: Map<string, UserDto>;
  filter: BoardFilter;
  boardId: string;
  updateColumns: () => void;
  setColumns: (columns: Array<FullColumnDto>) => void;
};

export const ColumnList: FC<Props> = ({ columns, usersMap, filter, boardId, updateColumns, setColumns }) => {
  const dispatch = useAppDispatch();
  const [isDragging, setIsDragging] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleToggleModal = (): void => {
    setIsModalOpen(!isModalOpen);
  };

  const handleDragEnd = (dropResult: DropResult): void => {
    const { source, destination: target, type } = dropResult;

    if (!target) {
      return;
    }

    let newColumns, taskPayload, columnPayload;
    const id = boardId;

    switch (type) {
      case ItemType.TASK:
        [newColumns, columnPayload] = moveTask(columns, id, source, target);

        setColumns(newColumns);
        if (columnPayload) {
          dispatch(taskActions.updateTask(columnPayload));
        }
        break;
      case ItemType.COLUMN:
        [newColumns, taskPayload] = moveColumn(columns, id, source, target);

        setColumns(newColumns);
        dispatch(columnActions.update(taskPayload));
        break;
    }

    setIsDragging(false);
  };

  const handleDragStart = (): void => {
    setIsDragging(true);
  };

  return (
    <section className={styles.section}>
      <DragDropContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
        <Droppable
          type="column"
          droppableId={`${boardId}`}
          direction="horizontal"
        >
          {(provided): JSX.Element => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className={styles['column-wrapper']}
            >
              {[...columns].map((column, index): JSX.Element => {
                const handleDeleteColumn = (): void => {
                  const deleteIndex = columns.findIndex(
                    (item) => item.id === column.id,
                  );

                  if (deleteIndex !== -1) {
                    const updatedColumns = [...columns];
                    const [{ id: columnId }] = updatedColumns.splice(
                      deleteIndex,
                      1,
                    );

                    dispatch(columnActions.removeColumn({ boardId, columnId }));
                    setColumns(updatedColumns);
                  }
                };

                return (
                  <Column
                    key={column.id}
                    item={column}
                    boardId={boardId}
                    handleDeleteColumn={handleDeleteColumn}
                    updateColumns={updateColumns}
                    usersMap={usersMap}
                    filter={filter}
                    columnIndex={index}
                    isDragging={isDragging}
                  />
                );
              })}
              {provided.placeholder}
              <div
                className={styles['add-column-wrapper']}
                onClick={handleToggleModal}
              >
                <img
                  className={styles['add-column-img']}
                  src={plusImg}
                  alt="plus"
                />
                <FormattedMessage as="h3" message="board.buttons.addColumn" />
              </div>
            </div>
          )}
        </Droppable>
        <Modal isOpen={isModalOpen} onClose={handleToggleModal}>
          <CreateColumnForm
            id={boardId}
            onClose={handleToggleModal}
            updateColumns={updateColumns}
          />
        </Modal>
      </DragDropContext>
    </section>
  );
};
