import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Icon, IconButton, Table, Avatar } from 'rsuite';
import { ModelAction } from './../../Table/ActionButtons';
import { ActionCell, AvatarCell, NestedCell } from './../../Table/TableCells';
import { loadList } from './../../../store/slices/users.slice';
import { omit, upperFirst } from 'lodash';

const { Column, Cell, HeaderCell, Pagination } = Table;

const UsersTable = ({ loadList, usersList, loading }) => {
  const [page, setPage] = useState(1);
  const [displayLength, setDisplayLength] = useState(10);

  useEffect(() => {
    loadList();
  }, [loadList]);

  const handleChangeLength = (dataKey) => {
    setDisplayLength(dataKey);
    setPage(1);
  };

  return (
    <div>
      <Table height={420} data={usersList} loading={loading}>
        <Column width={50} align='center' fixed>
          <HeaderCell>Id</HeaderCell>
          <Cell dataKey='id' />
        </Column>

        <Column width={50} fixed>
          <HeaderCell>Avatar</HeaderCell>
          <AvatarCell dataKey='name' />
        </Column>
        <Column width={200} fixed>
          <HeaderCell>Name</HeaderCell>
          <Cell dataKey='name' />
        </Column>

        <Column width={200}>
          <HeaderCell>Email</HeaderCell>
          <Cell dataKey='email' />
        </Column>
        <Column width={100}>
          <HeaderCell>Role</HeaderCell>
          <NestedCell
            dataKey='role'
            formatCell={(rowData) => upperFirst(rowData['role'])}
          />
        </Column>
        <Column width={200}>
          <HeaderCell>Action Cell</HeaderCell>
          <ActionCell dataKey='id'>
            <ModelAction
              modelName='CreateEditUserModel'
              icon='edit2'
              tooltip='Edit User'
              modelTransform={(rowData) => ({
                type: 'edit',
                id: rowData.id,
                initialValues: omit(rowData, ['_parent', 'children']),
              })}
            />
            <ModelAction
              modelName='DeleteUserModel'
              icon='trash'
              tooltip='Delete User'
              modelTransform={(rowData) => ({
                type: 'delete',
                id: rowData.id,
                name: rowData.name,
              })}
            />
          </ActionCell>
        </Column>
      </Table>

      <Pagination
        className='t-py-1 t-px-1'
        lengthMenu={[
          {
            value: 10,
            label: 10,
          },
          {
            value: 20,
            label: 20,
          },
        ]}
        activePage={page}
        displayLength={displayLength}
        total={usersList.length}
        onChangePage={setPage}
        onChangeLength={handleChangeLength}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  usersList: state.users.usersList,
  loading: state.users.loading,
});

const mapDispatchToProps = { loadList };

export default connect(mapStateToProps, mapDispatchToProps)(UsersTable);
