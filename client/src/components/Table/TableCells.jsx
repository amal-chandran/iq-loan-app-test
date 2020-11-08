import React, { cloneElement, Children } from 'react';
import { Table, Avatar } from 'rsuite';
import random from 'lodash/random';
import { avatarText } from './../../helpers/text-format.helper';
import { get, isFunction } from 'lodash';
const { Cell } = Table;

export const ActionCell = ({ rowData, dataKey, children, ...props }) => {
  let childElements = Children.map(children, (el) =>
    cloneElement(el, { dataKey, rowData })
  );
  return (
    <Cell {...props} style={{ padding: 0 }} className='link-group t-p-0'>
      <div className='t-p-1'>{childElements}</div>
    </Cell>
  );
};

export const ContainerCell = ({ rowData, dataKey, children, ...props }) => {
  let childElements = Children.map(children, (el) =>
    cloneElement(el, { rowData, ...props })
  );
  return childElements;
};

const colorClassList = [
  't-bg-green-500',
  't-bg-red-500',
  't-bg-blue-500',
  't-bg-teal-500',
  't-bg-orange-500',
  't-bg-yellow-500',
  't-bg-pink-500',
];

const colorClassMax = colorClassList.length - 1;

export const AvatarCell = ({ rowData, dataKey, ...props }) => {
  const randomClass = colorClassList[random(0, colorClassMax, false)];
  return (
    <Cell {...props} className='no-padding'>
      <div className=' t-flex t-justify-center t-items-center t-h-full'>
        <Avatar circle size='sm' className={randomClass}>
          {avatarText(rowData[dataKey])}
        </Avatar>
      </div>
    </Cell>
  );
};

export const NestedCell = ({
  rowData,
  dataKey,
  noPadding,
  formatCell,
  isVisible,
  ...props
}) =>
  isVisible(rowData) ? (
    <Cell {...props} style={{ padding: noPadding ? 0 : 'auto' }}>
      {isFunction(formatCell) ? formatCell(rowData) : get(rowData, dataKey)}
    </Cell>
  ) : null;

NestedCell.defaultProps = {
  formatCell: null,
  isVisible: () => true,
};
