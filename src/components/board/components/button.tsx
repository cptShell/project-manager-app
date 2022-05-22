import { FC } from 'react';

type Props = {
  title: string;
  onClick?: () => void;
};

export const Button: FC<Props> = ({ title, onClick }) => {
  return <button onClick={onClick}>{title}</button>;
};
