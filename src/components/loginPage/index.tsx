import React from 'react';
import { FaLock, FaUser } from 'react-icons/fa';
import { BsFillXCircleFill } from 'react-icons/bs';
import { Button, Input } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import { loginTypes } from './types';
import { loginSchema } from './validation';
import { yupResolver } from '@hookform/resolvers/yup';
import styles from './index.module.scss';

const Login = () => {
  const { control, handleSubmit } = useForm<loginTypes>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(loginSchema),
  });
  const onSubmit = handleSubmit((values) => {
    console.log(values);
  });

  return (
    <div className={styles.loginWrapper}>
      <img
        className={styles.loginLogo}
        src="/images/animal_shelter.png"
        alt="logo-shelter"
      />
      <h1 className={styles.loginTitle}>Animals Shelter</h1>

      <div className={styles.loginForm}>
        <Controller
          control={control}
          name="email"
          render={({
            field: { onChange, onBlur, value, name },
            fieldState: { error },
          }) => (
            <span>
              <Input
                prefix={<FaUser style={{ color: '#7888af' }} />}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                status={error ? 'error' : ''}
                suffix={
                  error ? (
                    <BsFillXCircleFill className={styles.errorStyle} />
                  ) : (
                    ''
                  )
                }
                name={name}
                placeholder="animal@example.com"
                size="large"
              />
              <span className={styles.errorStyle}>{error?.message}</span>
            </span>
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({
            field: { onChange, onBlur, value, name, ref },
            fieldState: { error },
          }) => (
            <span>
              <Input
                prefix={<FaLock style={{ color: '#7888af' }} />}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                status={error ? 'error' : ''}
                suffix={
                  error ? (
                    <BsFillXCircleFill className={styles.errorStyle} />
                  ) : (
                    ''
                  )
                }
                name={name}
                type="password"
                size="large"
                placeholder="Password"
              />
              <span className={styles.errorStyle}>{error?.message}</span>
            </span>
          )}
        />
        <Button
          onClick={onSubmit}
          type="primary"
          size="large"
          className={styles.loginFormButton}
        >
          Log in
        </Button>
      </div>
    </div>
  );
};
export default Login;
