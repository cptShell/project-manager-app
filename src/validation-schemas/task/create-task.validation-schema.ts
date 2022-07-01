import Joi from 'joi';
import {
  TaskValidationMessage,
  TaskValidationRule,
} from '~/common/enums/enums';
import { CreateBoardDto } from '~/common/types/types';

const createTask = Joi.object<CreateBoardDto>({
  title: Joi.string()
    .trim()
    .max(TaskValidationRule.TITLE_MAX_LENGTH)
    .required()
    .messages({
      'string.empty': TaskValidationMessage.TITLE_REQUIRED,
      'string.max': TaskValidationMessage.TITLE_MAX_LENGTH,
    }),
  description: Joi.string()
    .trim()
    .max(TaskValidationRule.DESCRIPTION_MAX_LENGTH)
    .required()
    .messages({
      'string.empty': TaskValidationMessage.DESCRIPTION_REQUIRED,
      'string.max': TaskValidationMessage.DESCRIPTION_MAX_LENGTH,
    }),
});

export { createTask };
