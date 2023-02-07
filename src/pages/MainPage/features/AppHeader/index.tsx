import React from 'react';
import { Button } from 'antd';
import styles from './index.module.scss';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../../../constants/routes';

const AppHeader: React.FC = () => {
  const navigate = useNavigate();
  const onLogout = () => {
    localStorage.removeItem('token');
    navigate(routes.LOG_IN);
  };
  return (
    <div className={styles.menuHeader}>
      <img
        src="/images/animal_shelter.png"
        alt="logo"
        className={styles.logoStyle}
      />
      <div className={styles.menuHeaderLeft}>
        <h1 className={styles.logoTitleLeftStyle}>
          Protect me Albania
          <span className={styles.logoTitleRightStyle}>
            - Animals Shelter Database
          </span>
        </h1>
      </div>
      <div className={styles.menuHeaderRight}>
        <Button
          type="primary"
          className={styles.logoutButtonStyle}
          onClick={() => onLogout()}
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default AppHeader;
