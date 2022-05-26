export type ValidationMessagesLocalizationKey = {
  board: {
    titleRequired: string,
    titleMaxLength: string,
    descriptionRequired: string,
    descriptionMaxLength: string,
  },
  user: {
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
};
