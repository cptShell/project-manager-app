import { FC } from 'react';
import styles from './styles.module.scss';
import RSLogo from '~/assets/images/rs-logo.svg';
import GithubLogo from '~/assets/images/github-logo.svg';

export const Footer: FC = () => {
  const githubData = {
    user1: {
      name: 'Yauheni Maslousky',
      link: 'https://github.com/cptshell',
    },
    user2: {
      name: 'Oleksii Romanovskyi',
      link: 'https://github.com/aelxrmoan',
    },
    user3: {
      name: 'Nikolay Potopa',
      link: 'https://github.com/Nazeroth',
    },
  };

  return (
    <div className={styles['wrapper']}>
      <div className={styles['github']}>
        {Object.values(githubData).map((user, index) => {
          return (
            <a
              key={index}
              className={styles['github']}
              href={user.link}
              target="_blank"
            >
              <img
                className={styles['github-img']}
                src={GithubLogo}
                alt="Github logo"
              />
              <p className={styles['github-name']}>{user.name}</p>
            </a>
          );
        })}
      </div>

      <div className={styles['logo-wrapper']}>
        <a href="https://rs.school/react/" target="_blank">
          <img src={RSLogo} alt="RS School logo" />
        </a>
        <span className={styles['date']}>2022</span>
      </div>
    </div>
  );
};
