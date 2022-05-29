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
  taskCreatingForm: {
    title: string
    inputs: {
      title: string,
      description: string,
    },
    buttons: {
      createTask: string,
    },
  },
  boardItem: {
    buttons: {
      submit: string,
      cancel: string,
      addTask: string,
    }
  },
  column: {
    buttons: {
      addTask: string,
      deleteTask: string,
    }
  }
};
