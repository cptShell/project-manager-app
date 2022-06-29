import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { AppRoute } from '~/common/enums/enums';
import { BoardCreatingForm } from '~/components/common/board-creating-form/board-creating-form';
import { useAppDispatch, useAppSelector } from '~/hooks/hooks';
import { auth as authActions } from '~/store/actions';
import { FormattedMessage } from '../common';
import { LanguageSwitcher } from '../language-switcher/language-switcher';
import styles from './styles.module.scss';
import plusImg from '~/assets/images/plus-purple.svg';
import avatarImg from '~/assets/images/avatar.svg';
import arrowImg from '~/assets/images/menu-arrow.svg';
import editImg from '~/assets/images/edit.svg';
import exitImg from '~/assets/images/exit.svg';
import logo from '~/assets/images/logo.svg';

export const Header: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const userName = useAppSelector((state) => state.auth.user?.name);
  const [isScrolled, setIsScrolled] = useState(!!window.pageYOffset);

  const handleScroll = (): void => {
    const isTop = window.pageYOffset !== 0;
    setIsScrolled(isTop);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleSignOut = (): void => {
    dispatch(authActions.signOut());
  };

  const handleEditUser = (): void => {
    navigate(AppRoute.PROFILE);
  };

  const handleOpenCreateBoard = (): void => {
    setIsOpen(true);
  };

  const handleCloseCreateBoard = (): void => {
    setIsOpen(false);
  };

  const handleRedirect = (): void => {
    navigate(AppRoute.WELCOME);
  };

  return (
    <header
      className={clsx(styles.header, {
        [styles.minimized]: isScrolled,
      })}
    >
      <div className={styles['header-container']}>
        <BoardCreatingForm isOpen={isOpen} onClose={handleCloseCreateBoard} />
        <div className={styles['header-left']} onClick={handleOpenCreateBoard}>
          <img
            onClick={handleRedirect}
            className={styles.logo}
            src={logo}
            alt="monitor logo"
          />
          <div className={styles['create-wrapper']}>
            <img
              className={styles['create-board-icon']}
              src={plusImg}
              alt="create board"
            />
            <FormattedMessage
              className={styles['create-board-span']}
              as="span"
              message="header.nav.createBoard"
            />
          </div>
        </div>
        <div className={styles['header-right']}>
          <LanguageSwitcher />
          <div className={styles['user']}>
            <div className={styles['user-container']}>
              <span className={styles['user-name']}>{userName}</span>
              <img
                className={styles['avatar-img']}
                src={avatarImg}
                alt="avatar"
              />
              <img
                className={styles['arrow-img']}
                src={arrowImg}
                alt="menu arrow"
              />
            </div>
            <div className={styles['user-menu']}>
              <div
                className={styles['user-menu-option']}
                onClick={handleEditUser}
              >
                <FormattedMessage
                  className={styles['user-menu-span']}
                  as="span"
                  message="header.nav.editUser"
                />
                <img
                  className={styles['edit-img']}
                  src={editImg}
                  alt="edit profile"
                />
              </div>
              <div
                className={styles['user-menu-option']}
                onClick={handleSignOut}
              >
                <FormattedMessage
                  className={styles['user-menu-span']}
                  as="span"
                  message="header.nav.signOut"
                />
                <img
                  className={styles['log-out-img']}
                  src={exitImg}
                  alt="log out"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
