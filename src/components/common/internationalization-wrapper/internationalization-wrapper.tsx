import { FC, ReactNode } from 'react';
import { internationalization } from '~/services/services';

type Props = {
  children: ReactNode
};

const InternationalizationProvider = internationalization.provider;

export const InternationalizationWrapper: FC<Props> = ({ children }) => {

  return <InternationalizationProvider i18n={internationalization.instance}>{children}</InternationalizationProvider>;
};
