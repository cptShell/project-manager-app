import { FC } from 'react';
import { SignIn } from './sign-in';
import { SignUp } from './sign-up';

export const Auth: FC = () => {
  fetch('https://sheltered-reaches-82853.herokuapp.com/').then((res) =>
    console.log(res),
  );
  return (
    <div>
      <SignUp />
      <SignIn />
    </div>
  );
};
