import { Badge, Space, Table, Image, Popconfirm } from 'antd';
import type { TableColumnsType } from 'antd';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { DataType, ExpandedDataType } from './types';
import styles from './index.module.scss';

const confirm = () => {
  console.log('Clicked on Yes.');
};

export const columns: TableColumnsType<DataType> = [
  { title: 'Breed', dataIndex: 'breed', key: 'breed' },
  { title: 'Origin', dataIndex: 'origin', key: 'origin' },
  { title: 'Gender', dataIndex: 'gender', key: 'gender' },
  { title: 'Age', dataIndex: 'age', key: 'age' },
  {
    title: 'Chipped',
    dataIndex: 'chipped',
    key: 'chipped',
    render: () => <Badge status="error" text="No" />,
  },
  {
    title: 'In Shelter',
    dataIndex: 'inShelter',
    key: 'inShelter',
    render: () => <Badge status="error" text="No" />,
  },
  {
    title: 'Is Alive',
    dataIndex: 'isAlive',
    key: 'isAlive',
    render: () => <Badge status="success" text="Alive" />,
  },
  {
    title: 'Action',
    key: 'operation',
    render: () => (
      <Space size="middle">
        <a>
          <FaEdit className={styles.editStyle} />
        </a>
        <Popconfirm
          placement="right"
          title="Are you sure to delete this animal?"
          onConfirm={confirm}
          okType="danger"
          okText="Delete"
          cancelText="No"
        >
          <a>
            <FaTrashAlt className={styles.deleteStyle} />
          </a>
        </Popconfirm>
      </Space>
    ),
  },
];

export const primaryData: DataType[] = [];
for (let i = 0; i < 3; ++i) {
  primaryData.push({
    key: i.toString(),
    breed: 'Pitbull',
    origin: 'Abandoned',
    gender: 'Female',
    age: 5,
    chipped: 'Yes',
    inShelter: 'No',
    isAlive: 'Alive',
  });
}

export const expandedRowRender = () => {
  const columns: TableColumnsType<ExpandedDataType> = [
    { title: 'Chip Number', dataIndex: 'chip_number', key: 'chip_number' },
    {
      title: 'Parvo Vaccine',
      dataIndex: 'parvo_vaccine',
      key: 'parvo_vaccine',
    },
    {
      title: 'Chip Date',
      dataIndex: 'chip_date',
      key: 'chip_date',
    },
    {
      title: 'Chip Position',
      dataIndex: 'chip_position',
      key: 'chip_position',
    },
    {
      title: 'Death Date',
      dataIndex: 'death_date',
      key: 'death_date',
    },
    {
      title: 'Death_Cause',
      dataIndex: 'death_cause',
      key: 'death_cause',
    },
    {
      title: 'Images',
      dataIndex: 'images',
      key: 'images',
      render: () => (
        <Image.PreviewGroup>
          <Image
            width={50}
            src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/golden-retriever-royalty-free-image-506756303-1560962726.jpg?crop=0.672xw:1.00xh;0.166xw,0&resize=640:*"
          />
          <Image
            width={50}
            src="https://www.thesprucepets.com/thmb/VM19tEJa_foFAkzEkIy8tj7EBeo=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/top-friendliest-dog-breeds-4691511_hero-5c6a918dcf56409c888d78b0fac82d18.jpg"
          />
          <Image
            width={50}
            src="https://upload.wikimedia.org/wikipedia/commons/9/90/Labrador_Retriever_portrait.jpg"
          />
        </Image.PreviewGroup>
      ),
    },
  ];
  const extendedData = [];
  for (let i = 0; i < 1; ++i) {
    extendedData.push({
      key: i.toString(),
      chip_number: '111',
      parvo_vaccine: '2015-09-12T14',
      chip_date: '2015-09-12T14',
      chip_position: 'left',
      death_date: '2015-09-12T14',
      death_cause: 'we dont know ',
      images: ' ',
    });
  }
  return (
    <Table columns={columns} dataSource={extendedData} pagination={false} />
  );
};
