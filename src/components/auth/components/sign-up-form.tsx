import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { SignUpUserDto } from '~/common/types/types';
import { signUpUser } from '~/validation-schemas/validation-schemas';
import { useAppDispatch } from '~/hooks/hooks';
import { auth as authActions } from '~/store/actions';
import { FormattedMessage, TextInput } from '~/components/common/common';
import { InputName } from '~/common/enums/enums';

export const SignUpForm: FC = () => {
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
        title={'auth.inputs.name'}
        formRegisterValues={register(InputName.NAME)}
        errorMessage={nameError?.message}
      />
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
        <FormattedMessage as="span" message="auth.buttons.signUp" />
      </button>
    </form>
  );
};
