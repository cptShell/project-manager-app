import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { SignInUserDto } from '~/common/types/types';
import { signInUser } from '~/validation-schemas/validation-schemas';
import { useAppDispatch } from '~/hooks/hooks';
import { auth as authActions } from '~/store/actions';
import { FormattedMessage, TextInput } from '~/components/common/common';
import { InputName } from '~/common/enums/enums';
import { LanguageSwitcher } from '~/components/common/language-switcher/language-switcher';

export const SignInForm: FC = () => {
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
        title={'auth.inputs.login'}
        formRegisterValues={register(InputName.LOGIN)}
        errorMessage={loginError?.message}
      />
      <TextInput
        title={'auth.inputs.password'}
        formRegisterValues={register(InputName.PASSWORD)}
        errorMessage={passwordError?.message}
      />
      <button>
        <FormattedMessage as="span" message="auth.buttons.signIn" />
      </button>
      <LanguageSwitcher />
    </form>
  );
};
