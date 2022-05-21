import { FC } from 'react';
import { AppLanguage } from '~/common/enums/enums';
import { useAppTranslation } from '~/hooks/hooks';
import { LanguageSwitcherItem } from './components/language-switcher-item';

export const LanguageSwitcher: FC = () => {
  const { handleLanguageChange } = useAppTranslation();

  return (
    <ul>
      {Object.values(AppLanguage).map((language, index) => (
        <LanguageSwitcherItem
          key={index}
          label={language}
          onLanguageChange={handleLanguageChange}
        />
      ))}
    </ul>
  );
};
