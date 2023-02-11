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
  Tooltip,
  UploadProps,
} from 'antd';
import { ReactElement, useState } from 'react';
import { DataPropsType } from './types';
import day from 'dayjs';
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
import _ from 'lodash';
import { AnimalBody } from '../../core/types';
import { BsFillXCircleFill } from 'react-icons/bs';

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

  const { control, handleSubmit, reset, watch } = useForm<AnimalBody>({
    defaultValues: {
      origin: selectedAnimal?.origin || '',
      gender: selectedAnimal?.gender || '',
      age: selectedAnimal?.age || 0,
      chipped: selectedAnimal?.chipped || false,
      chip_number: selectedAnimal?.chip_number || '',
      parvo_vaccine: selectedAnimal?.parvo_vaccine || '',
      distemper_vaccine: selectedAnimal?.distemper_vaccine || '',
      polyvalent_vaccine: selectedAnimal?.polyvalent_vaccine || '',
      rabies_vaccine: selectedAnimal?.rabies_vaccine || '',
      sterilization_date: selectedAnimal?.sterilization_date || '',
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
      animalBody.parvo_vaccine = day(values.parvo_vaccine).format();
    }
    if (values.distemper_vaccine) {
      animalBody.distemper_vaccine = day(values.distemper_vaccine).format();
    }
    if (values.polyvalent_vaccine) {
      animalBody.polyvalent_vaccine = day(values.polyvalent_vaccine).format();
    }
    if (values.rabies_vaccine) {
      animalBody.rabies_vaccine = day(values.rabies_vaccine).format();
    }
    if (values.sterilization_date) {
      animalBody.sterilization_date = day(values.sterilization_date).format();
    }
    if (values.chip_date) {
      animalBody.chip_date = day(values.chip_date).format();
    }
    if (values.chip_position) {
      animalBody.chip_position = values.chip_position;
    }
    if (values.death_date) {
      animalBody.death_date = day(values.death_date).format();
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
    reset();
    showDataModal(false);
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
                        allowClear
                        onChange={onChange}
                        onBlur={onBlur}
                        value={value}
                        status={error ? 'error' : ''}
                        name={name}
                        suffix={
                          error ? (
                            <Tooltip title={error?.message} color={'red'}>
                              <BsFillXCircleFill
                                className={styles.errorStyle}
                              />
                            </Tooltip>
                          ) : (
                            ''
                          )
                        }
                        placeholder="Golden"
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
                name="origin"
                render={({
                  field: { onChange, onBlur, value, name },
                  fieldState: { error },
                }) => (
                  <span>
                    <Form.Item label="Origin" required>
                      <Input
                        allowClear
                        onChange={onChange}
                        onBlur={onBlur}
                        value={value}
                        status={error ? 'error' : ''}
                        name={name}
                        suffix={
                          error ? (
                            <Tooltip title={error?.message} color={'red'}>
                              <BsFillXCircleFill
                                className={styles.errorStyle}
                              />
                            </Tooltip>
                          ) : (
                            ''
                          )
                        }
                        placeholder="Abandoned"
                        size="middle"
                      />
                    </Form.Item>
                  </span>
                )}
              />
            </Col>
          </Row>
          <Row gutter={[10, 10]}>
            <Col span={6}>
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
                      tooltip="If animal isn't chipped, you can't fill 'Chip Details' fields."
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
                      tooltip="If animal is alive, you can't fill 'Death Details' fields"
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
            <Col span={6}>
              <Controller
                control={control}
                name="chip_number"
                render={({
                  field: { onChange, onBlur, value, name },
                  fieldState: { error },
                }) => (
                  <span>
                    <Form.Item
                      label="Chip Number"
                      tooltip="If you leave 'Chip Number' field blank, the Chip Number will be auto generated."
                    >
                      <Input
                        allowClear
                        onChange={onChange}
                        onBlur={onBlur}
                        value={value}
                        disabled={!watch('chipped')}
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
            <Col span={8}>
              <Controller
                control={control}
                name="chip_position"
                render={({
                  field: { onChange, value, name },
                  fieldState: { error },
                }) => (
                  <span>
                    <Form.Item label="Chip Position">
                      <Radio.Group value={value} disabled={!watch('chipped')}>
                        <Radio onChange={onChange} value={'left'}>
                          Left
                        </Radio>
                        <Radio onChange={onChange} value={'right'}>
                          Right
                        </Radio>
                      </Radio.Group>
                    </Form.Item>
                    <span className={styles.errorStyleSpan}>
                      {error?.message}
                    </span>
                  </span>
                )}
              />
            </Col>
            <Col span={8}>
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
                        disabled={!watch('chipped')}
                        name={name}
                        size="middle"
                        allowClear
                      />
                    </Form.Item>
                  </span>
                )}
              />
            </Col>
          </Row>
          <Divider className={styles.sectionDevider} />
          <p className={styles.sectionTitle}>Vaccine Details</p>
          <Row gutter={[5, 5]}>
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
                        allowClear
                      />
                    </Form.Item>
                  </span>
                )}
              />
            </Col>

            <Col span={6}>
              <Controller
                control={control}
                name="distemper_vaccine"
                render={({ field: { onChange, onBlur, name, value } }) => (
                  <span>
                    <Form.Item label="Distemper Vaccine">
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
                        allowClear
                      />
                    </Form.Item>
                  </span>
                )}
              />
            </Col>
            <Col span={6}>
              <Controller
                control={control}
                name="polyvalent_vaccine"
                render={({ field: { onChange, onBlur, name, value } }) => (
                  <span>
                    <Form.Item label="Polyvalent Vaccine">
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
                        allowClear
                      />
                    </Form.Item>
                  </span>
                )}
              />
            </Col>
            <Col span={6}>
              <Controller
                control={control}
                name="rabies_vaccine"
                render={({ field: { onChange, onBlur, name, value } }) => (
                  <span>
                    <Form.Item label="Rabies Vaccine">
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
                        allowClear
                      />
                    </Form.Item>
                  </span>
                )}
              />
            </Col>
            <Col span={6}>
              <Controller
                control={control}
                name="sterilization_date"
                render={({ field: { onChange, onBlur, name, value } }) => (
                  <span>
                    <Form.Item label="Sterilization Date">
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
                        allowClear
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
                render={({
                  field: { onChange, onBlur, name, value },
                  fieldState: { error },
                }) => (
                  <span>
                    <Form.Item label="Death Date" required>
                      <DatePicker
                        {...(value
                          ? {
                              value: dayjs(value),
                            }
                          : null)}
                        onChange={onChange}
                        onBlur={onBlur}
                        status={error ? 'error' : ''}
                        disabled={watch('is_alive')}
                        name={name}
                        size="middle"
                        allowClear
                      />
                    </Form.Item>
                  </span>
                )}
              />
            </Col>
            <Col span={12}>
              <Controller
                control={control}
                name="death_cause"
                render={({
                  field: { onChange, onBlur, value, name },
                  fieldState: { error },
                }) => (
                  <span>
                    <Form.Item label="Death Cause" required>
                      <Input
                        onChange={onChange}
                        onBlur={onBlur}
                        value={value}
                        name={name}
                        suffix={
                          error ? (
                            <Tooltip title={error?.message} color={'red'}>
                              <BsFillXCircleFill
                                className={styles.errorStyle}
                              />
                            </Tooltip>
                          ) : (
                            ''
                          )
                        }
                        status={error ? 'error' : ''}
                        disabled={watch('is_alive')}
                        placeholder="We dont know"
                        size="middle"
                        allowClear
                      />
                    </Form.Item>
                  </span>
                )}
              />
            </Col>
          </Row>
          <Divider className={styles.sectionDevider} />
          <p className={styles.sectionTitle}>Images (3 images max)</p>
          <Row>
            <Col span={20}>
              <Controller
                control={control}
                name="images"
                render={({ field: { onChange } }) => (
                  <span>
                    <Dragger accept=".jpg" onChange={onChange} {...props}>
                      <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                      </p>
                      <p className="ant-upload-text">
                        Click or drag image to this area to upload
                      </p>
                      <p className="ant-upload-hint">
                        Image upload limit is 3 images! Format: .jpg
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
