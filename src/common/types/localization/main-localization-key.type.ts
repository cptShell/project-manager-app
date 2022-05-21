export type MainLocalizationKey = {
  title: string,
  boardCreatingForm: {
    title: string
    inputs: {
      title: string,
      errors: {
        titleRequired: string,
        titleMinLength: string,
        titleMaxLength: string,
      }
    }
    buttons: {
      createBoard: string
    }
  }
};
