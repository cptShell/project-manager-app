import { FC } from 'react';
import { AppLanguage } from '~/common/enums/enums';
import { useAppTranslation } from '~/hooks/hooks';
import styles from './styles.module.scss';

type Props = {
  label: AppLanguage;
  onLanguageChange: (language: AppLanguage) => void;
};

export const LanguageSwitcherItem: FC<Props> = ({
  label,
  onLanguageChange,
}) => {
  const { currentLanguage } = useAppTranslation();
  const isActive = currentLanguage === label;
  const ifActive = isActive ? styles['button-active'] : styles.button;

  const handleLanguageChange = (): void => {
    onLanguageChange(label);
  };
  return (
    <li className={styles.wrapper}>
      <button className={ifActive} onClick={handleLanguageChange}>
        {label}
      </button>
    </li>
  );
};
