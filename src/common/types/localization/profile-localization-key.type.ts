export type ProfileLocalizationKey = {
  title: string;
  userData: {
    currentName: string;
    currentLogin: string;
  };
  buttons: {
    deleteUser: string;
  };
  editForm: {
    title: string;
    buttons: {
      editUser: string;
      saveUser: string;
    };
  };
};
