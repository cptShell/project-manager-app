import { TeamMemberItem } from '../app/team-member-item.type';

export type WelcomeLocalizationKey = {
  buttons: {
    mainPage: string;
    signIn: string;
    signUp: string;
  };
  titleWelcome: string;
  aboutProject: string;
  titleCourse: string;
  aboutCourse: string;
  titleMembers: string;
  teamMembers: {
    item0: Omit<TeamMemberItem, 'avatar'>;
    item1: Omit<TeamMemberItem, 'avatar'>;
    item2: Omit<TeamMemberItem, 'avatar'>;
  };
};
