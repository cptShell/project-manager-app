import { CreateColumnRule } from './create-column-rule.enum';

export const CreateColumnMessage = {
  TITLE_REQUIRED: 'Title is required',
  TITLE_MIN_LENGTH: `Login must be at least ${CreateColumnRule.TITLE_MIN_LENGTH} characters`,
  TITLE_MAX_LENGTH: `Login must be max ${CreateColumnRule.TITLE_MAX_LENGTH} characters`,
  ORDER_REQUIRED: 'Order is required',
  ORDER_POSITIVE: 'Order must be positive number',
  ORDER_INTEGER: 'Order must be integer',
} as const;
