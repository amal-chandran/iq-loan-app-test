import React from 'react';
import { connect } from 'react-redux';
import { openModel } from './../../store/slices/model.slice';
import { Whisper, IconButton, Icon, Tooltip } from 'rsuite';

const ModelActionClass = ({
  openModel,
  tooltip,
  icon,
  modelName,
  rowData,
  modelTransform,
  isVisible,
}) => {
  return isVisible(rowData) ? (
    <Whisper
      placement='top'
      trigger='hover'
      speaker={<Tooltip>{tooltip}</Tooltip>}
    >
      <IconButton
        appearance='subtle'
        onClick={() => {
          openModel({ name: modelName, data: modelTransform(rowData) });
        }}
        icon={<Icon icon={icon} />}
      />
    </Whisper>
  ) : (
    ''
  );
};

ModelActionClass.defaultProps = {
  tooltip: '',
  icon: '',
  modelName: '',
  rowData: {},
  modelTransform: (rowData) => rowData,
  isVisible: () => true,
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
  openModel,
};

export const ModelAction = connect(
  mapStateToProps,
  mapDispatchToProps
)(ModelActionClass);
