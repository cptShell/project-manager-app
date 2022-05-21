import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { SignUpUserDto } from '~/common/types/types';
import { signUpUser } from '~/validation-schemas/validation-schemas';
import { useAppDispatch, useAppTranslation } from '~/hooks/hooks';
import { auth as authActions } from '~/store/actions';
import { FormattedMessage, TextInput } from '~/components/common/common';

export const SignUpForm: FC = () => {
  const { handleTranslate } = useAppTranslation();
  const dispatch = useAppDispatch();
  const { register, handleSubmit, formState } = useForm<SignUpUserDto>({
    resolver: joiResolver(signUpUser),
  });
  const {
    name: nameError,
    login: loginError,
    password: passwordError,
  } = formState.errors;

  const handleSignUp = (payload: SignUpUserDto): void => {
    dispatch(authActions.signUp(payload));
  };

  return (
    <form onSubmit={handleSubmit(handleSignUp)}>
      <FormattedMessage as="h2" message="auth.titles.singUp" />
      <TextInput
        formRegisterValues={register(handleTranslate('auth.inputs.name') as 'name')}
        errorMessage={nameError && handleTranslate('auth.inputs.errors.nameRequired')}
      />
      <TextInput
        formRegisterValues={register(handleTranslate('auth.inputs.login') as 'login')}
        errorMessage={loginError && handleTranslate('auth.inputs.errors.loginRequired')}
      />
      <TextInput
        formRegisterValues={register(handleTranslate('auth.inputs.password') as 'password')}
        errorMessage={passwordError && handleTranslate('auth.inputs.errors.passwordRequired')}
      />
      <FormattedMessage as="button" message="auth.buttons.signUp" />
    </form>
  );
};
