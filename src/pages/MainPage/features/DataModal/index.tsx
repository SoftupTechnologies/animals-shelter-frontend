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
import { DataPropsType, newDataTypes } from './types';
import styles from './index.module.scss';
import CustomModal from '../../../../components/common/Modal';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { newDataSchema } from './validation';
import { Form } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import Dragger from 'antd/es/upload/Dragger';

const DataModal = ({ showDataModal }: DataPropsType): ReactElement => {
  const handleOnCancel = () => {
    showDataModal(false);
  };

  const props: UploadProps = {
    name: 'file',
    multiple: true,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };

  const [loading, setLoading] = useState(false);

  const { control, handleSubmit } = useForm<newDataTypes>({
    defaultValues: {
      origin: '',
      gender: '',
      age: 0,
      chipped: false,
      chip_number: '',
      parvo_vaccine: '',
      chip_date: '',
      chip_position: '',
      inShelter: false,
      breed: '',
      is_alive: false,
      death_date: '',
      death_cause: '',
      images: [''],
    },
    resolver: yupResolver(newDataSchema),
  });
  const onSubmit = handleSubmit((values) => {
    setLoading(true);
    const chipDateFormatted = dayjs(values.chip_date).format('DD/MM/YYYY');
    const chipPositionFormatted = dayjs(values.chip_position).format(
      'DD/MM/YYYY',
    );
    const parvoVaccineFormatted = dayjs(values.parvo_vaccine).format(
      'DD/MM/YYYY',
    );
    console.log('Form values', {
      ...values,
      chip_date: chipDateFormatted,
      chip_position: chipPositionFormatted,
      parvo_vaccine: parvoVaccineFormatted,
    });
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
                render={({ field: { onChange }, fieldState: { error } }) => (
                  <span>
                    <Form.Item
                      label="Chipped"
                      tooltip="If animal isn't chipped, don't fill the 'Chip Details' fields"
                    >
                      <Switch
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
                name="inShelter"
                render={({ field: { onChange }, fieldState: { error } }) => (
                  <span>
                    <Form.Item label="In Shelter">
                      <Switch
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
                render={({ field: { onChange }, fieldState: { error } }) => (
                  <span>
                    <Form.Item
                      label="Is Alive"
                      tooltip="If animal isn't alive, don't fill the 'Death Details' fields"
                    >
                      <Switch
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
                        <Radio onChange={onChange} value={'Left'}>
                          Left
                        </Radio>
                        <Radio onChange={onChange} value={'Right'}>
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
                render={({ field: { onChange, onBlur, name } }) => (
                  <span>
                    <Form.Item label="Chip Date">
                      <DatePicker
                        onChange={onChange}
                        onBlur={onBlur}
                        name={name}
                        placeholder="2015-09-12"
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
                render={({ field: { onChange, onBlur, name } }) => (
                  <span>
                    <Form.Item label="Parvo Vaccine">
                      <DatePicker
                        onChange={onChange}
                        onBlur={onBlur}
                        name={name}
                        placeholder="2015-09-12"
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
                render={({ field: { onChange, onBlur, name } }) => (
                  <span>
                    <Form.Item label="Death Date">
                      <DatePicker
                        onChange={onChange}
                        onBlur={onBlur}
                        name={name}
                        placeholder="2015-09-12"
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
                      onChange={onChange}
                      accept=".jpg,.jpeg,.png"
                      {...props}
                    >
                      <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                      </p>
                      <p className="ant-upload-text">
                        Click or drag image to this area to upload
                      </p>
                      <p className="ant-upload-hint">
                        Image upload limit is 5 images! Format: .jpg,.jpeg,.png
                      </p>
                    </Dragger>
                  </span>
                )}
              />
            </Col>
          </Row>
        </div>
      }
      visible
    />
  );
};
export default DataModal;
