import * as yup from 'yup';

const loginSchema = yup.object().shape({
  email: yup.string().email().required().label('Email'),
  password: yup.string().required().label('Password'),
});

const registerSchema = yup.object().shape({
  name: yup.string().required().label('Name'),
  email: yup.string().email().required().label('Email'),
  password: yup.string().required().label('Password'),
});

module.exports = { loginSchema, registerSchema };
