import { AppRoute } from '~/common/enums/enums';
import { NavigationLink } from '~/common/types/types';
import { FormattedMessage } from '~/components/common/common';

export const AUTH_BUTTONS_DATA: Array<NavigationLink> = [
  {
    to: AppRoute.SIGN_IN,
    title: <FormattedMessage as={'span'} message={'welcome.buttons.signIn'}/>,
  },
  {
    to: AppRoute.SIGN_UP,
    title: <FormattedMessage as={'span'} message={'welcome.buttons.signUp'}/>,
  },
];

export const LOGGED_IN_BUTTONS_DATA: Array<NavigationLink> = [
  {
    to: AppRoute.MAIN,
    title: <FormattedMessage as={'span'} message={'welcome.buttons.mainPage'}/>,
  },
];
