import React from 'react';
import { connect } from 'react-redux';
import { Button, Icon } from 'rsuite';
import UsersTable from '../../components/Dashboard/UserDash/UsersTable';
import DynamicFilterForm from '../../components/DynamicFilterForm';
import { Can } from '../../helpers/ability.helper';
import UserModels from './../../components/Dashboard/UserDash/UserModels';
import { openModel } from './../../store/slices/model.slice';
import {
  loadList,
  setFilters,
  clearFilters,
} from './../../store/slices/users.slice';

export const UserDash = ({ openModel, loadList, setFilters, clearFilters }) => {
  const filterFormRef = React.createRef();
  const dynamicSpec = [
    {
      name: 'search$name',
      typeField: 'FieldControl',
      initialValue: '',
      placeholder: 'Name',
      component: 'Input',
      extraProps: {},
    },

    {
      name: 'search$email',
      typeField: 'FieldControl',
      initialValue: '',
      placeholder: 'Email',
      component: 'Input',
      extraProps: {},
    },
    {
      name: 'role',
      typeField: 'FieldPicker',
      initialValue: '',
      placeholder: 'Role',
      component: 'SelectPicker',
      extraProps: {
        block: true,
        searchable: false,
        data: [
          {
            label: 'Admin',
            value: 'admin',
          },
          {
            label: 'Customer',
            value: 'customer',
          },
          {
            label: 'Agent',
            value: 'agent',
          },
        ],
      },
    },
    {
      name: 'createdAt',
      typeField: 'FieldPicker',
      initialValue: '',
      placeholder: 'Created',
      component: 'DatePicker',
      extraProps: { block: true },
    },
    {
      name: 'updatedAt',
      typeField: 'FieldPicker',
      initialValue: '',
      placeholder: 'Updated',
      component: 'DatePicker',
      extraProps: { block: true },
    },
  ];

  return (
    <div>
      <UserModels />
      <div className='t-flex t-border-b t-pb-2  t-items-center t-justify-between'>
        <div className='t-text-lg t-font-bold t-pl-1'>
          <Icon icon='user-circle' size='lg' className='t-pr-1'></Icon>
          Users
        </div>
        <div className='t-flex'>
          <div className='t-pr-2'>
            <Button onClick={() => loadList({ perPage: 10, page: 1 })}>
              <Icon icon='refresh2' className='t-pr-2'></Icon>
              Refresh
            </Button>
          </div>
          <div>
            <Can I='create' a='Users'>
              <Button
                onClick={() =>
                  openModel({
                    name: 'CreateEditUserModel',
                    data: { type: 'create' },
                  })
                }
                color='green'
              >
                <Icon icon='plus' className='t-pr-2'></Icon>
                Create User
              </Button>
            </Can>
          </div>
        </div>
      </div>
      <div className='t-border-b t-flex t-items-center'>
        <DynamicFilterForm
          containerProps={{ className: 't-flex t-pb-2 t-flex-1' }}
          onSubmit={(data) => {
            setFilters(data);
            loadList({ perPage: 10, page: 1 });
          }}
          innerRef={filterFormRef}
          dynamicSpec={dynamicSpec}
        />
        <div className='t-flex t-flex-wrap'>
          <Button
            color='blue'
            onClick={() => filterFormRef.current.submitForm()}
          >
            <Icon icon='filter' className='t-pr-2'></Icon>
            Reduce
          </Button>
          <Button
            className='t-ml-2'
            onClick={() => {
              filterFormRef.current.resetForm();
              clearFilters();
              loadList({ perPage: 10, page: 1 });
            }}
          >
            <Icon icon='recycle'></Icon>
          </Button>
        </div>
      </div>
      <div>
        <UsersTable />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = { openModel, loadList, setFilters, clearFilters };

export default connect(mapStateToProps, mapDispatchToProps)(UserDash);
