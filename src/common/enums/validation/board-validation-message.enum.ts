import { BoardValidationRule } from './board-validation-rule.enum';

export const BoardValidationMessage = {
  TITLE_REQUIRED: 'Title cannot be empty',
  TITLE_MIN_LENGTH: `Title must be at least ${BoardValidationRule.TITLE_MIN_LENGTH} characters`,
  TITLE_MAX_LENGTH: `Title must be max ${BoardValidationRule.TITLE_MAX_LENGTH} characters`,
} as const;
