type teamMember = {
  name: string,
  aboutMe: string,
  contribution: string,
};

type buttons = {
  mainPage: string
  signIn: string
  signUp: string
};

export type WelcomeLocalizationKey = {
  title: string,
  aboutProject: string,
  aboutCourse: string,
  teamMembers: {
    evgeny: teamMember,
    nickolas: teamMember,
    aleksei: teamMember
  },
  buttons: buttons
};
  