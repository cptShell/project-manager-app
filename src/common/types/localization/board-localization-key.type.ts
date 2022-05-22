export type BoardLocalizationKey = {
  title: string,
  buttons: {
    addColumn: string,
    deleteColumn: string,
    backToMainPage: string
  },
  columnCreatingForm: {
    title: string
    inputs: {
      title: string,
    },
    buttons: {
      createColumn: string
    },
  },
};
