import { AppRoute } from '~/common/enums/enums';
import { NavigationLink } from '~/common/types/types';
import img0 from '~/assets/images/team-members-avas/Zhenya.jpg';
import img1 from '~/assets/images/team-members-avas/Kolya.jpg';
import img2 from '~/assets/images/team-members-avas/Lyosha.jpg';
import { TeamMemberItem } from '~/common/types/app/team-member-item.type';

export const AUTH_BUTTONS_DATA: Array<NavigationLink> = [
  {
    to: AppRoute.SIGN_IN,
    title: 'welcome.buttons.signIn',
  },
  {
    to: AppRoute.SIGN_UP,
    title: 'welcome.buttons.signUp',
  },
];

export const LOGGED_IN_BUTTONS_DATA: Array<NavigationLink> = [
  {
    to: AppRoute.MAIN,
    title: 'welcome.buttons.mainPage',
  },
];

export const TEAM_MEMBERS_PAYLOAD: Array<TeamMemberItem> = [
  {
    avatar: img0,
    name: 'welcome.teamMembers.item0.name',
    aboutMe: 'welcome.teamMembers.item0.aboutMe', 
    contribution: 'welcome.teamMembers.item0.contribution',
  },
  {
    avatar: img1,
    name: 'welcome.teamMembers.item1.name',
    aboutMe: 'welcome.teamMembers.item1.aboutMe', 
    contribution: 'welcome.teamMembers.item1.contribution',
  },
  {
    avatar: img2,
    name: 'welcome.teamMembers.item2.name',
    aboutMe: 'welcome.teamMembers.item2.aboutMe', 
    contribution: 'welcome.teamMembers.item2.contribution',
  },
];
