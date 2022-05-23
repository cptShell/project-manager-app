import { joiResolver } from '@hookform/resolvers/joi';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { InputName } from '~/common/enums/enums';
import { SignUpUserDto } from '~/common/types/types';
import { FormattedMessage, TextInput } from '~/components/common/common';
import { useAppDispatch, useAppSelector } from '~/hooks/hooks';
import { user as userActions } from '~/store/actions';
import { signUpUser } from '~/validation-schemas/validation-schemas';

export const EditForm: FC = () => {
  const { id } = useAppSelector(({ auth }) => ({
    id: auth.user?.id,
  }));
  const dispatch = useAppDispatch();
  const { register, handleSubmit, formState } = useForm<SignUpUserDto>({
    resolver: joiResolver(signUpUser),
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
  };

  return (
    <form onSubmit={handleSubmit(handleEditUser)}>
      <FormattedMessage as="h2" message="profile.editForm.title" />
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
        <FormattedMessage as="span" message="profile.editForm.buttons.editUser" />
      </button>
    </form>
  );
};
