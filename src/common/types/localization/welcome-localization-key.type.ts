import { teamMember } from '../team-member/team-member';

export type WelcomeLocalizationKey = {
  buttons: {
    mainPage: string
    signIn: string
    signUp: string
  }
  title: string,
  aboutProject: string,
  aboutCourse: string,
  teamMembers: {
    item0: teamMember,
    item1: teamMember,
    item2: teamMember
  },
};
  