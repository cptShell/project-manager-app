import { FC } from 'react';
import { AUTH_BUTTONS_DATA, LOGGED_IN_BUTTONS_DATA, TEAM_MEMBERS_PAYLOAD } from './common/constants/constants';
import { PageButton } from './common/page-button/page-button';
import styles from './styles.module.scss';
import { MemberCard } from './components/member-card/member-card';
import { useAppSelector } from '~/hooks/hooks';
import { FormattedMessage } from '../common/common';
import { LanguageSwitcher } from '../common/language-switcher/language-switcher';
import { InfoSection } from './components/info-section/info-section';
import { AppLocalizationKey } from '~/common/types/types';

export const Welcome: FC = () => {
  const hasUser = useAppSelector(({ auth }) => Boolean(auth.user));
  const buttonsData = hasUser ? LOGGED_IN_BUTTONS_DATA : AUTH_BUTTONS_DATA;

  return (
    <main className={styles.main}>
      <div className={styles['buttons-container']}>
        <LanguageSwitcher />
        <ul className={styles.ul}>
          {buttonsData.map(({ to, title }, i) => (
            <PageButton
              className={styles.button}
              path={to}
              title={title}
              key={`topButton${i}`} />
          ))}
        </ul>
      </div>
      <FormattedMessage className={styles['welcome-title']} as="h2" message="welcome.title" />
      <InfoSection content={'welcome.aboutProject'} />
      <InfoSection content={'welcome.aboutCourse'} />
      <section className={styles['team-members']}>
        <ul className={styles['team-members-ul']}>
          {[...Array(3)].map((e, i) => (
            <MemberCard
              avatar={TEAM_MEMBERS_PAYLOAD[i].avatar}
              name={TEAM_MEMBERS_PAYLOAD[i].name as AppLocalizationKey}
              about={TEAM_MEMBERS_PAYLOAD[i].aboutMe as AppLocalizationKey}
              contribution={TEAM_MEMBERS_PAYLOAD[i].contribution as AppLocalizationKey}
              key={`teamCard${i}`} />
          ))}
        </ul>
      </section>
    </main>
  );
};
