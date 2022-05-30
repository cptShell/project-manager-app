import i18n from 'i18next';
import { initReactI18next, I18nextProvider } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { AppLanguage } from '~/common/enums/enums';
import { ENMessagesMap, RUMessagesMap } from '~/locales/locales';

export class Internationalization {
  #instance: typeof i18n;

  constructor() {
    this.#instance = i18n;
    i18n
      .use(initReactI18next)
      .use(LanguageDetector)
      .init({
        fallbackLng: AppLanguage.EN,
        initImmediate: false,
        interpolation: {
          escapeValue: false,
        },
        resources: {
          [AppLanguage.EN]: {
            translation: ENMessagesMap,
          },
          [AppLanguage.RU]: {
            translation: RUMessagesMap,
          },
        },
      });
  }

  get instance(): typeof i18n {
    return this.#instance;
  }

  get provider(): typeof I18nextProvider {
    return I18nextProvider;
  }
}
