import Joi from 'joi';
import {
  BoardValidationMessage,
  BoardValidationRule,
} from '~/common/enums/enums';
import { CreateBoardDto } from '~/common/types/types';

const createBoard = Joi.object<CreateBoardDto>({
  title: Joi.string()
    .trim()
    .min(BoardValidationRule.TITLE_MIN_LENGTH)
    .max(BoardValidationRule.TITLE_MAX_LENGTH)
    .required()
    .messages({
      'string.empty': BoardValidationMessage.TITLE_REQUIRED,
      'string.min': BoardValidationMessage.TITLE_MIN_LENGTH,
      'string.max': BoardValidationMessage.TITLE_MAX_LENGTH,
    }),
});

export { createBoard };
