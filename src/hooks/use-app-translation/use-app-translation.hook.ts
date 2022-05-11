import { useTranslation } from 'react-i18next';
import { AppLanguage } from '~/common/enums/enums';
import { AppLocalizationKey } from '~/common/types/types';

type UseAppTranslationReturn = {
  currentLanguage: AppLanguage,
  handleTranslate: (key:AppLocalizationKey) => string,
  handleLanguageChange: (language: AppLanguage) => void,
};

export const useAppTranslation = (): UseAppTranslationReturn => {
  const { t, i18n } = useTranslation();
  const { changeLanguage, resolvedLanguage } = i18n;

  return {
    handleTranslate: t,
    handleLanguageChange: changeLanguage,
    currentLanguage: resolvedLanguage as AppLanguage,
  };
};
