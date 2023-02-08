import {
  Button,
  Col,
  DatePicker,
  Divider,
  Input,
  InputNumber,
  message,
  Radio,
  Row,
  Switch,
  UploadProps,
} from 'antd';
import { ReactElement, useState } from 'react';
import { DataPropsType } from './types';
import styles from './index.module.scss';
import CustomModal from '../../../../components/common/Modal';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { newDataSchema } from './validation';
import { Form } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import Dragger from 'antd/es/upload/Dragger';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../app/store';
import { deselectAnimal } from '../../core/animal-reducer';
import { uploadAnimalImage } from '../../core/animal-api';
import { addAnAnimal, udpateAnAnimal } from '../../core/action-creator';
import moment from 'moment';
import _ from 'lodash';
import { AnimalBody } from '../../core/types';

const DataModal = ({ showDataModal }: DataPropsType): ReactElement => {
  const dispatch = useDispatch<AppDispatch>();
  const selectedAnimal = useSelector(
    (state: RootState) => state.animals.selectedAnimal,
  );
  const [images, setImages] = useState<string[]>([]);

  const handleOnCancel = () => {
    dispatch(deselectAnimal());
    showDataModal(false);
  };

  const props: UploadProps = {
    name: 'file',
    multiple: true,
    onChange(info) {
      const { status } = info.file;
      if (status === 'uploading') {
        info.file.status = 'done';
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      }
      if (status === 'error') {
        console.log('error', info.file.error);
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    customRequest: (options: any) => {
      const data = new FormData();
      data.append('image', options.file);
      uploadAnimalImage(data).then((res) => {
        setImages((prevState) => {
          return [...prevState, res.Data];
        });
      });
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };

  const [loading, setLoading] = useState(false);

  const { control, handleSubmit, reset } = useForm<AnimalBody>({
    defaultValues: {
      origin: selectedAnimal?.origin || '',
      gender: selectedAnimal?.gender || '',
      age: selectedAnimal?.age || 0,
      chipped: selectedAnimal?.chipped || false,
      chip_number: selectedAnimal?.chip_number || '',
      parvo_vaccine: selectedAnimal?.parvo_vaccine || '',
      chip_date: selectedAnimal?.chip_date || '',
      chip_position: selectedAnimal?.chip_position || '',
      in_shelter: selectedAnimal?.in_shelter || false,
      breed: selectedAnimal?.breed || '',
      is_alive: selectedAnimal?.is_alive || false,
      death_date: selectedAnimal?.death_date || '',
      death_cause: selectedAnimal?.death_cause || '',
      images: selectedAnimal?.images || [],
    },
    resolver: yupResolver(newDataSchema),
  });
  const onSubmit = handleSubmit((values) => {
    setLoading(true);
    const animalBody: any = {
      origin: values.origin,
      gender: values.gender,
      age: values.age,
      breed: values.breed,
      chipped: values.chipped,
      in_shelter: values.in_shelter,
      is_alive: values.is_alive,
    };
    if (values.chip_number) {
      animalBody.chip_number = values.chip_number;
    }
    if (values.parvo_vaccine) {
      animalBody.parvo_vaccine = moment(values.parvo_vaccine).format();
    }
    if (values.chip_date) {
      animalBody.chip_date = moment(values.chip_date).format();
    }
    if (values.chip_position) {
      animalBody.chip_position = values.chip_position;
    }
    if (values.death_date) {
      animalBody.death_date = moment(values.death_date).format();
    }
    if (values.death_cause) {
      animalBody.death_cause = values.death_cause;
    }
    if (images.length) {
      animalBody.images = images;
    }

    if (selectedAnimal) {
      const animalToBeUpdated: any = { ...selectedAnimal, ...values };

      dispatch(udpateAnAnimal(animalToBeUpdated, selectedAnimal.id));
    } else {
      dispatch(addAnAnimal(animalBody));
    }
    showDataModal(false);
    reset();
    setLoading(false);
  });

  return (
    <CustomModal
      title={''}
      onCancel={handleOnCancel}
      style={{ top: 20 }}
      footer={[
        <Button
          loading={loading}
          onClick={handleOnCancel}
          type="ghost"
          size="large"
          className={styles.closeFormButton}
        >
          Close
        </Button>,
        <Button
          loading={loading}
          onClick={onSubmit}
          type="primary"
          size="large"
          className={styles.sumbitFormButton}
        >
          Sumbit
        </Button>,
      ]}
      width={600}
      content={
        <div>
          <p className={styles.sectionTitle}>Overall Details</p>
          <Row gutter={[16, 16]}>
            <Col span={10}>
              <Controller
                control={control}
                name="breed"
                render={({
                  field: { onChange, onBlur, value, name },
                  fieldState: { error },
                }) => (
                  <span>
                    <Form.Item label="Breed" required>
                      <Input
                        onChange={onChange}
                        onBlur={onBlur}
                        value={value}
                        status={error ? 'error' : ''}
                        name={name}
                        placeholder="Golden"
                        size="middle"
                      />
                    </Form.Item>
                    <span className={styles.errorStyle}>{error?.message}</span>
                  </span>
                )}
              />
            </Col>
            <Col span={10}>
              <Controller
                control={control}
                name="origin"
                render={({
                  field: { onChange, onBlur, value, name },
                  fieldState: { error },
                }) => (
                  <span>
                    <Form.Item label="Origin" required>
                      <Input
                        onChange={onChange}
                        onBlur={onBlur}
                        value={value}
                        status={error ? 'error' : ''}
                        name={name}
                        placeholder="Abandoned"
                        size="middle"
                      />
                    </Form.Item>
                    <span className={styles.errorStyle}>{error?.message}</span>
                  </span>
                )}
              />
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col span={4}>
              <Controller
                control={control}
                name="gender"
                render={({
                  field: { onChange, value, name },
                  fieldState: { error },
                }) => (
                  <span>
                    <Form.Item label="Gender" required>
                      <Radio.Group value={value}>
                        <Radio name={name} onChange={onChange} value={'Male'}>
                          Male
                        </Radio>
                        <Radio name={name} onChange={onChange} value={'Female'}>
                          Female
                        </Radio>
                      </Radio.Group>
                    </Form.Item>
                    <span className={styles.errorStyle}>{error?.message}</span>
                  </span>
                )}
              />
            </Col>
            <Col span={5}>
              <Controller
                control={control}
                name="age"
                render={({
                  field: { onChange, onBlur, value, name },
                  fieldState: { error },
                }) => (
                  <span>
                    <Form.Item label="Age">
                      <InputNumber
                        onChange={onChange}
                        onBlur={onBlur}
                        value={value}
                        status={error ? 'error' : ''}
                        name={name}
                        placeholder="5"
                        size="middle"
                        min={0}
                      />
                    </Form.Item>
                    <span className={styles.errorStyle}>{error?.message}</span>
                  </span>
                )}
              />
            </Col>
            <Col span={4}>
              <Controller
                control={control}
                name="chipped"
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <span>
                    <Form.Item
                      label="Chipped"
                      tooltip="If animal isn't chipped, don't fill the 'Chip Details' fields"
                    >
                      <Switch
                        checked={value}
                        onChange={onChange}
                        checkedChildren="Yes"
                        unCheckedChildren="No"
                      />
                    </Form.Item>
                    <span className={styles.errorStyle}>{error?.message}</span>
                  </span>
                )}
              />
            </Col>
            <Col span={4}>
              <Controller
                control={control}
                name="in_shelter"
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <span>
                    <Form.Item label="In Shelter">
                      <Switch
                        checked={value}
                        onChange={onChange}
                        checkedChildren="Yes"
                        unCheckedChildren="No"
                      />
                    </Form.Item>
                    <span className={styles.errorStyle}>{error?.message}</span>
                  </span>
                )}
              />
            </Col>
            <Col span={4}>
              <Controller
                control={control}
                name="is_alive"
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <span>
                    <Form.Item
                      label="Is Alive"
                      tooltip="If animal isn't alive, don't fill the 'Death Details' fields"
                    >
                      <Switch
                        checked={value}
                        onChange={onChange}
                        checkedChildren="Yes"
                        unCheckedChildren="No"
                      />
                    </Form.Item>
                    <span className={styles.errorStyle}>{error?.message}</span>
                  </span>
                )}
              />
            </Col>
          </Row>
          <Divider className={styles.sectionDevider} />
          <p className={styles.sectionTitle}>Chip Details</p>
          <Row gutter={[16, 16]}>
            <Col span={5}>
              <Controller
                control={control}
                name="chip_number"
                render={({
                  field: { onChange, onBlur, value, name },
                  fieldState: { error },
                }) => (
                  <span>
                    <Form.Item label="Chip Number">
                      <Input
                        onChange={onChange}
                        onBlur={onBlur}
                        value={value}
                        status={error ? 'error' : ''}
                        name={name}
                        placeholder="1234"
                        size="middle"
                      />
                    </Form.Item>
                    <span className={styles.errorStyle}>{error?.message}</span>
                  </span>
                )}
              />
            </Col>
            <Col span={5}>
              <Controller
                control={control}
                name="chip_position"
                render={({
                  field: { onChange, value, name },
                  fieldState: { error },
                }) => (
                  <span>
                    <Form.Item label="Chip Position">
                      <Radio.Group value={value}>
                        <Radio onChange={onChange} value={'left'}>
                          Left
                        </Radio>
                        <Radio onChange={onChange} value={'right'}>
                          Right
                        </Radio>
                      </Radio.Group>
                    </Form.Item>
                    <span className={styles.errorStyle}>{error?.message}</span>
                  </span>
                )}
              />
            </Col>
            <Col span={6}>
              <Controller
                control={control}
                name="chip_date"
                render={({ field: { onChange, onBlur, name, value } }) => (
                  <span>
                    <Form.Item label="Chip Date">
                      <DatePicker
                        {...(value
                          ? {
                              value: dayjs(value),
                            }
                          : null)}
                        onChange={onChange}
                        onBlur={onBlur}
                        name={name}
                        size="middle"
                      />
                    </Form.Item>
                  </span>
                )}
              />
            </Col>

            <Col span={6}>
              <Controller
                control={control}
                name="parvo_vaccine"
                render={({ field: { onChange, onBlur, name, value } }) => (
                  <span>
                    <Form.Item label="Parvo Vaccine">
                      <DatePicker
                        {...(value
                          ? {
                              value: dayjs(value),
                            }
                          : null)}
                        onChange={onChange}
                        onBlur={onBlur}
                        name={name}
                        size="middle"
                      />
                    </Form.Item>
                  </span>
                )}
              />
            </Col>
          </Row>
          <Divider className={styles.sectionDevider} />
          <p className={styles.sectionTitle}>Death Details</p>
          <Row gutter={[16, 16]}>
            <Col span={8}>
              <Controller
                control={control}
                name="death_date"
                render={({ field: { onChange, onBlur, name, value } }) => (
                  <span>
                    <Form.Item label="Death Date">
                      <DatePicker
                        {...(value
                          ? {
                              value: dayjs(value),
                            }
                          : null)}
                        onChange={onChange}
                        onBlur={onBlur}
                        name={name}
                        size="middle"
                      />
                    </Form.Item>
                  </span>
                )}
              />
            </Col>
            <Col span={10}>
              <Controller
                control={control}
                name="death_cause"
                render={({ field: { onChange, onBlur, value, name } }) => (
                  <span>
                    <Form.Item label="Death Cause">
                      <Input
                        onChange={onChange}
                        onBlur={onBlur}
                        value={value}
                        name={name}
                        placeholder="We dont know"
                        size="middle"
                      />
                    </Form.Item>
                  </span>
                )}
              />
            </Col>
          </Row>
          <Divider className={styles.sectionDevider} />
          <p className={styles.sectionTitle}>Images</p>
          <Row>
            <Col span={20}>
              <Controller
                control={control}
                name="images"
                render={({ field: { onChange } }) => (
                  <span>
                    <Dragger
                      accept=".jpg,.jpeg,.png"
                      onChange={onChange}
                      {...props}
                    >
                      <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                      </p>
                      <p className="ant-upload-text">
                        Click or drag image to this area to upload
                      </p>
                      <p className="ant-upload-hint">
                        Image upload limit is 3 images! Format: .jpg,.jpeg,.png
                      </p>
                    </Dragger>
                  </span>
                )}
              />
            </Col>
          </Row>
        </div>
      }
      open
    />
  );
};
export default DataModal;
