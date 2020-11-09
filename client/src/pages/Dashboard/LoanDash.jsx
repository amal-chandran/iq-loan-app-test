import React from 'react';
import { connect } from 'react-redux';
import { Button, Icon } from 'rsuite';
import LoansTable from '../../components/Dashboard/LoanDash/LoansTable';
import LoanModels from './../../components/Dashboard/LoanDash/LoanModels';
import { openModel } from './../../store/slices/model.slice';
import {
  clearFilters,
  loadList,
  setFilters,
} from './../../store/slices/loans.slice';
import { loadPickerList } from './../../store/slices/users.slice';
import DynamicFilterForm from './../../components/DynamicFilterForm';
import { AbilityContext, Can } from './../../helpers/ability.helper';
import { useAbility } from '@casl/react';
const LoanDash = ({
  openModel,
  loadList,
  loadPickerList,
  pickerLoading,
  usersPickerList,
  setFilters,
  clearFilters,
}) => {
  let dynamicSpec = [
    {
      name: 'principal_amount',
      typeField: 'FieldPicker',
      initialValue: '',
      placeholder: 'Principal Amount',
      component: 'InputNumber',
      extraProps: {},
    },
    {
      name: 'tenure',
      typeField: 'FieldPicker',
      initialValue: '',
      placeholder: 'Tenure',
      component: 'InputNumber',
      extraProps: {},
    },

    {
      name: 'interest',
      typeField: 'FieldPicker',
      initialValue: '',
      placeholder: 'Interest',
      component: 'InputNumber',
      extraProps: {},
    },

    {
      name: 'interest_type',
      typeField: 'FieldPicker',
      initialValue: '',
      placeholder: 'Interest Type',
      component: 'SelectPicker',
      extraProps: {
        block: true,
        searchable: false,
        data: [
          {
            label: 'Fixed',
            value: 'FIXED',
          },
          {
            label: 'Reducing',
            value: 'REDUCING',
          },
        ],
      },
    },
    {
      name: 'status',
      typeField: 'FieldPicker',
      initialValue: '',
      placeholder: 'Status',
      component: 'SelectPicker',
      extraProps: {
        block: true,
        searchable: false,
        data: [
          {
            label: 'New',
            value: 'NEW',
          },
          {
            label: 'Approved',
            value: 'APPROVED',
          },
          {
            label: 'Rejected',
            value: 'REJECTED',
          },
        ],
      },
    },

    {
      name: 'createdfor',
      typeField: 'FieldPicker',
      initialValue: '',
      placeholder: 'Applicant',
      component: 'SelectPicker',
      extraProps: {
        block: true,
        onSearch: (searchKeyword) => loadPickerList(searchKeyword),
        onOpen: () => {
          if (usersPickerList.length === 0) loadPickerList('');
        },
        data: usersPickerList,
        renderMenu: (menu) => {
          if (pickerLoading) {
            return (
              <p className='t-text-gray-500 t-text-center t-p-2'>
                <Icon icon='spinner' spin /> Loading...
              </p>
            );
          }
          return menu;
        },
      },
    },
    {
      name: 'createdAt',
      typeField: 'FieldPicker',
      initialValue: null,
      placeholder: 'Created',
      component: 'DatePicker',
      extraProps: { block: true },
    },
    {
      name: 'updatedAt',
      typeField: 'FieldPicker',
      initialValue: null,
      placeholder: 'Updated',
      component: 'DatePicker',
      extraProps: { block: true },
    },
  ];
  const ability = useAbility(AbilityContext);

  if (!ability.can('list', 'Users')) {
    dynamicSpec = dynamicSpec.filter(({ name }) => name !== 'createdfor');
  }

  const filterFormRef = React.createRef();

  return (
    <div>
      <LoanModels />
      <div className='t-flex t-border-b t-pb-2  t-items-center t-justify-between'>
        <div className='t-text-lg t-font-bold t-pl-1'>
          <Icon icon='money' size='lg' className='t-pr-1'></Icon>
          Loans
        </div>
        <div className='t-flex'>
          <div className='t-pr-2 last:t-pr-0'>
            <Button onClick={() => loadList({ perPage: 10, page: 1 })}>
              <Icon icon='refresh2' className='t-pr-2'></Icon>
              Refresh
            </Button>
          </div>
          <Can I='create' a='Loans'>
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
          </Can>
        </div>
      </div>
      <div className='t-border-b t-flex t-items-center'>
        <DynamicFilterForm
          onSubmit={(data) => {
            setFilters(data);
            loadList({ perPage: 10, page: 1 });
          }}
          innerRef={filterFormRef}
          dynamicSpec={dynamicSpec}
        />
        <div className='t-flex t-flex-wrap'>
          <Button
            block
            color='blue'
            onClick={() => filterFormRef.current.submitForm()}
          >
            <Icon icon='filter' className='t-pr-2'></Icon>
            Reduce
          </Button>
          <Button
            block
            className='t-mt-2'
            onClick={() => {
              filterFormRef.current.resetForm();
              clearFilters();
              loadList({ perPage: 10, page: 1 });
            }}
          >
            <Icon icon='recycle' className='t-pr-2'></Icon>
            Reset
          </Button>
        </div>
      </div>
      <div>
        <LoansTable />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  usersPickerList: state.users.usersPickerList,
  pickerLoading: state.users.loading,
});

const mapDispatchToProps = {
  openModel,
  loadList,
  setFilters,
  clearFilters,
  loadPickerList,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoanDash);
