import Joi from 'joi';
import {
  ColumnValidationMessage,
  ColumnValidationRule,
} from '~/common/enums/enums';
import { CreateColumnDto } from '~/common/types/types';

const createColumn = Joi.object<CreateColumnDto>({
  title: Joi.string()
    .trim()
    .max(ColumnValidationRule.TITLE_MAX_LENGTH)
    .required()
    .messages({
      'string.empty': ColumnValidationMessage.TITLE_REQUIRED,
      'string.max': ColumnValidationMessage.TITLE_MAX_LENGTH,
    }),
});

export { createColumn };
