import Joi from 'joi';
import {
  UserAuthValidationMessage,
  UserAuthValidationRule,
} from '~/common/enums/enums';
import { SignInUserDto } from '~/common/types/types';

const signInUser = Joi.object<SignInUserDto>({
  login: Joi.string()
    .trim()
    .min(UserAuthValidationRule.LOGIN_MIN_LENGTH)
    .max(UserAuthValidationRule.LOGIN_MAX_LENGTH)
    .required()
    .messages({
      'string.empty': UserAuthValidationMessage.LOGIN_REQUIRED,
      'string.min': UserAuthValidationMessage.LOGIN_MIN_LENGTH,
      'string.max': UserAuthValidationMessage.LOGIN_MAX_LENGTH,
    }),
  password: Joi.string()
    .trim()
    .min(UserAuthValidationRule.PASSWORD_MIN_LENGTH)
    .max(UserAuthValidationRule.PASSWORD_MAX_LENGTH)
    .required()
    .messages({
      'string.empty': UserAuthValidationMessage.PASSWORD_REQUIRED,
      'string.min': UserAuthValidationMessage.PASSWORD_MIN_LENGTH,
      'string.max': UserAuthValidationMessage.PASSWORD_MAX_LENGTH,
    }),
});

export { signInUser };
