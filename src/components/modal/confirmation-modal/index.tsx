import { FC } from 'react';
import css from './styles.module.scss';

interface confirmationMod {
  callback: CallableFunction,
  onResolve: CallableFunction
}

export const ConfirmationMod: FC<confirmationMod> = ({ callback, onResolve }) => {
  const confirm = (e: React.MouseEvent, resp: boolean): void => {
    if (resp) {
      callback();
    }
    onResolve(e);
  };

  return (
    <div className={css.container}>
      <p>Are You Sure?</p>
      <div className={css.btns}>
        <button onClick={(e): void => confirm(e, true)}>Yes</button>
        <button onClick={(e): void => confirm(e, false)}>No</button>
      </div>
    </div>
  );
};
