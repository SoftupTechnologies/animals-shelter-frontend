import { Footer } from 'antd/es/layout/layout';
import { useState } from 'react';
import AppHeader from '../features/AppHeader';
import DataModal from '../features/DataModal';
import DataTable from '../features/DataTable';
import styles from './index.module.scss';

const redHeartEmoji = '\u2764\uFE0F';

const MainPage = () => {
  const [isDataModalShown, showDataModal] = useState(false);
  return (
    <>
      <AppHeader />
      <div className={styles.mainContainer}>
        <DataTable showDataModal={showDataModal} />
      </div>
      {isDataModalShown ? <DataModal showDataModal={showDataModal} /> : null}
      <Footer style={{ textAlign: 'center' }}>
        {`Protect me Albania ©${new Date().getFullYear()} - Made with ${redHeartEmoji} by Softup Technologies`}
      </Footer>
    </>
  );
};
export default MainPage;
