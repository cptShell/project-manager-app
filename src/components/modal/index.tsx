import { FC } from 'react';
import { createPortal } from 'react-dom';

import styles from './styles.module.scss';

type Props = {
  children: JSX.Element,
  onClick: CallableFunction
};

export const Modal: FC<Props> = ({ children, onClick }) => {
  return createPortal(
    <div className={styles.wrapper} onClick={(e): void => {onClick(e);}}>
      {children}
    </div>,
    document.body,
  );
};
