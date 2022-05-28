import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '~/common/enums/enums';
import styles from './styles.module.scss';

export const NotFound: FC = () => {
  const navigate = useNavigate();

  const handleReturn = (): void => {
    navigate(AppRoute.MAIN);
  };

  return (
    <div>
      <iframe
        className={styles['video-player']}
        src={
          'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&disablekb=1&fs=0&loop=1&modestbranding=1&playsinline=1&iv_load_policy=3&mute=1'
        }
      ></iframe>
      <div className={styles['navigation-wrapper']}>
        <div className={styles['navigation-container']}>
          <button
            className={styles['navigation-button']}
            onClick={handleReturn}
          >
            Probably you are lost, click on Rick to return on Main page
          </button>
        </div>
      </div>
    </div>
  );
};
