import { FC } from 'react';
import styles from './styles.module.scss';

interface Props {
  callback: CallableFunction,
  onResolve: CallableFunction
}

export const ConfirmationModal: FC<Props> = ({ callback, onResolve }) => {
  const confirm = (e: React.MouseEvent, resp: boolean): void => {
    if (resp) {
      callback();
    }
    onResolve(e);
  };

  return (
    <div className={styles.container}>
      <p>Are You Sure?</p>
      <div className={styles.btns}>
        <button onClick={(e): void => confirm(e, true)}>Yes</button>
        <button onClick={(e): void => confirm(e, false)}>No</button>
      </div>
    </div>
  );
};
