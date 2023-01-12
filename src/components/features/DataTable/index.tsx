import { Button, Space, Table } from 'antd';
import styles from './index.module.scss';
import { columns, expandedRowRender, primaryData } from './tableBuilder';

const DataTable = () => {
  return (
    <div className={styles.mainPageWrapper}>
      <Space style={{ marginBottom: 16 }}>
        <Button type="primary" className={styles.logoutButtonStyle}>
          Add new data
        </Button>
      </Space>
      <Table
        className={styles.mainTable}
        columns={columns}
        dataSource={primaryData}
        expandable={{ expandedRowRender }}
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};
export default DataTable;
