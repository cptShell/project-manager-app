import { FC } from 'react';
import { CONTRIBUTORS } from '~/common/constants/constants';
import styles from './styles.module.scss';
import RSLogo from '~/assets/images/rs-logo.svg';
import GithubLogo from '~/assets/images/github-logo.svg';

export const Footer: FC = () => {
  return (
    <div className={styles['wrapper']}>
      <div className={styles['container']}>
        <div className={styles['logo-wrapper']}>
          <a href="https://rs.school/react/" target="_blank">
            <img src={RSLogo} alt="RS School logo" />
          </a>
        </div>
        <div className={styles['github-container']}>
          {CONTRIBUTORS.map(({ name, link }, index) => {
            return (
              <a
                key={index}
                className={styles['github']}
                href={link}
                target="_blank"
              >
                <img
                  className={styles['github-img']}
                  src={GithubLogo}
                  alt="Github logo"
                />
                <p className={styles['github-name']}>{name}</p>
              </a>
            );
          })}
        </div>
        <div className={styles['date-container']}>
          <span>© 2022</span>
        </div>
      </div>
    </div>
  );
};
