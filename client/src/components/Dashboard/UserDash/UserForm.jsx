import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormGroup, Input, HelpBlock, ControlLabel } from 'rsuite';
import { Formik, Form } from 'formik';
import { FieldControl } from '../../FieldControl';

import get from 'lodash/get';

export class UserForm extends Component {
  static defaultProps = {
    onSubmit: () => {},
    initialValues: {
      name: '',
      email: '',
      phone: '',
    },
  };

  componentDidMount() {}

  render() {
    const { onSubmit, initialValues, innerRef } = this.props;
    return (
      <div>
        <Formik
          innerRef={innerRef}
          initialValues={initialValues}
          enableReinitialize={true}
          onSubmit={(formData) => {
            onSubmit(formData);
          }}
        >
          <Form className='rs-form'>
            <FormGroup>
              <ControlLabel>Name</ControlLabel>
              <FieldControl
                className='tw-my-2'
                component={Input}
                name='name'
                placeholder='eg: Amal Chandran'
              />
              <HelpBlock>Name of the user</HelpBlock>
            </FormGroup>
            <FormGroup>
              <ControlLabel>Email</ControlLabel>
              <FieldControl
                component={Input}
                className='tw-my-2'
                name='email'
                placeholder='eg: amalchandrandev@gmail.com'
              />
              <HelpBlock>Email of the user (Must be unique)</HelpBlock>
            </FormGroup>
            <FormGroup>
              <ControlLabel>Phone</ControlLabel>
              <FieldControl
                component={Input}
                className='tw-my-2'
                name='phone'
                placeholder='eg: 8113993984'
              />
              <HelpBlock>Phone number of the user (Must be unique)</HelpBlock>
            </FormGroup>
          </Form>
        </Formik>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  tag_picker: get(state, 'tag_categories.tag_picker', []),
  loading: get(state, `products.loading`),
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(UserForm);
