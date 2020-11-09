import * as yup from 'yup';

export const UsersParamSchema = yup.object().shape({
  id: yup.number().required(),
});

export const UsersSchema = yup.object().shape({
  name: yup.string().required().label('Name'),
  email: yup.string().email().required().label('Email'),
  password: yup.string().min(8).label('Password'),
  role: yup.string().required().label('Role'),
});

export const UsersUpdateSchema = yup.object().shape({
  name: yup.string().required().label('Name'),
  email: yup.string().email().required().label('Email'),
  password: yup.string().optional().min(8).label('Password'),
  role: yup.string().required().label('Role'),
});
