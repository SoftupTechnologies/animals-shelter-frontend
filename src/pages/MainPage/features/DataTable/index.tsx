import { Button, Input, Space, Table } from 'antd';
import { ReactElement, useEffect, useState } from 'react';
import { BiAddToQueue } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../app/store';
import { getAllAnimals } from '../../core/action-creator';
import styles from './index.module.scss';
import { expandedRowRender, columns, getPrimaryData } from './tableBuilder';
import { newDataPropsType } from './types';

const DataTable = ({ showDataModal }: newDataPropsType): ReactElement => {
  const dispatch = useDispatch<AppDispatch>();
  const [searchTable, setSearchTable] = useState('');
  const { Search } = Input;
  // const [pageNumber, setPageNumber] = useState(1);
  const pageSize = 9999;
  useEffect(() => {
    dispatch(getAllAnimals(1, 9999));
  }, [dispatch]);
  const animals = useSelector((state: RootState) => state.animals.animals);
  const handleOnCreateData = () => {
    showDataModal(true);
  };

  const primaryData = getPrimaryData(animals, showDataModal, dispatch);

  return (
    <div className={styles.mainPageWrapper}>
      <Space style={{ marginBottom: 15, justifyContent: 'space-between' }}>
        <Button type="primary" onClick={() => handleOnCreateData()}>
          <BiAddToQueue />
          Add new data
        </Button>
        <Search
          placeholder="Search with Breed or Origin"
          size="middle"
          allowClear
          loading={false}
          onSearch={(value) => {
            setSearchTable(value);
          }}
        />
      </Space>
      <Table
        className={styles.mainTable}
        columns={columns(searchTable)}
        dataSource={primaryData}
        scroll={{ y: 420 }}
        expandable={{
          expandedRowRender: (record) => (
            <span style={{ margin: 0 }}>
              {expandedRowRender(animals, record)}
            </span>
          ),
        }}
        pagination={{
          pageSize,
        }}
      />
    </div>
  );
};
export default DataTable;
