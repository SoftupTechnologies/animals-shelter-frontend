import * as yup from 'yup';
export const newDataSchema = yup
  .object({
    origin: yup.string().required('Origin is required!'),
    gender: yup.string().required('Gender is required!'),
    age: yup.number().required('Age is required!'),
    chipped: yup.boolean(),
    chip_number: yup.string(),
    parvo_vaccine: yup.string(),
    chip_date: yup.string(),
    chip_position: yup.string(),
    breed: yup.string().required('Breed is required!'),
    is_alive: yup.boolean(),
    death_date: yup.string(),
    death_cause: yup.string(),
  })
  .required();
