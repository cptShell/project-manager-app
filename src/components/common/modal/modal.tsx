import { FC, MouseEventHandler } from 'react';
import { createPortal } from 'react-dom';

import styles from './styles.module.scss';

type Props = {
  children: JSX.Element,
  isOpen: boolean,
  onClose: MouseEventHandler,
};

export const Modal: FC<Props> = ({ children, isOpen, onClose }) => {
  if (!isOpen) {
    return null;
  }
  return createPortal(
    <div className={styles.wrapper} onClick={onClose}>
      <div className={styles.innerWrapper}>
        {children}
      </div>
    </div>,
    document.body,
  );
};
