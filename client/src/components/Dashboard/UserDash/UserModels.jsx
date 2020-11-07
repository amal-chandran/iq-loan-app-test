import React, { Component } from 'react';
import { connect } from 'react-redux';
import FormModelCreate from './../../FormModel';
import UserForm from './UserForm';
import isEmpty from 'lodash/isEmpty';
import { closeModel } from './../../../store/slices/model.slice';

const CreateEditUserModel = FormModelCreate(
  'CreateEditUserModel',
  'User',
  'sm'
);

export const UserModels = ({ createUsers, updateUsers }) => {
  const UserFormRef = React.createRef();

  return (
    <div>
      {/* Users Models */}
      <CreateEditUserModel submitForm={() => UserFormRef.current.submitForm()}>
        {(modelPassedData) => (
          <UserForm
            initialValues={
              !isEmpty(modelPassedData) ? modelPassedData.initialValues : null
            }
            innerRef={UserFormRef}
            onSubmit={(data) => {
              if (modelPassedData.type == 'create') {
                createUsers(data, [closeModel('CreateEditUserModel')]);
              } else if (modelPassedData.type == 'edit') {
                updateUsers(modelPassedData.id, data, [
                  closeModel('CreateEditUserModel'),
                ]);
              }
            }}
          />
        )}
      </CreateEditUserModel>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(UserModels);
