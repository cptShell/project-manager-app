import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { SignInUserDto } from '~/common/types/types';
import { signInUser } from '~/validation-schemas/validation-schemas';

export const SignIn: FC = () => {
  const { register, handleSubmit, formState } = useForm<SignInUserDto>({
    resolver: joiResolver(signInUser),
  });
  const { login: loginError, password: passwordError } = formState.errors;

  const submit = (userDto: SignInUserDto): void => {
    console.log(userDto);
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
