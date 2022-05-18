import Joi from 'joi';
import {
  ColumnValidationMessage,
  ColumnValidationRule,
} from '~/common/enums/enums';
import { CreateColumnDto } from '~/common/types/types';

const createColumn = Joi.object<CreateColumnDto>({
  title: Joi.string()
    .trim()
    .min(ColumnValidationRule.TITLE_MIN_LENGTH)
    .max(ColumnValidationRule.TITLE_MAX_LENGTH)
    .required()
    .messages({
      'string.empty': ColumnValidationMessage.TITLE_REQUIRED,
      'string.min': ColumnValidationMessage.TITLE_MIN_LENGTH,
      'string.max': ColumnValidationMessage.TITLE_MAX_LENGTH,
    }),
  order: Joi.number().positive().integer().required().messages({
    'string.empty': ColumnValidationMessage.ORDER_REQUIRED,
    'string.integer': ColumnValidationMessage.ORDER_INTEGER,
    'string.positive': ColumnValidationMessage.ORDER_POSITIVE,
  }),
});

export { createColumn };
