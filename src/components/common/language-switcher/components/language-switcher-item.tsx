import { FC } from 'react';
import { AppLanguage } from '~/common/enums/enums';

type Props = {
  label: AppLanguage;
  onLanguageChange: (language: AppLanguage) => void;
};

export const LanguageSwitcherItem: FC<Props> = ({
  label,
  onLanguageChange,
}) => {
  const handleLanguageChange = (): void => {
    onLanguageChange(label);
  };

  return (
    <li>
      <button onClick={handleLanguageChange}>{label}</button>
    </li>
  );
};
