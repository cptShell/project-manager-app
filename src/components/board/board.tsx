import { FC } from 'react';
import { Task } from './components/task';
import { CreateColumnForm } from './components/column-creating-form';
import { TaskResponseDto } from './common/type/type';

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
  return (
    <>
      <div>Board</div>
      <CreateColumnForm />
      <Task taskDto={mockTaskDto} />
    </>
  );
};
