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
      title: 'Are you sure?',
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
        title: 'title',
        errors: {
          titleRequired: 'title is required',
        },
      },
      buttons: {
        createBoard: 'Create board',
      },
    },
  },
  auth: {
    titles: {
      singIn: 'Sign In',
      singUp: 'Sign Up',
    },
    inputs: {
      name: 'name',
      login: 'login',
      password: 'password',
      errors: {
        nameRequired: 'name is required',
        loginRequired: 'login is required',
        passwordRequired: 'password is required',
      },
    },
    buttons: {
      signIn: 'Sign In',
      signUp: 'Sign Up',
    },
  },
  welcome: {
    buttons: {
      mainPage: 'Main Page',
      signIn: 'Sign In',
      signUp: 'Sign Up',
    },
    title: 'Welcome',
    aboutProject: `
    This application is designed to help facilitate collaboration in teams. 
    Here you can plan and distribute tasks, control the progress of work and experiment.
    From this page you can go to the registration screen or, 
    if you are already our user, go directly to the workspace.
    `,
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
    teamMembers: {
      item0: {
        name: 'Evgeny',
        aboutMe: 'About me: Mock', 
        contribution: 'Contribution: Mock',
      }, 
      item1: {
        name: 'Nickolas',
        aboutMe: 'About me: Mock', 
        contribution: 'Contribution: Mock',
      }, 
      item2: {
        name: 'Alexei',
        aboutMe: 'About me: Mock',
        contribution: 'Contribution: Mock',
      },
    },
  },
};
