import {
  BoardValidationRule,
  UserAuthValidationRule,
} from '~/common/enums/enums';
import { AppLocalizationMap } from '~/common/types/types';

export const ENMessagesMap: AppLocalizationMap = {
  header: {
    nav: {
      createBoard: 'Create board',
      editUser: 'Edit user',
      signOut: 'Sign out',
    },
  },
  modals: {
    confirmation: {
      deleteBoard: 'Are you sure you want to delete this board?',
      deleteColumn: 'Are you sure you want to delete this column?',
      deleteTask: 'Are you sure you want to delete this task?',
      deleteUser: 'Are you sure you want to delete your account?',
      buttons: {
        confirm: 'Yes',
        reject: 'No',
      },
    },
  },
  main: {
    title: 'Hello',
    boardCreatingForm: {
      title: 'Board creating form',
      inputs: {
        titles: {
          title: 'Title',
          description: 'Description',
        },
      },
      buttons: {
        createBoard: 'Create board',
      },
    },
  },
  board: {
    title: 'You are on page',
    buttons: {
      addColumn: 'Add column',
      deleteColumn: 'Delete column',
      backToMainPage: 'Back to Main Page',
    },
    columnCreatingForm: {
      title: 'Column creating form',
      inputs: {
        title: 'Title',
      },
      buttons: {
        createColumn: 'Create column',
      },
    },
    taskCreatingForm: {
      title: 'Task creating',
      inputs: {
        title: 'Title',
        description: 'Description',
      },
      buttons: {
        createTask: 'Create task',
        editTask: 'Edit task',
      },
    },
    boardItem: {
      buttons: {
        submit: 'Submit',
        cancel: 'Cancel',
        addTask: 'Add task',
      },
    },
    column: {
      buttons: {
        addTask: 'Add task',
        deleteTask: 'Delete task',
      },
    },
  },
  auth: {
    titles: {
      singIn: 'Sign In',
      singUp: 'Sign Up',
    },
    inputs: {
      name: 'Name',
      login: 'Login',
      password: 'Password',
    },
    buttons: {
      signIn: 'Sign In',
      signUp: 'Sign Up',
    },
  },
  profile: {
    title: 'User Settings',
    userData: {
      currentId: 'Current Id:',
      currentName: 'Name:',
      currentLogin: 'Login:',
    },
    buttons: {
      deleteUser: 'Delete User',
    },
    editForm: {
      title: 'Edit user',
      buttons: {
        editUser: 'Edit',
      },
    },
  },
  welcome: {
    buttons: {
      mainPage: 'Main Page',
      signIn: 'Sign In',
      signUp: 'Sign Up',
    },
    titleWelcome: 'Welcome!',
    aboutProject: `
    This application is designed to help facilitate collaboration in teams. 
    Here you can plan and distribute tasks, control the progress of work and experiment.
    From this page you can go to the registration screen or, 
    if you are already our user, go directly to the workspace.
    `,
    titleCourse: 'Course',
    aboutCourse: `
    This application was created during the school's React Rolling Scopes course. 
    The course is intended for new students who have knowledge and practical 
    experience in using the following technologies and tools:
    
    JavaScript
    typescript
    Git, GitHub (clone, add, commit, push, pull, merge, rebase, work with Pull Request)
    npm, webpack
    CSS3 / HTML5
    Chrome DevTools Figma
    Understanding the concept of REST API
    `,
    titleMembers: 'Our team',
    teamMembers: {
      item0: {
        name: 'Evgeny',
        aboutMe:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed arcu quam, euismod nec mi nec, scelerisque convallis neque. Pellentesque egestas eros vitae nunc efficitur consectetur. Phasellus auctor volutpat posuere. Donec porta rutrum arcu, in pretium turpis convallis vitae. Aliquam erat volutpat. Etiam pellentesque magna et tincidunt elementum. Vestibulum eu nulla mi. In dui nunc, lobortis id vulputate et, mattis vitae nibh.',
        contribution: 'Contribution: Mock',
      },
      item1: {
        name: 'Nickolas',
        aboutMe:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed arcu quam, euismod nec mi nec, scelerisque convallis neque. Pellentesque egestas eros vitae nunc efficitur consectetur. Phasellus auctor volutpat posuere. Donec porta rutrum arcu, in pretium turpis convallis vitae. Aliquam erat volutpat. Etiam pellentesque magna et tincidunt elementum. Vestibulum eu nulla mi. In dui nunc, lobortis id vulputate et, mattis vitae nibh.',
        contribution: 'Contribution: Mock',
      },
      item2: {
        name: 'Alexei',
        aboutMe:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed arcu quam, euismod nec mi nec, scelerisque convallis neque. Pellentesque egestas eros vitae nunc efficitur consectetur. Phasellus auctor volutpat posuere. Donec porta rutrum arcu, in pretium turpis convallis vitae. Aliquam erat volutpat. Etiam pellentesque magna et tincidunt elementum. Vestibulum eu nulla mi. In dui nunc, lobortis id vulputate et, mattis vitae nibh.',
        contribution: 'Contribution: Mock',
      },
    },
  },
  validationMessages: {
    board: {
      titleRequired: 'Title is required',
      titleMaxLength: `Title must be max ${BoardValidationRule.TITLE_MAX_LENGTH} characters`,
      descriptionRequired: 'Description cannot be empty',
      descriptionMaxLength: `Description must be max ${BoardValidationRule.DESCRIPTION_MAX_LENGTH} characters`,
    },
    user: {
      nameRequired: 'Name is required',
      nameMinLength: `Name must be at least ${UserAuthValidationRule.NAME_MIN_LENGTH} characters`,
      nameMaxLength: `Name must be max ${UserAuthValidationRule.NAME_MAX_LENGTH} characters`,
      loginRequired: 'Login is required',
      loginMinLength: `Login must be at least ${UserAuthValidationRule.LOGIN_MIN_LENGTH} characters`,
      loginMaxLength: `Login must be max ${UserAuthValidationRule.LOGIN_MAX_LENGTH} characters`,
      passwordRequired: 'Password is required',
      passwordMinLength: `Password must be at least ${UserAuthValidationRule.PASSWORD_MIN_LENGTH} characters`,
      passwordMaxLength: `Password must be max ${UserAuthValidationRule.PASSWORD_MAX_LENGTH} characters`,
    },
  },
};
