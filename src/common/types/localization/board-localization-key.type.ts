export type BoardLocalizationKey = {
  buttons: {
    addColumn: string;
    deleteColumn: string;
    backToMainPage: string;
  };
  columnCreatingForm: {
    title: string;
    inputs: {
      title: string;
    };
    buttons: {
      createColumn: string;
    };
  };
  taskCreatingForm: {
    title: string;
    inputs: {
      title: string;
      description: string;
    };
    buttons: {
      createTask: string;
      editTask: string;
    };
  };
  boardItem: {
    buttons: {
      submit: string;
      cancel: string;
      addTask: string;
    };
  };
  column: {
    buttons: {
      addTask: string;
      deleteTask: string;
    };
  };
};
