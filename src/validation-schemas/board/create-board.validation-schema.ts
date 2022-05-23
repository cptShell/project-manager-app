import Joi from 'joi';
import {
  BoardValidationMessage,
  BoardValidationRule,
} from '~/common/enums/enums';
import { CreateBoardDto } from '~/common/types/types';

const createBoard = Joi.object<CreateBoardDto>({
  title: Joi.string()
    .trim()
    .max(BoardValidationRule.TITLE_MAX_LENGTH)
    .required()
    .messages({
      'string.empty': BoardValidationMessage.TITLE_REQUIRED,
      'string.max': BoardValidationMessage.TITLE_MAX_LENGTH,
    }),
  description: Joi.string()
    .trim()
    .max(BoardValidationRule.DESCRIPTION_MAX_LENGTH)
    .required()
    .messages({
      'string.empty': BoardValidationMessage.DESCRIPTION_REQUIRED,
      'string.max': BoardValidationMessage.DESCRIPTION_MAX_LENGTH,
    }),
});

export { createBoard };
