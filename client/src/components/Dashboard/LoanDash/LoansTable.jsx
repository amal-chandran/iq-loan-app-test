import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Icon, IconButton, Table, Avatar, Tag } from 'rsuite';
import { ModelAction } from '../../Table/ActionButtons';
import { ActionCell, AvatarCell, NestedCell } from '../../Table/TableCells';
import { loadList } from '../../../store/slices/loans.slice';
import { get, omit, toLower, toNumber, upperFirst } from 'lodash';
import classNames from 'classnames';
const { Column, Cell, HeaderCell, Pagination } = Table;

const statusColors = {
  NEW: 't-bg-blue-500',
  REJECTED: 't-bg-red-500',
  APPROVED: 't-bg-green-500',
};

const interestTypeColors = {
  REDUCING: 't-bg-teal-500',
  FIXED: 't-bg-orange-500',
};

const LoansTable = ({ loadList, loansList, loansListMeta, loading }) => {
  const [displayLength, setDisplayLength] = useState(10);

  useEffect(() => {
    loadList({ perPage: displayLength, page: 1 });
  }, [loadList, displayLength]);

  const setPage = (page) => {
    loadList({ perPage: displayLength, page });
  };

  const handleChangeLength = (dataKey) => {
    setDisplayLength(dataKey);
    setPage(1);
  };

  return (
    <div>
      <Table height={520} data={loansList} loading={loading}>
        <Column width={50} align='center' fixed>
          <HeaderCell>Id</HeaderCell>
          <Cell dataKey='id' />
        </Column>

        <Column width={120} fixed>
          <HeaderCell>Principal Amount</HeaderCell>
          <NestedCell
            dataKey='principal_amount'
            formatCell={(rowData) => `₹${rowData['principal_amount']}`}
          />
        </Column>

        <Column width={120}>
          <HeaderCell>Tenure (Months)</HeaderCell>
          <Cell dataKey='tenure' />
        </Column>
        <Column width={100}>
          <HeaderCell>Interest Type</HeaderCell>
          <NestedCell
            dataKey='interest_type'
            formatCell={(rowData) => (
              <Tag
                className={classNames(
                  get(interestTypeColors, rowData['interest_type']),
                  't-text-white'
                )}
              >
                {upperFirst(toLower(rowData['interest_type']))}
              </Tag>
            )}
          />
        </Column>
        <Column width={100}>
          <HeaderCell>Interest</HeaderCell>
          <Cell dataKey='interest' />
        </Column>
        <Column width={100}>
          <HeaderCell>Status</HeaderCell>
          <NestedCell
            dataKey='status'
            formatCell={(rowData) => (
              <Tag
                className={classNames(
                  get(statusColors, rowData['status']),
                  't-text-white'
                )}
              >
                {upperFirst(toLower(rowData['status']))}
              </Tag>
            )}
          />
        </Column>
        <Column width={200}>
          <HeaderCell>Applicant</HeaderCell>
          <NestedCell
            dataKey='createdFor'
            formatCell={(rowData) => get(rowData, 'createdFor.name')}
          />
        </Column>
        <Column width={100}>
          <HeaderCell>Action</HeaderCell>
          <ActionCell dataKey='id'>
            <ModelAction
              modelName='CreateEditLoanModel'
              icon='edit2'
              tooltip='Edit Loan'
              modelTransform={(rowData) => ({
                type: 'edit',
                id: rowData.id,
                initialValues: omit(rowData, ['_parent', 'children']),
              })}
            />
            <ModelAction
              modelName='DeleteLoanModel'
              icon='trash'
              tooltip='Delete Loan'
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
        activePage={toNumber(loansListMeta.page)}
        displayLength={displayLength}
        total={loansListMeta.total}
        onChangePage={setPage}
        onChangeLength={handleChangeLength}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  loansList: state.loans.loansList,
  loansListMeta: state.loans.loansListMeta,
  loading: state.loans.loading,
});

const mapDispatchToProps = { loadList };

export default connect(mapStateToProps, mapDispatchToProps)(LoansTable);
