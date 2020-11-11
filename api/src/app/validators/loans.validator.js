import * as yup from 'yup';

export const LoansParamSchema = yup.object().shape({
  id: yup.number().required(),
});

export const LoansSchema = yup.object().shape({
  tenure: yup.number().required(),
  interest: yup.number().required(),
  principal_amount: yup.number().required(),
  interest_type: yup.string().required(),
  createdfor: yup.number().required(),
});

export const LoansUpdateSchema = yup.object().shape({
  tenure: yup.number().required(),
  interest: yup.number().required(),
  principal_amount: yup.number().required(),
  interest_type: yup.string().required(),
  createdfor: yup.number().required(),
});

export const LoansStatusSchema = yup.object().shape({
  status: yup.string().oneOf(['NEW', 'APPROVED', 'REJECTED']).required(),
});
