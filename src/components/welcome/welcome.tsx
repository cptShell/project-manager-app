import { FC } from 'react';
import {
  AUTH_BUTTONS_DATA,
  LOGGED_IN_BUTTONS_DATA,
  TEAM_MEMBERS_PAYLOAD,
} from './common/constants/constants';
import { PageButton } from './common/page-button/page-button';
import { MemberCard } from './components/member-card/member-card';
import { useAppSelector } from '~/hooks/hooks';
import { FormattedMessage } from '../common/common';
import { LanguageSwitcher } from '../common/language-switcher/language-switcher';
import { InfoSection } from './components/info-section/info-section';
import { AppLocalizationKey } from '~/common/types/types';
import RSLogo from '~/assets/images/rs-logo.svg';
import WelcomeLogo from '~/assets/images/welcome.svg';
import styles from './styles.module.scss';

export const Welcome: FC = () => {
  const hasUser = useAppSelector(({ auth }) => Boolean(auth.user));
  const buttonsData = hasUser ? LOGGED_IN_BUTTONS_DATA : AUTH_BUTTONS_DATA;

  return (
    <main>
      <div>
        <LanguageSwitcher />
        <ul>
          {buttonsData.map(({ to, title }, i) => (
            <PageButton
              className={styles.button}
              path={to}
              title={title}
              key={`topButton${i}`}
            />
          ))}
        </ul>
      </div>
      <div className={styles['content-wrapper']}>
        <div className={styles['content-welcome']}>
          <div className={styles['welcome-logo']}>
            <img src={WelcomeLogo} alt="welcome image" />
          </div>
          <div className={styles['welcome-text']}>
            <FormattedMessage as="h2" message="welcome.titleWelcome" />
            <InfoSection content={'welcome.aboutProject'} />
          </div>
        </div>
        <div className={styles['content-course']}>
          <div className={styles['course-logo']}>
            <img src={RSLogo} alt="course logo" />
          </div>
          <div className={styles['content-text']}>
            <FormattedMessage as="h2" message="welcome.titleCourse" />
            <InfoSection content={'welcome.aboutCourse'} />
          </div>
        </div>
        <div className={styles['content-team']}>
          <FormattedMessage as="h2" message="welcome.titleMembers" />

          {[...Array(3)].map((e, i) => (
            <MemberCard
              avatar={TEAM_MEMBERS_PAYLOAD[i].avatar}
              name={TEAM_MEMBERS_PAYLOAD[i].name as AppLocalizationKey}
              about={TEAM_MEMBERS_PAYLOAD[i].aboutMe as AppLocalizationKey}
              contribution={
                TEAM_MEMBERS_PAYLOAD[i].contribution as AppLocalizationKey
              }
              key={`teamCard${i}`}
            />
          ))}
        </div>
      </div>
    </main>
  );
};
