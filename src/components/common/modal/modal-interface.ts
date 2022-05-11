export const switchModal: CallableFunction = (state: boolean, setState: React.Dispatch<React.SetStateAction<boolean>>) => {
  return (e?: React.MouseEvent) => {
    const isRightTarget = e?.target === e?.currentTarget;
    if (isRightTarget) {
      setState(!state);
    }
  };
};
