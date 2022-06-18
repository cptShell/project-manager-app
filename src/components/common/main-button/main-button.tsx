import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '~/common/enums/enums';
import { FormattedMessage } from '../common';
import arrowImg from '~/assets/images/back-arrow.svg';
import styles from './styles.module.scss';

export const MainButton: FC = () => {
  const navigate = useNavigate();

  const handleReturn = (): void => {
    navigate(AppRoute.MAIN);
  };

  return (
    <div className={styles['back-to-main-container']} onClick={handleReturn}>
      <img
        className={styles['back-to-main-icon']}
        src={arrowImg}
        alt="back arrow"
      />
      <FormattedMessage
        className={styles['back-to-main']}
        as="h3"
        message="board.buttons.backToMainPage"
      />
    </div>
  );
};
