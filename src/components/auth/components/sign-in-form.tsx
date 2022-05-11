import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { SignInUserDto } from '~/common/types/types';
import { signInUser } from '~/validation-schemas/validation-schemas';
import { useAppDispatch } from '~/hooks/hooks';
import { auth as authActions } from '~/store/actions';
import { useNavigate } from 'react-router-dom';
import { AppRoute, InputName } from '~/common/enums/enums';
import { TextInput } from './text-input';

export const SignInForm: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { register, handleSubmit, formState } = useForm<SignInUserDto>({
    resolver: joiResolver(signInUser),
  });
  const { login: loginError, password: passwordError } = formState.errors;

  const submit = async (userDto: SignInUserDto): Promise<void> => {
    await dispatch(authActions.signIn(userDto));
    navigate(AppRoute.ROOT);
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      <h2>Sign In</h2>
      <TextInput
        formRegisterValues={register(InputName.LOGIN)}
        errorMessage={loginError?.message}
      />
      <TextInput
        formRegisterValues={register(InputName.PASSWORD)}
        errorMessage={passwordError?.message}
      />
      <button>Sign In</button>
    </form>
  );
};
