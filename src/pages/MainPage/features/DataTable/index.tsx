import { Button, Space, Table } from 'antd';
import { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../app/store';
import { getAllAnimals } from '../../core/action-creator';
import styles from './index.module.scss';
import { columns, expandedRowRender, getPrimaryData } from './tableBuilder';
import { newDataPropsType } from './types';

const DataTable = ({ showDataModal }: newDataPropsType): ReactElement => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    //to be handled better with pagination element since values below are mock
    dispatch(getAllAnimals(1, 10));
  }, []);
  const animals = useSelector((state: RootState) => state.animals.animals);
  const handleOnCreateData = () => {
    showDataModal(true);
  };

  const primaryData = getPrimaryData(animals);

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
        expandable={{ expandedRowRender: () => expandedRowRender(animals) }}
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};
export default DataTable;
