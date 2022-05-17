import { joiResolver } from '@hookform/resolvers/joi';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { InputName } from '~/common/enums/enums';
import { SignUpUserDto } from '~/common/types/types';
import { TextInput } from '~/components/common/common';
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
      <h2>Edit user</h2>
      <TextInput
        formRegisterValues={register(InputName.NAME)}
        errorMessage={nameError?.message}
      />
      <TextInput
        formRegisterValues={register(InputName.LOGIN)}
        errorMessage={loginError?.message}
      />
      <TextInput
        formRegisterValues={register(InputName.PASSWORD)}
        errorMessage={passwordError?.message}
      />
      <button>Edit</button>
    </form>
  );
};
