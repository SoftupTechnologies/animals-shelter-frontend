import { Button, Space, Table } from 'antd';
import { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../app/store';
import { getAllAnimals } from '../../core/action-creator';
import styles from './index.module.scss';
import { expandedRowRender, columns, getPrimaryData } from './tableBuilder';
import { newDataPropsType } from './types';

const DataTable = ({ showDataModal }: newDataPropsType): ReactElement => {
  const dispatch = useDispatch<AppDispatch>();
  // const [pageNumber, setPageNumber] = useState(1);
  const pageSize = 9999;
  useEffect(() => {
    dispatch(getAllAnimals(1, pageSize));
  }, [dispatch]);
  const animals = useSelector((state: RootState) => state.animals.animals);
  const handleOnCreateData = () => {
    showDataModal(true);
  };

  const primaryData = getPrimaryData(animals, showDataModal, dispatch);

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
        scroll={{ y: 420 }}
        expandable={{
          expandedRowRender: (record) => expandedRowRender(animals, record),
        }}
        // pagination={{
        //   pageSize,
        // }}
      />
    </div>
  );
};
export default DataTable;
