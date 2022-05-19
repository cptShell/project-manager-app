import { ChangeEvent, Dispatch, FC, SetStateAction, useState } from 'react';
import { TaskResponseDto } from '../common/type/type';

type Props = {
  taskDto: TaskResponseDto;
};

export const Task: FC<Props> = ({ taskDto }) => {
  const [title, setTitle] = useState(taskDto.title);
  const [description, setDescription] = useState(taskDto.description);
  const [isTitleEditMode, setTitleEditMode] = useState(false);
  const [isDescriptionEditMode, setDescriptionEditMode] = useState(false);

  const handleChange =
    (setValue: Dispatch<SetStateAction<string>>) =>
    (event: ChangeEvent<HTMLInputElement>): void => {
      setValue(event.target.value);
    };

  const toggleEditModeOn =
    (setEditMode: Dispatch<SetStateAction<boolean>>) => (): void =>
      setEditMode(true);

  const toggleEditModeOff =
    (setEditMode: Dispatch<SetStateAction<boolean>>) => (): void =>
      setEditMode(false);

  const handleApplyTaskChanges = (): void => {
    const payload: TaskResponseDto = { ...taskDto, title, description };
    //TODO: add dispatch action for update task. Task must be updated after apply
    alert(JSON.stringify(payload));
  };

  return (
    <div>
      <h2>Task Card</h2>
      {isTitleEditMode ? (
        <input
          type="text"
          defaultValue={title}
          onChange={handleChange(setTitle)}
          onBlur={toggleEditModeOff(setTitleEditMode)}
        />
      ) : (
        <h3 onClick={toggleEditModeOn(setTitleEditMode)}>{title}</h3>
      )}
      {isDescriptionEditMode ? (
        <input
          type="text"
          defaultValue={description}
          onChange={handleChange(setDescription)}
          onBlur={toggleEditModeOff(setDescriptionEditMode)}
        />
      ) : (
        <p onClick={toggleEditModeOn(setDescriptionEditMode)}>{description}</p>
      )}
      <button onClick={handleApplyTaskChanges}>Apply changes</button>
    </div>
  );
};
