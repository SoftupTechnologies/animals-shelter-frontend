import React from 'react';
import { FaLock, FaUser } from 'react-icons/fa';
import { BsFillXCircleFill } from 'react-icons/bs';
import { Button, Input, Spin } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import { loginTypes } from './types';
import { loginSchema } from './validation';
import { yupResolver } from '@hookform/resolvers/yup';
import styles from './index.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { login } from './auth/actions-creator';
import { AppDispatch, RootState } from '../../app/store';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector((state: RootState) => {
    state;
  });
  console.log('isloading expression', isLoading);

  const { control, handleSubmit } = useForm<loginTypes>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(loginSchema),
  });
  const onSubmit = handleSubmit((values) => {
    dispatch(login(values, navigate));
  });

  // if (isLoading) {
  //   return (
  //     <Spin tip="Loading" size="large">
  //       <div className="content" />
  //     </Spin>
  //   );
  // }
  return (
    <div className={styles.loginWrapper}>
      <img
        className={styles.loginLogo}
        src="/images/animal_shelter.png"
        alt="logo-shelter"
      />
      <h1 className={styles.loginTitle}>Protect me Albania</h1>
      <h4 className={styles.loginSubTitle}>Animals Shelter Database</h4>
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
