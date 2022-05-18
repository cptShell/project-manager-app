import { CreateBoardValidationRule } from './create-board-validation-rule.enum';

export const CreateBoardValidationMessage = {
  TITLE_REQUIRED: 'Title cannot be empty',
  TITLE_MIN_LENGTH: `Title must be at least ${CreateBoardValidationRule.TITLE_MIN_LENGTH} characters`,
  TITLE_MAX_LENGTH: `Title must be max ${CreateBoardValidationRule.TITLE_MAX_LENGTH} characters`,
} as const;
