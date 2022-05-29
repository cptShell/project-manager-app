import { FC } from 'react';
import { AppLanguage } from '~/common/enums/enums';
import { useAppTranslation } from '~/hooks/hooks';
import { LanguageSwitcherItem } from './components/language-switcher-item';
import styles from './styles.module.scss';

export const LanguageSwitcher: FC = () => {
  const { handleLanguageChange } = useAppTranslation();

  return (
    <ul className={styles.ul}>
      {Object.values(AppLanguage).map((language) => (
        <LanguageSwitcherItem
          key={language}
          label={language}
          onLanguageChange={handleLanguageChange}
        />
      ))}
    </ul>
  );
};
