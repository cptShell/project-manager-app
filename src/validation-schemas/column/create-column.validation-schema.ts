import Joi from 'joi';
import { CreateColumnMessage, CreateColumnRule } from '~/common/enums/enums';
import { CreateColumnDto } from '~/common/types/types';

const signInUser = Joi.object<CreateColumnDto>({
  title: Joi.string()
    .trim()
    .min(CreateColumnRule.TITLE_MIN_LENGTH)
    .max(CreateColumnRule.TITLE_MAX_LENGTH)
    .required()
    .messages({
      'string.empty': CreateColumnMessage.TITLE_REQUIRED,
      'string.min': CreateColumnMessage.TITLE_MIN_LENGTH,
      'string.max': CreateColumnMessage.TITLE_MAX_LENGTH,
    }),
  order: Joi.number().positive().integer().required().messages({
    'string.empty': CreateColumnMessage.ORDER_REQUIRED,
    'string.integer': CreateColumnMessage.ORDER_INTEGER,
    'string.positive': CreateColumnMessage.ORDER_POSITIVE,
  }),
});

export { signInUser };
