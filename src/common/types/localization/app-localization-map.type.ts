import { AuthLocalizationKey } from './auth-localization-key.type';
import { ModalsLocalizationKey } from './auth-localization-key.type copy';
import { HeaderLocalizationKey } from './header-localization-key.type';
import { MainLocalizationKey } from './main-localization-key.type';
import { WelcomeLocalizationKey } from './welcome-localization-key.type';

export type AppLocalizationMap = {
  header: HeaderLocalizationKey,
  auth: AuthLocalizationKey,
  main: MainLocalizationKey,
  welcome: WelcomeLocalizationKey,
  modals: ModalsLocalizationKey,
};
