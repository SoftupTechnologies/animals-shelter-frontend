import React from 'react';
import { Button } from 'antd';
import styles from './index.module.scss';

const AppHeader: React.FC = () => {
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
          //   onClick={() => navigate('/logout')}
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default AppHeader;
