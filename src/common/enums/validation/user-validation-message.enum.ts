import { UserAuthValidationRule } from './user-validation-rule.enum';

export const UserAuthValidationMessage = {
  LOGIN_REQUIRED: 'Login is required',
  LOGIN_MIN_LENGTH: `Login must be at least ${UserAuthValidationRule.LOGIN_MIN_LENGTH} characters`,
  LOGIN_MAX_LENGTH: `Login must be max ${UserAuthValidationRule.LOGIN_MAX_LENGTH} characters`,
  NAME_REQUIRED: 'Name is required',
  NAME_MIN_LENGTH: `Name must be at least ${UserAuthValidationRule.NAME_MIN_LENGTH} characters`,
  NAME_MAX_LENGTH: `Name must be max ${UserAuthValidationRule.NAME_MAX_LENGTH} characters`,
  PASSWORD_REQUIRED: 'Password is required',
  PASSWORD_MIN_LENGTH: `Name must be at least ${UserAuthValidationRule.NAME_MIN_LENGTH} characters`,
  PASSWORD_MAX_LENGTH: `Name must be max ${UserAuthValidationRule.NAME_MAX_LENGTH} characters`,
} as const;
