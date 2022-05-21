import { AppLocalizationMap } from '~/common/types/types';

export const RUMessagesMap: AppLocalizationMap = {
  header: {
    nav: {
      createBoard: 'Создание бордов',
      editUser: 'Настройки пользователя',
      signOut: 'Выйти из аккаунта',
    },
  },
  modals: {
    confirmation: {
      title: 'Вы уверены?',
      buttons: {
        confirm: 'Да',
        reject: 'Нет',
      },
    },
  },
  main: {
    title: 'Hello',
    boardCreatingForm: {
      title: 'Создание борда',
      inputs: {
        title: 'заглавие',
        errors: {
          titleRequired: 'заглавие обязательно',
        },
      },
      buttons: {
        createBoard: 'Создать',
      },
    },
  },
  auth: {
    titles: {
      singIn: 'Вход',
      singUp: 'Регестрация',
    },
    inputs: {
      name: 'имя',
      login: 'логин',
      password: 'пароль',
      errors: {
        nameRequired: 'имя обязательно',
        loginRequired: 'логин обязателен',
        passwordRequired: 'пароль обязателен',
      },
    },
    buttons: {
      signIn: 'Войти',
      signUp: 'Зарегистрироваться',
    },
  },
  welcome: {
    buttons: {
      mainPage: 'На Главную',
      signIn: 'Вход',
      signUp: 'Регестрация',
    },
    title: 'Добро пожаловать',
    aboutProject: `
    Это приложение предназначено для облегчения совместной работы в командах.
    Здесь вы можете планировать и распределять задачи, контролировать ход работы и экспериментировать.
    С этой страницы вы можете перейти на экран регистрации или,
    если вы уже наш пользователь, переходите сразу в рабочую область.
    `,
    aboutCourse: `
    Результаты перевода
    Это приложение было создано во время школьного курса React Rolling Scopes.
    Курс предназначен для новых студентов, обладающих знаниями
    и практическим опытом использования следующих технологий и инструментов:
    
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
        name: 'Евгений',
        aboutMe: 'О себе: Mock', 
        contribution: 'Вклад: Mock',
      }, 
      item1: {
        name: 'Николай',
        aboutMe: 'О себе: Mock', 
        contribution: 'Вклад: Mock',
      }, 
      item2: {
        name: 'Алексей',
        aboutMe: 'О себе: Mock', 
        contribution: 'Вклад: Mock',
      },
    },
  },
};
