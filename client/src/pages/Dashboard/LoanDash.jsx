import React from 'react';
import { connect } from 'react-redux';
import { Button, Icon } from 'rsuite';
import LoansTable from '../../components/Dashboard/LoanDash/LoansTable';
import LoanModels from './../../components/Dashboard/LoanDash/LoanModels';
import { openModel } from './../../store/slices/model.slice';
import { loadList } from './../../store/slices/loans.slice';

const LoanDash = ({ openModel, loadList }) => {
  return (
    <div>
      <LoanModels />
      <div className='t-flex t-border-b t-pb-2  t-items-center t-justify-between'>
        <div className='t-text-lg t-font-bold t-pl-1'>
          <Icon icon='money' size='lg' className='t-pr-1'></Icon>
          Loans
        </div>
        <div className='t-flex'>
          <div className='t-pr-2'>
            <Button onClick={() => loadList({ perPage: 10, page: 1 })}>
              <Icon icon='refresh2' className='t-pr-2'></Icon>
              Refresh
            </Button>
          </div>
          <div>
            <Button
              onClick={() =>
                openModel({
                  name: 'CreateEditLoanModel',
                  data: { type: 'create' },
                })
              }
              color='green'
            >
              <Icon icon='plus' className='t-pr-2'></Icon>
              Create Loan
            </Button>
          </div>
        </div>
      </div>
      <div>
        <LoansTable />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = { openModel, loadList };

export default connect(mapStateToProps, mapDispatchToProps)(LoanDash);
