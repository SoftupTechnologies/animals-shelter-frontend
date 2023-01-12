import { Footer } from 'antd/es/layout/layout';
import AppHeader from '../features/AppHeader';
import DataTable from '../features/DataTable';
import styles from './index.module.scss';

const redHeartEmoji = '\u2764\uFE0F';

const MainPage = () => {
  return (
    <div>
      <AppHeader />
      <div className={styles.mainContainer}>
        <DataTable />
      </div>

      <Footer style={{ textAlign: 'center' }}>
        {`Protect me Albania ©${new Date().getFullYear()} - Made with ${redHeartEmoji} by Softup Technologies`}
      </Footer>
    </div>
  );
};
export default MainPage;
