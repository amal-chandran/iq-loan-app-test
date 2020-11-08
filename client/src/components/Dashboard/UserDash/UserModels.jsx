import React from 'react';
import { connect } from 'react-redux';
import FormModelCreate from './../../FormModel';
import UserForm from './UserForm';
import isEmpty from 'lodash/isEmpty';
import { closeModel } from './../../../store/slices/model.slice';
import {
  updateUser,
  createUser,
  deleteUser,
  loadList,
} from './../../../store/slices/users.slice';
import { unwrapResult } from '@reduxjs/toolkit';
import { isNil } from 'lodash';

const CreateEditUserModel = FormModelCreate(
  'CreateEditUserModel',
  'User',
  'sm'
);
const DeleteUserModel = FormModelCreate('DeleteUserModel', 'User', 'sm');
const UserModels = ({
  loadList,
  deleteUser,
  createUser,
  updateUser,
  closeModel,
}) => {
  const UserFormRef = React.createRef();

  return (
    <div>
      {/* Users Models */}
      <CreateEditUserModel submitForm={() => UserFormRef.current.submitForm()}>
        {(modelPassedData) =>
          !isNil(modelPassedData) ? (
            <UserForm
              initialValues={
                !isEmpty(modelPassedData) ? modelPassedData.initialValues : null
              }
              innerRef={UserFormRef}
              type={modelPassedData.type}
              onSubmit={(data) => {
                if (modelPassedData.type === 'create') {
                  createUser(data)
                    .then(unwrapResult)
                    .then(() => {
                      closeModel('CreateEditUserModel');
                    });
                } else if (modelPassedData.type === 'edit') {
                  updateUser({ id: modelPassedData.id, data }).then(() => {
                    closeModel('CreateEditUserModel');
                  });
                }
              }}
            />
          ) : (
            ''
          )
        }
      </CreateEditUserModel>

      <DeleteUserModel
        submitWithData={true}
        submitForm={(data) => {
          deleteUser(data.id)
            .then(unwrapResult)
            .then(() => {
              loadList();
              closeModel('DeleteUserModel');
            });
        }}
      >
        {(data) => data && `Are you sure to delete #${data.id} ${data.name} ?`}
      </DeleteUserModel>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
  loadList,
  updateUser,
  createUser,
  deleteUser,
  closeModel,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserModels);
