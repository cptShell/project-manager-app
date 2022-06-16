import Joi from 'joi';
import {
  TaskValidationMessage,
  TaskValidationRule,
} from '~/common/enums/enums';
import { EditTaskDto } from '~/common/types/types';

const editTask = Joi.object<EditTaskDto>({
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
  userId: Joi.string(),
});

export { editTask };
