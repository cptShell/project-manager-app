import { joiResolver } from '@hookform/resolvers/joi';
import { FC, MouseEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { InputName } from '~/common/enums/enums';
import { SignUpUserDto } from '~/common/types/types';
import { FormattedMessage, TextInput } from '~/components/common/common';
import { useAppDispatch, useAppSelector } from '~/hooks/hooks';
import { user as userActions } from '~/store/actions';
import { signUpUser } from '~/validation-schemas/validation-schemas';
import Avatar from '~/assets/images/avatar.svg';
import styles from './styles.module.scss';
import { Button } from '~/components/common/button/button';

export const EditForm: FC = () => {
  const { id, name, login } = useAppSelector(({ auth }) => ({
    id: auth.user?.id,
    name: auth.user?.name,
    login: auth.user?.login,
  }));
  const dispatch = useAppDispatch();

  const [isEditMode, setIsEditMode] = useState(false);
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
    setIsEditMode(false);
  };

  const handleEditable = (e: MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    setIsEditMode(true);
  };

  return (
    <form
      className={styles['form-wrapper']}
      onSubmit={handleSubmit(handleEditUser)}
    >
      <div className={styles['avatar-wrapper']}>
        <img src={Avatar} alt="user avatar" />
      </div>

      {!isEditMode ? (
        <>
          <div className={styles['info-wrapper']}>
            <p>
              <FormattedMessage
                as="span"
                message="profile.userData.currentName"
                className={styles['title-info']}
              />
              <span>{name}</span>
            </p>
            <p>
              <FormattedMessage
                as="span"
                message="profile.userData.currentLogin"
                className={styles['title-info']}
              />
              <span>{login}</span>
            </p>
          </div>
          <Button
            title={'profile.editForm.buttons.editUser'}
            onClick={handleEditable}
            className={styles['form-button']}
          />
        </>
      ) : (
        <>
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
          <Button
            title={'profile.editForm.buttons.saveUser'}
            className={styles['form-button']}
          />
        </>
      )}
    </form>
  );
};
