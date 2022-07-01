import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { SignInUserDto } from '~/common/types/types';
import { signInUser } from '~/validation-schemas/validation-schemas';
import { useAppDispatch } from '~/hooks/hooks';
import { auth as authActions } from '~/store/actions';
import { FormattedMessage, TextInput } from '~/components/common/common';
import { AppRoute, InputName } from '~/common/enums/enums';
import styles from './styles.module.scss';
import { Button } from '~/components/common/button/button';

export const SignInForm: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, formState } = useForm<SignInUserDto>({
    resolver: joiResolver(signInUser),
  });
  const { login: loginError, password: passwordError } = formState.errors;

  const handleSignIn = (payload: SignInUserDto): void => {
    dispatch(authActions.signIn(payload));
  };

  const handleRedirect = (): void => {
    navigate(AppRoute.SIGN_UP);
  };

  return (
    <div className={styles['wrapper']}>
      <form
        className={styles['form-wrapper']}
        onSubmit={handleSubmit(handleSignIn)}
      >
        <FormattedMessage as="h1" message="auth.titles.signIn" />
        <TextInput
          className={styles['form-label']}
          title={'auth.inputs.login'}
          formRegisterValues={register(InputName.LOGIN)}
          errorMessage={loginError?.message}
        />
        <TextInput
          className={styles['form-label']}
          title={'auth.inputs.password'}
          formRegisterValues={register(InputName.PASSWORD)}
          errorMessage={passwordError?.message}
        />
        <Button
          className={styles['form-button']}
          title={'auth.buttons.signIn'}
        />
      </form>
      <div className={styles['message-container']}>
        <FormattedMessage as="span" message="auth.messages.dontHave" />
        <a className={styles['message-button']} onClick={handleRedirect}>
          <FormattedMessage as="span" message="auth.buttons.signUp" />
        </a>
      </div>
    </div>
  );
};
