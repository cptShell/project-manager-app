import { BoardValidationRule } from './board-validation-rule.enum';

export const BoardValidationMessage = {
  TITLE_REQUIRED: 'Title cannot be empty',
  TITLE_MAX_LENGTH: `Title must be max ${BoardValidationRule.TITLE_MAX_LENGTH} characters`,
  DESCRIPTION_REQUIRED: 'Description cannot be empty',
  DESCRIPTION_MAX_LENGTH: `Description must be max ${BoardValidationRule.DESCRIPTION_MAX_LENGTH} characters`,
} as const;
