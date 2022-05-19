import Joi from 'joi';
import {
  CreateBoardValidationMessage,
  CreateBoardValidationRule,
} from '~/common/enums/enums';
import { CreateBoardDto } from '~/common/types/types';

const createBoard = Joi.object<CreateBoardDto>({
  title: Joi.string()
    .trim()
    .min(CreateBoardValidationRule.TITLE_MIN_LENGTH)
    .max(CreateBoardValidationRule.TITLE_MAX_LENGTH)
    .required()
    .messages({
      'string.empty': CreateBoardValidationMessage.TITLE_REQUIRED,
      'string.min': CreateBoardValidationMessage.TITLE_MIN_LENGTH,
      'string.max': CreateBoardValidationMessage.TITLE_MAX_LENGTH,
    }),
});

export { createBoard };
