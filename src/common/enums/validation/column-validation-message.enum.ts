import { ColumnValidationRule } from './column-validation-rule.enum';

export const ColumnValidationMessage = {
  TITLE_REQUIRED: 'Title is required',
  TITLE_MIN_LENGTH: `Login must be at least ${ColumnValidationRule.TITLE_MIN_LENGTH} characters`,
  TITLE_MAX_LENGTH: `Login must be max ${ColumnValidationRule.TITLE_MAX_LENGTH} characters`,
} as const;
