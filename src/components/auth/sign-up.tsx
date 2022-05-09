import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { SignUpUserDto } from '~/common/types/types';
import { signUpUser } from '~/validation-schemas/validation-schemas';

export const SignUp: FC = () => {
  const { register, handleSubmit, formState } = useForm<SignUpUserDto>({
    resolver: joiResolver(signUpUser),
  });
  const {
    name: nameError,
    login: loginError,
    password: passwordError,
  } = formState.errors;

  const submit = (userDto: SignUpUserDto): void => {
    console.log(userDto);
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      <h2>Sign Up</h2>
      <label>
        <p>Name</p>
        <input type="text" {...register('name')} />
        {nameError && <span>{nameError.message}</span>}
      </label>
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
      <button>Sign Up</button>
    </form>
  );
};
