export type AuthLocalizationKey = {
  titles: {
    singIn: string,
    singUp: string,
  }
  inputs: {
    name: string,
    login: string,
    password: string,
    errors: {
      nameRequired: string,
      loginRequired: string,
      passwordRequired: string,
    }
  },
  buttons: {
    signIn: string
    signUp: string
  }
};
  