import { FC } from 'react';
import { AppLanguage } from '~/common/enums/enums';
import { useAppTranslation } from '~/hooks/hooks';

export const LanguageSwitcher: FC = () => {

  const { handleLanguageChange } = useAppTranslation();

  return (
    <div>
      <button onClick={():void => handleLanguageChange(AppLanguage.EN)}>EN</button>
      <button onClick={():void => handleLanguageChange(AppLanguage.RU)}>RU</button>
    </div>
  );
};

