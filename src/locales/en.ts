import { AppLocalizationMap } from '~/common/types/types';

export const ENMessagesMap: AppLocalizationMap = {
  main: {
    title: 'Hello',
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
      evgeny: {
        name: 'Evgeny',
        aboutMe: 'About me: Mock', 
        contribution: 'Contribution: Mock',
      }, 
      nickolas: {
        name: 'Nickolas',
        aboutMe: 'About me: Mock', 
        contribution: 'Contribution: Mock',
      }, 
      aleksei: {
        name: 'Alexei',
        aboutMe: 'About me: Mock', 
        contribution: 'Contribution: Mock',
      },
    },
  },
};
