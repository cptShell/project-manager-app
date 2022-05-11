export const switchModal: CallableFunction = (state: boolean, setState: React.Dispatch<React.SetStateAction<boolean>>) => {
  return (e?: React.MouseEvent) => {
    const isRightTarget = e?.target === e?.currentTarget;
    if (isRightTarget) {
      setState(!state);
    }
  };
};

// EXAMPLE OF PARENT COMPONENT

// export const Example: FC = () => {
//   const [isModal, setIsModal] = useState(false);
//   const handleClick = switchModal(isModal, setIsModal);
//   return (
//     <>
//       <button type='button' onClick={(e) => {handleClick(e)}} />
//       {isModal &&
//       <Modal onClick={handleClick}>
//         <ConfirmationMod callback={() => {console.log('You Agreed!')}} onResolve={handleClick} />  
//       </Modal>} 
//     </>
//   );
// };
