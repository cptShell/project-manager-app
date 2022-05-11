import { FC } from 'react';
import styles from './styles.module.scss';

interface Props {
  callback: CallableFunction,
  onResolve: CallableFunction
}

export const ConfirmationModal: FC<Props> = ({ callback, onResolve }) => {
  const confirm = (e: React.MouseEvent): void => {
    callback();
    onResolve(e);
  };
  const close = (e: React.MouseEvent): void => onResolve(e);

  return (
    <div className={styles.container}>
      <p>Are You Sure?</p>
      <div className={styles.btns}>
        <button onClick={confirm}>Yes</button>
        <button onClick={close}>No</button>
      </div>
    </div>
  );
};
