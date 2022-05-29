import {
  BoardValidationRule,
  UserAuthValidationRule,
} from '~/common/enums/enums';
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
    title: 'Привет',
    boardCreatingForm: {
      title: 'Создание борда',
      inputs: {
        titles: {
          title: 'заглавие',
          description: 'описание',
        },
      },
      buttons: {
        createBoard: 'Создать',
      },
    },
  },
  board: {
    title: 'Вы на странице',
    buttons: {
      addColumn: 'Добавть колонку',
      deleteColumn: 'Удалить колонку',
      backToMainPage: 'Назад на Главную',
    },
    columnCreatingForm: {
      title: 'Создание колонок',
      inputs: {
        title: 'Заглавие',
      },
      buttons: {
        createColumn: 'создать колонку',
      },
    },
    taskCreatingForm: {
      title: 'Создание тасков',
      inputs: {
        title: 'заглавие',
        description: 'описание',
      },
      buttons: {
        createTask: 'создать таск',
      },
    },
    boardItem: {
      buttons: {
        submit: 'отправить',
        cancel: 'отменить',
        addTask: 'добавить таск',
      },
    },
    column: {
      buttons: {
        addTask: 'добавить таск',
        deleteTask: 'удалить таск',
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
    titleWelcome: 'Добро пожаловать!',
    aboutProject: `
    Это приложение предназначено для облегчения совместной работы в командах.
    Здесь вы можете планировать и распределять задачи, контролировать ход работы и экспериментировать.
    С этой страницы вы можете перейти на экран регистрации или,
    если вы уже наш пользователь, переходите сразу в рабочую область.
    `,
    titleCourse: 'Курс',
    aboutCourse: `
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
    titleMembers: 'Наша команда',
    teamMembers: {
      item0: {
        name: 'Евгений',
        aboutMe:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed arcu quam, euismod nec mi nec, scelerisque convallis neque. Pellentesque egestas eros vitae nunc efficitur consectetur. Phasellus auctor volutpat posuere. Donec porta rutrum arcu, in pretium turpis convallis vitae. Aliquam erat volutpat. Etiam pellentesque magna et tincidunt elementum. Vestibulum eu nulla mi. In dui nunc, lobortis id vulputate et, mattis vitae nibh.',
        contribution: 'Вклад: Mock',
      },
      item1: {
        name: 'Николай',
        aboutMe:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed arcu quam, euismod nec mi nec, scelerisque convallis neque. Pellentesque egestas eros vitae nunc efficitur consectetur. Phasellus auctor volutpat posuere. Donec porta rutrum arcu, in pretium turpis convallis vitae. Aliquam erat volutpat. Etiam pellentesque magna et tincidunt elementum. Vestibulum eu nulla mi. In dui nunc, lobortis id vulputate et, mattis vitae nibh.',
        contribution: 'Вклад: Mock',
      },
      item2: {
        name: 'Алексей',
        aboutMe:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed arcu quam, euismod nec mi nec, scelerisque convallis neque. Pellentesque egestas eros vitae nunc efficitur consectetur. Phasellus auctor volutpat posuere. Donec porta rutrum arcu, in pretium turpis convallis vitae. Aliquam erat volutpat. Etiam pellentesque magna et tincidunt elementum. Vestibulum eu nulla mi. In dui nunc, lobortis id vulputate et, mattis vitae nibh.',
        contribution: 'Вклад: Mock',
      },
    },
  },
  validationMessages: {
    board: {
      titleRequired: 'заглавие обязательно',
      titleMaxLength: `Длинна должна быть не более ${BoardValidationRule.TITLE_MAX_LENGTH} символов`,
      descriptionRequired: 'Описание обязательно',
      descriptionMaxLength: `Длинна должна быть не более ${BoardValidationRule.DESCRIPTION_MAX_LENGTH} символов`,
    },
    user: {
      nameRequired: 'имя обязательно',
      nameMinLength: `Длинна должна быть не менее ${UserAuthValidationRule.NAME_MIN_LENGTH} символов`,
      nameMaxLength: `Длинна должна быть не более ${UserAuthValidationRule.NAME_MAX_LENGTH} символов`,
      loginRequired: 'логин обязателен',
      loginMinLength: `Длинна должна быть не менее ${UserAuthValidationRule.LOGIN_MIN_LENGTH} символов`,
      loginMaxLength: `Длинна должна быть не более ${UserAuthValidationRule.LOGIN_MAX_LENGTH} символов`,
      passwordRequired: 'пароль обязателен',
      passwordMinLength: `Длинна должна быть не менее ${UserAuthValidationRule.PASSWORD_MIN_LENGTH} символов`,
      passwordMaxLength: `Длинна должна быть не более ${UserAuthValidationRule.PASSWORD_MAX_LENGTH} символов`,
    },
  },
};
