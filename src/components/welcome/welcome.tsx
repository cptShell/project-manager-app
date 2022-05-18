import { FC } from 'react';
import { AUTH_BUTTONS_DATA, LOGGED_IN_BUTTONS_DATA } from './common/constants/constants';
import { PageButton } from './components/page-button';
import styles from './styles.module.scss';
import { info } from './common/constants/welcome-page-content';
import { MemberCard } from './components/member-card/member-card';
import { useAppSelector } from '~/hooks/hooks';
import { FormattedMessage } from '../common/common';
import { LanguageSwitcher } from '../common/language-switcher/language-switcher';
import { InfoSection } from './components/info-section/info-section';

export const Welcome: FC = () => {
  const isAuth = useAppSelector((state) => state.auth.user?.id);
  const ifAuth = isAuth ? LOGGED_IN_BUTTONS_DATA : AUTH_BUTTONS_DATA;

  return (
    <main className={styles.main}>
      <div className={styles['buttons-container']}>
        <LanguageSwitcher />
        <ul className={styles.ul}>
          {ifAuth.map(({ to, title }, i) => (
            <li className={styles.li} key={`topButton${i}`}>
              <PageButton
              className={styles.button}
              path={to}
              title={title as JSX.Element}/>
            </li>
          ))}
        </ul>
      </div>
        <FormattedMessage className={styles['welcome-title']} as="h2" message="welcome.title" />
        <InfoSection content={'welcome.aboutProject'} />
        <InfoSection content={'welcome.aboutCourse'} />
      <section className={styles['team-members']}>
        <ul className={styles['team-members-ul']}>
          {info.teamMembers.map(({ avatar, name, aboutMe, contribution }, i) => (
            <li className={styles.li} key={`teamCard${i}`}>
              <MemberCard 
              avatar={avatar}
              name={name}
              about={aboutMe}
              contribution={contribution} />
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
};
