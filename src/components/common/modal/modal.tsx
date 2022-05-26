import { FC } from 'react';
import { createPortal } from 'react-dom';

import styles from './styles.module.scss';

type Props = {
  children: JSX.Element,
  isOpen: boolean,
  onClose: () => void,
};

export const Modal: FC<Props> = ({ children, isOpen, onClose }) => {
  const handleClose = (e: React.MouseEvent): void => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    onClose();
  };

  if (!isOpen) {
    return null;
  }
  return createPortal(
    <div className={styles.wrapper} onClick={handleClose}>
      <div className={styles.innerWrapper}>
        {children}
      </div>
    </div>,
    document.body,
  );
};
