import * as yup from 'yup';

const multerFile = yup
  .object()
  .shape({
    fieldname: yup.string(),
    originalname: yup.string(),
    encoding: yup.string(),
    mimetype: yup.string(),
    destination: yup.string(),
    filename: yup.string(),
    path: yup.string(),
    size: yup.number()
  })
  .required();

module.exports = { multerFile };
