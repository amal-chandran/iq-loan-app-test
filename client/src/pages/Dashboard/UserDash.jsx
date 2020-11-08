import React from 'react';
import { connect } from 'react-redux';
import { Button, Icon } from 'rsuite';
import UsersTable from '../../components/Dashboard/UserDash/UsersTable';
import UserModels from './../../components/Dashboard/UserDash/UserModels';
import { openModel } from './../../store/slices/model.slice';

export const UserDash = ({ openModel }) => {
  return (
    <div>
      <UserModels />
      <div className='t-flex t-border-b t-pb-2  t-items-center t-justify-between'>
        <div className='t-text-lg t-font-bold t-pl-1'>
          <Icon icon='user-circle' size='lg' className='t-pr-1'></Icon>
          Users
        </div>
        <div>
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
        </div>
      </div>
      <div>
        <UsersTable />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = { openModel };

export default connect(mapStateToProps, mapDispatchToProps)(UserDash);
