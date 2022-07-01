import { AppLocalizationKey } from '../types';

export type SignUpUserDto = {
  login: string | AppLocalizationKey;
  name: string;
  password: string;
};
