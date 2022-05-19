import { TeamMemberItem } from '../app/team-member-item.type';

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
    item0: Partial<TeamMemberItem>,
    item1: Partial<TeamMemberItem>,
    item2: Partial<TeamMemberItem>,
  },
};
  