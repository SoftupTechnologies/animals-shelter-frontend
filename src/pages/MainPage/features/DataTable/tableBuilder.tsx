import { Badge, Space, Table, Image, Popconfirm } from 'antd';
import type { TableColumnsType } from 'antd';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import moment from 'moment';
import { DataType, ExpandedDataType } from './types';
import styles from './index.module.scss';
import { Animal, AnimalState } from '../../core/types';
import { AnyAction, Dispatch, ThunkDispatch } from '@reduxjs/toolkit';
import { AuthState } from '../../../LoginPage/auth/types';
import { selectAnimal } from '../../core/animal-reducer';
import { deleteAnAnimal } from '../../core/action-creator';

const onEdit = (
  showDataModal: (a: boolean) => void,
  dispatch: ThunkDispatch<
    {
      auth: AuthState;
      animals: AnimalState;
    },
    undefined,
    AnyAction
  > &
    Dispatch<AnyAction>,
  animal: Animal,
) => {
  dispatch(selectAnimal(animal));
  showDataModal(true);
};
export const columns = [
  { title: 'Breed', dataIndex: 'breed', key: 'breed' },
  { title: 'Origin', dataIndex: 'origin', key: 'origin' },
  { title: 'Gender', dataIndex: 'gender', key: 'gender' },
  { title: 'Age', dataIndex: 'age', key: 'age' },
  {
    title: 'Chipped',
    dataIndex: 'chipped',
    key: 'chipped',
  },
  {
    title: 'In Shelter',
    dataIndex: 'in_shelter',
    key: 'in_shelter',
  },
  {
    title: 'Is Alive',
    dataIndex: 'isAlive',
    key: 'isAlive',
  },
  {
    title: 'Action',
    dataIndex: 'action',
    key: 'operation',
  },
];

export const getPrimaryData = (
  animals: Animal[],
  showDataModal: (a: boolean) => void,
  dispatch: ThunkDispatch<
    {
      auth: AuthState;
      animals: AnimalState;
    },
    undefined,
    AnyAction
  > &
    Dispatch<AnyAction>,
) => {
  const primaryData: DataType[] = animals.map((animal) => {
    return {
      key: animal.id,
      breed: animal.breed,
      origin: animal.origin,
      gender: animal.gender,
      age: animal.age,
      chipped: (
        <Badge
          status={animal.chipped ? 'success' : 'error'}
          text={animal.chipped ? 'Yes' : 'No'}
        />
      ),
      in_shelter: (
        <Badge
          status={animal.in_shelter ? 'success' : 'error'}
          text={animal.in_shelter ? 'Yes' : 'No'}
        />
      ),
      isAlive: (
        <Badge
          status={animal.is_alive ? 'success' : 'error'}
          text={animal.is_alive ? 'Yes' : 'No'}
        />
      ),
      action: (
        <Space size="middle">
          <a>
            <FaEdit
              className={styles.editStyle}
              onClick={() => onEdit(showDataModal, dispatch, animal)}
            />
          </a>
          <Popconfirm
            placement="right"
            title="Are you sure to delete this animal?"
            onConfirm={() => dispatch(deleteAnAnimal(animal.id))}
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
    };
  });

  return primaryData;
};

export const expandedRowRender = (animals: Animal[], record: any) => {
  const columns: TableColumnsType<ExpandedDataType> = [
    { title: 'Chip Number', dataIndex: 'chip_number', key: 'chip_number' },
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
      title: 'Parvo Vaccine',
      dataIndex: 'parvo_vaccine',
      key: 'parvo_vaccine',
    },
    {
      title: 'Distemper Vaccine',
      dataIndex: 'distemper_vaccine',
      key: 'distemper_vaccine',
    },
    {
      title: 'Polyvalent Vaccine',
      dataIndex: 'polyvalent_vaccine',
      key: 'polyvalent_vaccine',
    },
    {
      title: 'Rabies Vaccine',
      dataIndex: 'rabies_vaccine',
      key: 'rabies_vaccine',
    },
    {
      title: 'Sterilization Date',
      dataIndex: 'sterilization_date',
      key: 'sterilization_date',
    },
    {
      title: 'Death Date',
      dataIndex: 'death_date',
      key: 'death_date',
    },
    {
      title: 'Death Cause',
      dataIndex: 'death_cause',
      key: 'death_cause',
    },
    {
      title: 'Images',
      dataIndex: 'images',
      key: 'images',
    },
  ];
  const extendedData = animals
    .filter((a) => a.id === record.key)
    .map((animal) => {
      return {
        key: animal.id,
        chip_number: animal.chip_number ? animal.chip_number : 'No chip number',
        parvo_vaccine: animal.parvo_vaccine
          ? moment(animal.parvo_vaccine).format('L')
          : '----',
        distemper_vaccine: animal.distemper_vaccine
          ? moment(animal.distemper_vaccine).format('L')
          : '----',
        polyvalent_vaccine: animal.polyvalent_vaccine
          ? moment(animal.polyvalent_vaccine).format('L')
          : '----',
        rabies_vaccine: animal.rabies_vaccine
          ? moment(animal.rabies_vaccine).format('L')
          : '----',
        sterilization_date: animal.sterilization_date
          ? moment(animal.sterilization_date).format('L')
          : '----',
        chip_date: animal.chip_date
          ? moment(animal.chip_date).format('L')
          : '----',
        chip_position: animal.chip_position ? animal.chip_position : '----',
        death_date: animal.death_date
          ? moment(animal.death_date).format('L')
          : '----',
        death_cause: animal.death_cause ? animal.death_cause : '----',
        images: animal.images ? (
          <Image.PreviewGroup>
            {animal.images.map((image, index) => (
              <Image key={index} width={50} src={image} />
            ))}
          </Image.PreviewGroup>
        ) : (
          <p>No images</p>
        ),
      };
    });

  return (
    <Table columns={columns} dataSource={extendedData} pagination={false} />
  );
};
