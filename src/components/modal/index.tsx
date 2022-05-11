import { FC, MouseEventHandler } from 'react';
import { createPortal } from 'react-dom';

import styles from './styles.module.scss';

type Props = {
  children: JSX.Element,
  onClick: MouseEventHandler
};

export const Modal: FC<Props> = ({ children, onClick }) => {
  return createPortal(
    <div className={styles.wrapper} onClick={onClick}>
      {children}
    </div>,
    document.body,
  );
};
