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
      nameMinLength: string,
      nameMaxLength: string,
      loginRequired: string,
      loginMinLength: string,
      loginMaxLength: string,
      passwordRequired: string,
      passwordMinLength: string,
      passwordMaxLength: string,
    }
  },
  buttons: {
    signIn: string
    signUp: string
  }
};
  