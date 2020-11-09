import React from 'react';
import { connect } from 'react-redux';
import { Modal, Button } from 'rsuite';

import { toggleModel } from './../store/slices/model.slice';
import get from 'lodash/get';

export default function FormModelCreate(modelName, title, size = 'md') {
  class FormModel extends React.Component {
    static defaultProps = {
      type: 'create',
      submitForm: () => {},
      submitWithData: false,
      metaData: {
        plain: {
          title,
          noFooter: true,
        },
        create: {
          title: `New ${title}`,
          submitLabel: 'Create',
          cancelLabel: 'Cancel',
          noFooter: false,
        },
        edit: {
          title: `Edit ${title}`,
          submitLabel: 'Save',
          cancelLabel: 'Cancel',
          noFooter: false,
        },
        delete: {
          title: `Delete ${title}`,
          submitLabel: 'Yes',
          cancelLabel: 'No',
          noFooter: false,
        },
      },
    };

    handleModel = () => {
      this.props.toggleModel(modelName);
    };

    render() {
      const {
        type,
        status,
        submitWithData,
        submitForm,
        data,
        metaData,
        children,
      } = this.props;
      return (
        <div>
          <Modal show={status} onHide={this.handleModel} size={size}>
            <Modal.Header>
              <Modal.Title>{metaData[type].title}</Modal.Title>
            </Modal.Header>
            <Modal.Body className='t-mt-4'>{children(data)}</Modal.Body>
            {!metaData[type].noFooter ? (
              <Modal.Footer>
                <Button
                  onClick={() => {
                    submitWithData ? submitForm(data) : submitForm();
                  }}
                  appearance='primary'
                >
                  {metaData[type].submitLabel}
                </Button>
                <Button onClick={this.handleModel} appearance='subtle'>
                  {metaData[type].cancelLabel}
                </Button>
              </Modal.Footer>
            ) : (
              ''
            )}
          </Modal>
        </div>
      );
    }
  }

  const mapStateToProps = (state) => ({
    data: get(state, `model.${modelName}.data`),
    type: get(state, `model.${modelName}.data.type`, 'create'),
    status: get(state, `model.${modelName}.status`),
  });

  const mapDispatchToProps = {
    toggleModel,
  };

  return connect(mapStateToProps, mapDispatchToProps)(FormModel);
}
