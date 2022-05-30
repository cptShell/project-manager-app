import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { SignUpUserDto } from '~/common/types/types';
import { signUpUser } from '~/validation-schemas/validation-schemas';
import { useAppDispatch } from '~/hooks/hooks';
import { auth as authActions } from '~/store/actions';
import { FormattedMessage, TextInput } from '~/components/common/common';
import { AppRoute, InputName } from '~/common/enums/enums';
import styles from './styles.module.scss';

export const SignUpForm: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
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

  const handleRedirect = (): void => {
    navigate(AppRoute.SIGN_IN);
  };

  return (
    <div className={styles['wrapper']}>
      <form
        className={styles['form-wrapper']}
        onSubmit={handleSubmit(handleSignUp)}
      >
        <FormattedMessage as="h1" message="auth.titles.signUp" />
        <TextInput
          title={'auth.inputs.name'}
          formRegisterValues={register(InputName.NAME)}
          errorMessage={nameError?.message}
          className={styles['form-label']}
        />
        <TextInput
          title={'auth.inputs.login'}
          formRegisterValues={register(InputName.LOGIN)}
          errorMessage={loginError?.message}
          className={styles['form-label']}
        />
        <TextInput
          title={'auth.inputs.password'}
          formRegisterValues={register(InputName.PASSWORD)}
          errorMessage={passwordError?.message}
          className={styles['form-label']}
        />
        <button className={styles['form-button']}>
          <FormattedMessage as="span" message="auth.buttons.signUp" />
        </button>
      </form>
      <div className={styles['message-container']}>
        <FormattedMessage as="span" message="auth.messages.alreadyHave" />
        <a className={styles['message-button']} onClick={handleRedirect}>
          <FormattedMessage as="span" message="auth.buttons.signIn" />
        </a>
      </div>
    </div>
  );
};
