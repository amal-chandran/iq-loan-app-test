import React, { Component, useState } from 'react';
import { connect } from 'react-redux';
import { Table } from 'rsuite';
import fakeData from './users.json';
const { Column, Cell, HeaderCell, Pagination } = Table;

export const UsersTable = () => {
  const [page, setPage] = useState(1);
  const [displayLength, setDisplayLength] = useState(10);

  const handleChangeLength = (dataKey) => {
    setDisplayLength(dataKey);
    setPage(1);
  };

  const getData = () => {
    return fakeData.filter((v, i) => {
      const start = displayLength * (page - 1);
      const end = start + displayLength;
      return i >= start && i < end;
    });
  };
  const data = getData();
  return (
    <div>
      <Table height={420} data={data}>
        <Column width={50} align='center' fixed>
          <HeaderCell>Id</HeaderCell>
          <Cell dataKey='id' />
        </Column>

        <Column width={100} fixed>
          <HeaderCell>First Name</HeaderCell>
          <Cell dataKey='firstName' />
        </Column>

        <Column width={100}>
          <HeaderCell>Last Name</HeaderCell>
          <Cell dataKey='lastName' />
        </Column>

        <Column width={200}>
          <HeaderCell>City</HeaderCell>
          <Cell dataKey='city' />
        </Column>
        <Column width={200} flexGrow={1}>
          <HeaderCell>Company Name</HeaderCell>
          <Cell dataKey='companyName' />
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
        total={fakeData.length}
        onChangePage={setPage}
        onChangeLength={handleChangeLength}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(UsersTable);
