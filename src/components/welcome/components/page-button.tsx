import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

type Props = {
  path: string;
  title: string;
  className?: string;
};

export const PageButton: FC<Props> = ({ path, title, className }) => {
  const navigate = useNavigate();

  const handleClick = (): void => {
    navigate(path);
  };

  return <button className={className} onClick={handleClick}>{title}</button>;
};
