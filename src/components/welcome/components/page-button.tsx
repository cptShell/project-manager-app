import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

type Props = {
  path: string;
  title: string;
};

export const PageButton: FC<Props> = ({ path, title }) => {
  const navigate = useNavigate();

  const handleClick = (): void => {
    navigate(path);
  };

  return <button onClick={handleClick}>{title}</button>;
};
