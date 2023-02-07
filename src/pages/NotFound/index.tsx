import { Button } from 'antd';
import { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { routes } from '../../constants/routes';
import styles from './index.module.scss';

const NotFound = (): ReactElement => {
  return (
    <div className={styles.notFoundWrapper}>
      <img
        className={styles.notFoundLogo}
        src="/images/dog.png"
        alt="logo-shelter"
      />
      <h1 className={styles.notFoundTitle}>I'm lost! Can't find the page.</h1>
      <Button type="primary" size="large" className={styles.notFoundButton}>
        <Link to={routes.APP_DASHBOARD} className={styles.notFoundButtonLink}>
          Go to main page
        </Link>
      </Button>
    </div>
  );
};

export default NotFound;
