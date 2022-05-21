import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { SignInUserDto } from '~/common/types/types';
import { signInUser } from '~/validation-schemas/validation-schemas';
import { useAppDispatch, useAppTranslation } from '~/hooks/hooks';
import { auth as authActions } from '~/store/actions';
import { FormattedMessage, TextInput } from '~/components/common/common';

export const SignInForm: FC = () => {
  const { handleTranslate } = useAppTranslation();
  const dispatch = useAppDispatch();
  const { register, handleSubmit, formState } = useForm<SignInUserDto>({
    resolver: joiResolver(signInUser),
  });
  const { login: loginError, password: passwordError } = formState.errors;

  const handleSignIn = (payload: SignInUserDto): void => {
    dispatch(authActions.signIn(payload));
  };

  return (
    <form onSubmit={handleSubmit(handleSignIn)}>
      <FormattedMessage as="h2" message="auth.titles.singIn" />
      <TextInput
        formRegisterValues={register(handleTranslate('auth.inputs.login') as 'login')}
        errorMessage={loginError && handleTranslate('auth.inputs.errors.loginRequired')}
      />
      <TextInput
        formRegisterValues={register(handleTranslate('auth.inputs.password') as 'password')}
        errorMessage={passwordError && handleTranslate('auth.inputs.errors.passwordRequired')}
      />
      <FormattedMessage as="button" message="auth.buttons.signIn" />
    </form>
  );
};
