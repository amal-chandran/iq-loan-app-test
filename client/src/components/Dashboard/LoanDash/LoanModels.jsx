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
  setStatusLoan,
} from '../../../store/slices/loans.slice';
import { unwrapResult } from '@reduxjs/toolkit';
import { isNil, toLower } from 'lodash';
import { Button } from 'rsuite';
import { Can } from './../../../helpers/ability.helper';

const CreateEditLoanModel = FormModelCreate(
  'CreateEditLoanModel',
  'Loan',
  'sm'
);

const ShowLoanModel = FormModelCreate('ShowLoanModel', 'Loan Details', 'sm');

const DeleteLoanModel = FormModelCreate('DeleteLoanModel', 'Loan', 'sm');

const LoanModels = ({
  loadList,
  deleteLoan,
  createLoan,
  updateLoan,
  closeModel,
  setStatusLoan,
  loansList,
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

      <ShowLoanModel>
        {(data) => {
          const loanDetails = data
            ? loansList.find(({ id }) => data.data.id === id)
            : null;
          return (
            loanDetails && (
              <div className='t-flex'>
                <div className='t-table-auto'>
                  <div className='t-table-row'>
                    <div className='t-table-cell t-p-2'>Principal Amount</div>
                    <div className='t-table-cell t-p-2'>
                      {loanDetails.principal_amount}
                    </div>
                  </div>
                  <div className='t-table-row'>
                    <div className='t-table-cell t-p-2'>Tenure</div>
                    <div className='t-table-cell t-p-2'>
                      {loanDetails.tenure}
                    </div>
                  </div>
                  <div className='t-table-row'>
                    <div className='t-table-cell t-p-2'>Interest</div>
                    <div className='t-table-cell t-p-2'>
                      {loanDetails.interest}
                    </div>
                  </div>
                  <div className='t-table-row'>
                    <div className='t-table-cell t-p-2'>Interest Type</div>

                    <div className='t-table-cell t-p-2 t-capitalize'>
                      {toLower(loanDetails.interest_type)}
                    </div>
                  </div>
                  <div className='t-table-row'>
                    <div className='t-table-cell t-p-2'>Applicent</div>
                    <div className='t-table-cell t-p-2'>
                      {loanDetails.createdFor.name}
                    </div>
                  </div>
                </div>
                <div>
                  <div className='t-flex t-p-2'>
                    <div>Status:</div>
                    <div className='t-text-blue-500 t-font-bold t-px-2 t-capitalize'>
                      {toLower(loanDetails.status)}
                    </div>
                  </div>
                  <Can I='set-status' a='Loans'>
                    <div className='t-pt-2'>
                      <Button
                        onClick={() =>
                          setStatusLoan({
                            id: loanDetails.id,
                            status: 'APPROVED',
                          })
                        }
                        color='green'
                        className='t-mr-2'
                      >
                        Approve
                      </Button>
                      <Button
                        onClick={() =>
                          setStatusLoan({
                            id: loanDetails.id,
                            status: 'REJECTED',
                          })
                        }
                        color='red'
                      >
                        Reject
                      </Button>
                    </div>
                  </Can>
                </div>
              </div>
            )
          );
        }}
      </ShowLoanModel>
    </div>
  );
};

const mapStateToProps = (state) => ({
  loansList: state.loans.loansList || [],
});

const mapDispatchToProps = {
  loadList,
  updateLoan,
  createLoan,
  deleteLoan,
  closeModel,
  setStatusLoan,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoanModels);
