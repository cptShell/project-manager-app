import { BoardValidationRule, UserAuthValidationRule } from '~/common/enums/enums';
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
    },
    buttons: {
      signIn: 'Войти',
      signUp: 'Зарегистрироваться',
    },
  },
  profile: {
    title: 'Настройки пользователя',
    userData: {
      currentId: 'текущий Id:',
      currentName: 'имя:',
      currentLogin: 'логин:',
    },
    buttons: {
      deleteUser: 'Удалить пользователя',
    },
    editForm: {
      title: 'Правка пользователя',
      buttons: {
        editUser: 'Изменить',
      },
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
  validationMessages: {
    board: {
      titleRequired: 'заглавие обязательно',
      titleMinLength: `Длинна должна быть не менее ${BoardValidationRule.TITLE_MIN_LENGTH} символов`,
      titleMaxLength: `Длинна должна быть не более ${BoardValidationRule.TITLE_MAX_LENGTH} символов`,
    },
    user: {
      nameRequired: 'имя обязательно',
      nameMinLength: `Длинна должна быть не менее ${UserAuthValidationRule.NAME_MIN_LENGTH} символов`,
      nameMaxLength: `Длинна должна быть не более ${UserAuthValidationRule.NAME_MAX_LENGTH} символов`,
      loginRequired: 'логин обязателен',
      loginMinLength: `Длинна должна быть не менее ${UserAuthValidationRule.LOGIN_MIN_LENGTH} символов`,
      loginMaxLength: `Длинна должна быть не более ${UserAuthValidationRule.LOGIN_MAX_LENGTH} символов`,
      passwordRequired: 'пароль обязателен',
      passwordMinLength: `Длинна должна быть не менее ${UserAuthValidationRule.NAME_MIN_LENGTH} символов`,
      passwordMaxLength: `Длинна должна быть не более ${UserAuthValidationRule.NAME_MAX_LENGTH} символов`,
    },
  },
};
