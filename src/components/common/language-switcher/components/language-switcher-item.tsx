import { FC } from 'react';
import { AppLanguage } from '~/common/enums/enums';

type Props = {
  label: AppLanguage;
  onLanguageChange: (language: AppLanguage) => void;
};

export const LanguageSwitcherItem: FC<Props> = ({ label, onLanguageChange }) => {
  return (
    <li><button onClick={():void => onLanguageChange(label)}>{ label }</button></li>
  );
};

