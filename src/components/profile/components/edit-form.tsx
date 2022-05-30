import { joiResolver } from '@hookform/resolvers/joi';
import { FC, MouseEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { InputName } from '~/common/enums/enums';
import { SignUpUserDto } from '~/common/types/types';
import { FormattedMessage, TextInput } from '~/components/common/common';
import { useAppDispatch, useAppSelector } from '~/hooks/hooks';
import { user as userActions } from '~/store/actions';
import { signUpUser } from '~/validation-schemas/validation-schemas';
import styles from './styles.module.scss';

export const EditForm: FC = () => {
  const { id, name, login } = useAppSelector(({ auth }) => ({
    id: auth.user?.id,
    name: auth.user?.name,
    login: auth.user?.login,
  }));
  const dispatch = useAppDispatch();

  const [isEditable, setIsEditable] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const { register, handleSubmit, formState } = useForm<SignUpUserDto>({
    resolver: joiResolver(signUpUser),
    defaultValues: {
      name: name,
      login: login,
    },
  });
  const {
    name: nameError,
    login: loginError,
    password: passwordError,
  } = formState.errors;

  const handleEditUser = (user: SignUpUserDto): void => {
    if (id) {
      const payload = { id, user };

      dispatch(userActions.editAuthenticatedUser(payload));
    }
    setIsDisabled(true);
    setIsEditable(false);
  };

  const handleDisabled = (e: MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    setIsDisabled(false);
    setIsEditable(true);
  };

  return (
    <form
      className={styles['form-wrapper']}
      onSubmit={handleSubmit(handleEditUser)}
    >
      <FormattedMessage as="h1" message="profile.editForm.title" />
      <TextInput
        disabled={isDisabled}
        title={'auth.inputs.name'}
        formRegisterValues={register(InputName.NAME)}
        errorMessage={nameError?.message}
        className={styles['form-label']}
      />
      <TextInput
        disabled={isDisabled}
        title={'auth.inputs.login'}
        formRegisterValues={register(InputName.LOGIN)}
        errorMessage={loginError?.message}
        className={styles['form-label']}
      />
      <TextInput
        disabled={isDisabled}
        title={'auth.inputs.password'}
        formRegisterValues={register(InputName.PASSWORD)}
        errorMessage={passwordError?.message}
        className={styles['form-label']}
      />

      {!isEditable ? (
        <button onClick={handleDisabled} className={styles['form-button']}>
          <FormattedMessage
            as="span"
            message="profile.editForm.buttons.editUser"
          />
        </button>
      ) : (
        <FormattedMessage
          as="button"
          message="profile.editForm.buttons.saveUser"
          className={styles['form-button']}
        />
      )}
    </form>
  );
};
