import {
  BoardValidationRule,
  UserAuthValidationRule,
} from '~/common/enums/enums';
import { AppLocalizationMap } from '~/common/types/types';

export const RUMessagesMap: AppLocalizationMap = {
  header: {
    nav: {
      createBoard: 'Создать доску',
      editUser: 'Изменить пользователя',
      signOut: 'Выйти из аккаунта',
    },
  },
  modals: {
    confirmation: {
      deleteBoard: 'Вы уверены что хотите удалить эту доску?',
      deleteColumn: 'Вы уверены что хотите удалить эту колонку?',
      deleteTask: 'Вы уверены что хотите удалить это задание?',
      deleteUser: 'Вы уверены что хотите удалить свой аккаунт?',
      buttons: {
        confirm: 'Да',
        reject: 'Нет',
      },
    },
  },
  main: {
    title: 'Привет',
    boardCreatingForm: {
      title: 'Создание доски',
      inputs: {
        titles: {
          title: 'Название',
          description: 'Описание',
        },
      },
      buttons: {
        createBoard: 'Создать доску',
      },
    },
  },
  board: {
    title: 'Вы на странице',
    buttons: {
      addColumn: 'Добавить колонку',
      deleteColumn: 'Удалить колонку',
      backToMainPage: 'Назад на Главную страницу',
    },
    columnCreatingForm: {
      title: 'Создание колонки',
      inputs: {
        title: 'Название',
      },
      buttons: {
        createColumn: 'Создать колонку',
      },
    },
    taskCreatingForm: {
      title: 'Создание задачи',
      inputs: {
        title: 'Название',
        description: 'Описание',
      },
      buttons: {
        createTask: 'Создать задачу',
        editTask: 'Изменить задачу',
      },
    },
    boardItem: {
      buttons: {
        submit: 'Подтвердить',
        cancel: 'Отменить',
        addTask: 'Добавить задание',
      },
    },
    column: {
      buttons: {
        addTask: 'Добавить задание',
        deleteTask: 'Удалить задание',
      },
    },
  },
  auth: {
    titles: {
      singIn: 'Вход',
      singUp: 'Регистрация',
    },
    inputs: {
      name: 'Имя',
      login: 'Имя пользователя',
      password: 'Пароль',
    },
    buttons: {
      signIn: 'Войти',
      signUp: 'Зарегистрироваться',
    },
  },
  profile: {
    title: 'Настройки пользователя',
    userData: {
      currentId: 'Текущий Id:',
      currentName: 'Имя:',
      currentLogin: 'Имя пользователя:',
    },
    buttons: {
      deleteUser: 'Удалить пользователя',
    },
    editForm: {
      title: 'Изменить пользователя',
      buttons: {
        editUser: 'Редактировать',
      },
    },
  },
  welcome: {
    buttons: {
      mainPage: 'Главная страница',
      signIn: 'Вход',
      signUp: 'Регистрация',
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
    TypeScript
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
      titleRequired: 'Название обязательно',
      titleMaxLength: `Длинна должна быть не более ${BoardValidationRule.TITLE_MAX_LENGTH} символов`,
      descriptionRequired: 'Описание обязательно',
      descriptionMaxLength: `Длинна должна быть не более ${BoardValidationRule.DESCRIPTION_MAX_LENGTH} символов`,
    },
    user: {
      nameRequired: 'Имя обязательно',
      nameMinLength: `Длинна должна быть не менее ${UserAuthValidationRule.NAME_MIN_LENGTH} символов`,
      nameMaxLength: `Длинна должна быть не более ${UserAuthValidationRule.NAME_MAX_LENGTH} символов`,
      loginRequired: 'Имя пользователя обязателен',
      loginMinLength: `Длинна должна быть не менее ${UserAuthValidationRule.LOGIN_MIN_LENGTH} символов`,
      loginMaxLength: `Длинна должна быть не более ${UserAuthValidationRule.LOGIN_MAX_LENGTH} символов`,
      passwordRequired: 'Пароль обязателен',
      passwordMinLength: `Длинна должна быть не менее ${UserAuthValidationRule.PASSWORD_MIN_LENGTH} символов`,
      passwordMaxLength: `Длинна должна быть не более ${UserAuthValidationRule.PASSWORD_MAX_LENGTH} символов`,
    },
  },
};
