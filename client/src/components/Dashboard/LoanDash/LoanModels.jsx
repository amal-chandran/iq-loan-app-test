import React from 'react';
import { connect } from 'react-redux';
import FormModelCreate from '../../FormModel';
import LoanForm from './LoanForm';
import isEmpty from 'lodash/isEmpty';
import { closeModel } from '../../../store/slices/model.slice';
import {
  updateLoan,
  createLoan,
  deleteLoan,
  loadList,
} from '../../../store/slices/loans.slice';
import { unwrapResult } from '@reduxjs/toolkit';
import { isNil } from 'lodash';

const CreateEditLoanModel = FormModelCreate(
  'CreateEditLoanModel',
  'Loan',
  'sm'
);
const DeleteLoanModel = FormModelCreate('DeleteLoanModel', 'Loan', 'sm');
const LoanModels = ({
  loadList,
  deleteLoan,
  createLoan,
  updateLoan,
  closeModel,
}) => {
  const LoanFormRef = React.createRef();

  return (
    <div>
      {/* Loans Models */}
      <CreateEditLoanModel submitForm={() => LoanFormRef.current.submitForm()}>
        {(modelPassedData) =>
          !isNil(modelPassedData) ? (
            <LoanForm
              initialValues={
                !isEmpty(modelPassedData) ? modelPassedData.initialValues : null
              }
              innerRef={LoanFormRef}
              type={modelPassedData.type}
              onSubmit={(data) => {
                if (modelPassedData.type === 'create') {
                  createLoan(data)
                    .then(unwrapResult)
                    .then(() => {
                      closeModel('CreateEditLoanModel');
                    });
                } else if (modelPassedData.type === 'edit') {
                  updateLoan({ id: modelPassedData.id, data }).then(() => {
                    closeModel('CreateEditLoanModel');
                  });
                }
              }}
            />
          ) : (
            ''
          )
        }
      </CreateEditLoanModel>

      <DeleteLoanModel
        submitWithData={true}
        submitForm={(data) => {
          deleteLoan(data.id)
            .then(unwrapResult)
            .then(() => {
              loadList();
              closeModel('DeleteLoanModel');
            });
        }}
      >
        {(data) => data && `Are you sure to delete #${data.id} ?`}
      </DeleteLoanModel>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
  loadList,
  updateLoan,
  createLoan,
  deleteLoan,
  closeModel,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoanModels);
