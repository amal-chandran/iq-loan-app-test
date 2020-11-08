import * as yup from 'yup';

export const UsersParamSchema = yup.object().shape({
  id: yup.number().required(),
});

export const UsersSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required().min(8),
  role: yup.string().required(),
});

export const UsersUpdateSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().optional().min(8),
  role: yup.string().required(),
});
