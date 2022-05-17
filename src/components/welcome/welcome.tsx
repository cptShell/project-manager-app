import { FC } from 'react';
import { AUTH_BUTTONS_DATA, LOGGED_IN_BUTTONS_DATA } from './common/constants/constants';
import { PageButton } from './components/page-button';
import styles from './styles.module.scss';
import { info } from './common/constants/welcome-page-content';
import { MemberCard } from './components/member-card/member-card';
import { useAppSelector } from '~/hooks/hooks';

export const Welcome: FC = () => {
  const isAuth = useAppSelector((state) => state.auth.user?.id);
  const ifAuth = isAuth ? LOGGED_IN_BUTTONS_DATA : AUTH_BUTTONS_DATA;
  const topButtons = ifAuth.map(({ to, title }, i) => {
    return (
      <li className={styles.li} key={`topButton${i}`}>
        <PageButton className={styles.button} path={to} title={title}/>
      </li>
    );
  });
  const teamMembers = info.teamMembers.map(({ ava, name, aboutMe, contribution }, i) => (
    <li className={styles.li} key={`teamCard${i}`}>
      <MemberCard ava={ava} name={name} about={aboutMe} contribution={contribution}/>
    </li>
  ));
  return (
    <main className={styles.main}>
      <div className={styles['buttons-container']}>
        <ul className={styles.ul}>
          {topButtons}
        </ul>
      </div>
      <h2>Welcome</h2>
      <section className={styles['about-project']}>
        <p className={styles.p}>
          {info.aboutProject}
        </p>
      </section>
      <section className={styles['about-course']}>
        <p className={styles.p}>
          {info.aboutCourse}
        </p>
      </section>
      <section className={styles['team-members']}>
        <ul className={styles['team-members-ul']}>
          {teamMembers}
        </ul>
      </section>
    </main>
  );
};
