import { Button, Space, Table } from 'antd';
import { ReactElement } from 'react';
import styles from './index.module.scss';
import { columns, expandedRowRender, primaryData } from './tableBuilder';
import { newDataPropsType } from './types';

const DataTable = ({ showDataModal }: newDataPropsType): ReactElement => {
  const handleOnCreateData = () => {
    showDataModal(true);
  };
  return (
    <div className={styles.mainPageWrapper}>
      <Space style={{ marginBottom: 16 }}>
        <Button type="primary" onClick={() => handleOnCreateData()}>
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
