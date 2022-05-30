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
      signIn: 'Вход',
      signUp: 'Регистрация',
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
    messages: {
      dontHave: 'Нет учетной записи?',
      alreadyHave: 'Уже зарегистрированы?',
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
        saveUser: 'Применить изменения',
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
          'Всем привет, я Женя и я вкалываю 24/7 на этих курсах. В этом приложении занимался в основном: валидацией, авторизацией, CI/CD, DnD, доской, колонками, тасками, формами для создания тасок/колонок/досок, бесконечно долго реализовывал дополнительный функционал с переносом таски при переносе на другие карточки и превью на месте, где таска упадет при дропе.',
        contribution: 'Вклад: Mock',
      },
      item1: {
        name: 'Николай',
        aboutMe:
          'Добрый вечер мы с Украины! Меня зовут Николай, иногда сплю и играю в спортивную Мафию, остальное время пишу код(хорошо что вы его не увидите). Мой вклад в проект: функционал Board page, Main page, модуль локализации, часть АПИ сервисов, стили для футера, Welcome page, SignIn/SignOut page, User Profile page и модалок.',
        contribution: 'Вклад: Mock',
      },
      item2: {
        name: 'Алексей',
        aboutMe:
          'Интересуюсь веб разработкой уже около двух лет и почти год занят обучением в школе Rs-school. Прямо говоря, это был непростой путь, но по итогу я очень благодарен всем, кого на нем повстречал, и за каждый из уроков, которые я вынес. В проекте я приложил руку к визуальной составляющей, локализации, модальным окнам и логике обработки ошибок.',
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
