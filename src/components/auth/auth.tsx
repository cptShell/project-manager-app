import { FC } from 'react';

export const Auth: FC = () => {
  fetch('https://sheltered-reaches-82853.herokuapp.com/').then((res) =>
    console.log(res),
  );
  return <div>Hello</div>;
};
