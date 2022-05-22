import { AuthLocalizationKey } from './auth-localization-key.type';
import { ModalsLocalizationKey } from './modals-localization-key.type';
import { HeaderLocalizationKey } from './header-localization-key.type';
import { MainLocalizationKey } from './main-localization-key.type';
import { WelcomeLocalizationKey } from './welcome-localization-key.type';
import { ProfileLocalizationKey } from './profile-localization-key.type';
import { ValidationMessagesLocalizationKey } from './validation-messages-localization-key.type';

export type AppLocalizationMap = {
  header: HeaderLocalizationKey,
  modals: ModalsLocalizationKey,
  auth: AuthLocalizationKey,
  profile: ProfileLocalizationKey,
  main: MainLocalizationKey,
  welcome: WelcomeLocalizationKey,
  validationMessages: ValidationMessagesLocalizationKey,
};
