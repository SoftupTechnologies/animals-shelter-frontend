import * as yup from 'yup';
export const loginSchema = yup
  .object({
    email: yup
      .string()
      .email('This is not a proper email format!')
      .required('Email is required!'),
    password: yup
      .string()
      .required('Password is required!')
      .min(1, 'Password is too short - should be 8 chars minimum!'),
  })
  .required();
