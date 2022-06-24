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
    title: 'Projects',
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
        owner: 'Owner',
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
      signIn: 'Sign In',
      signUp: 'Sign Up',
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
    messages: {
      dontHave: 'Don’t have an account?',
      alreadyHave: 'Already have an account?',
    },
  },
  profile: {
    title: 'User Settings',
    userData: {
      currentName: 'Name:',
      currentLogin: 'Login:',
    },
    buttons: {
      deleteUser: 'Delete an account',
    },
    editForm: {
      title: 'Edit Profile',
      buttons: {
        editUser: 'Edit',
        saveUser: 'Apply changes',
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
    TypeScript
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
          'Hello everyone, I am Zhenya and I work hard 24/7 on these courses. In this application, I mainly used: authentication, authorization, CI / CD, DnD, board, columns, tasks, forms for creating tasks / columns / boards, implemented additional functionality for an infinitely long time with the transfer of tasks when transferred to other cards and previews on the place where the task will fall when dropping.',
      },
      item1: {
        name: 'Nickolas',
        aboutMe:
          'Good evening, we are from Ukraine! My name is Nikolai, sometimes I sleep and play sports Mafia, the rest of the time I write code (it"s good that you won"t see it). My contribution to the project: the functionality of the Board page, Main page, localization module, part of the service API, styles for the footer, Welcome page, SignIn/SignOut page, User Profile page and modals.',
      },
      item2: {
        name: 'Alexei',
        aboutMe:
          'I have been interested in web development for about two years and have been studying at Rs-school for almost a year.  It was not an simple path, but in the end, I am very grateful to everyone I met and for all lesons I learned. In the project, I’ve had a hand in the component styling, localization, modal windows and error handling logic.',
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
      loginAlphanum: 'Login must only contain a-Z and 0-9',
    },
  },
};
