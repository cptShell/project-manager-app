import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { SignInUserDto } from '~/common/types/types';
import { signInUser } from '~/validation-schemas/validation-schemas';
import { useAppDispatch } from '~/hooks/hooks';
import { auth as authActions } from '~/store/actions';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '~/common/enums/enums';

export const SignIn: FC = () => {
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
      <label>
        <p>Login</p>
        <input type="text" {...register('login')} />
        {loginError && <span>{loginError.message}</span>}
      </label>
      <label>
        <p>Password</p>
        <input type="text" {...register('password')} />
        {passwordError && <span>{passwordError.message}</span>}
      </label>
      <button>Sign In</button>
    </form>
  );
};
