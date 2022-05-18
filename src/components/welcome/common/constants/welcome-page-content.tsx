import { FormattedMessage } from '~/components/common/common';

export const info = {
  aboutProject: <FormattedMessage as={'p'} message={'welcome.aboutProject'}/>,
  aboutCourse: <FormattedMessage as={'p'} message={'welcome.aboutCourse'}/>,
  teamMembers: [
    {
      avatar: 'src/assets/images/team-members-avas/Zhenya.jpg',
      name: <FormattedMessage as={'h3'} message={'welcome.teamMembers.evgeny.name'}/>,
      aboutMe: <FormattedMessage as={'p'} message={'welcome.teamMembers.evgeny.aboutMe'}/>,
      contribution: <FormattedMessage as={'p'} message={'welcome.teamMembers.evgeny.contribution'}/>,
    },
    {
      avatar: 'src/assets/images/team-members-avas/Kolya.jpg',
      name: <FormattedMessage as={'h3'} message={'welcome.teamMembers.nickolas.name'}/>,
      aboutMe: <FormattedMessage as={'p'} message={'welcome.teamMembers.nickolas.aboutMe'}/>,
      contribution: <FormattedMessage as={'p'} message={'welcome.teamMembers.nickolas.contribution'}/>,
    }, 
    {
      avatar: 'src/assets/images/team-members-avas/Lyosha.jpg',
      name: <FormattedMessage as={'h3'} message={'welcome.teamMembers.aleksei.name'}/>,
      aboutMe: <FormattedMessage as={'p'} message={'welcome.teamMembers.aleksei.aboutMe'}/>,
      contribution: <FormattedMessage as={'p'} message={'welcome.teamMembers.aleksei.contribution'}/>,
    },
  ],
};
