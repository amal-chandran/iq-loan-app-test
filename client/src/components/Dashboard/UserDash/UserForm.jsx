import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  FormGroup,
  Input,
  HelpBlock,
  ControlLabel,
  Whisper,
  Tooltip,
  SelectPicker,
} from 'rsuite';
import { Formik, Form, Field } from 'formik';
import { FieldControl, FieldPicker } from '../../FieldControl';

class UserForm extends Component {
  static defaultProps = {
    onSubmit: () => {},
    initialValues: {
      name: '',
      email: '',
      password: '',
      changePassword: true,
      role: '',
    },
  };

  componentDidMount() {}

  render() {
    const { onSubmit, initialValues, innerRef, type } = this.props;
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
          {({ values }) => (
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
                <ControlLabel>Password</ControlLabel>
                <div className='t-flex t-justify-center t-items-center'>
                  <FieldControl
                    component={Input}
                    className='tw-my-2'
                    type='password'
                    name='password'
                    disabled={!values.changePassword && type === 'edit'}
                    placeholder='eg: #secret@'
                  />
                  {type === 'edit' ? (
                    <Whisper
                      placement='top'
                      trigger='hover'
                      speaker={<Tooltip>Change Password</Tooltip>}
                    >
                      <Field
                        name='changePassword'
                        className='t-m-2'
                        type='checkbox'
                      />
                    </Whisper>
                  ) : (
                    ''
                  )}
                </div>
                <HelpBlock>Password should be complex</HelpBlock>
              </FormGroup>
              <FormGroup>
                <ControlLabel>Role</ControlLabel>
                <div>
                  <FieldPicker
                    component={SelectPicker}
                    block
                    searchable={false}
                    data={[
                      {
                        label: 'Customer',
                        value: 'customer',
                      },
                      {
                        label: 'Agent',
                        value: 'agent',
                      },
                      {
                        label: 'Admin',
                        value: 'admin',
                      },
                    ]}
                    className='tw-my-2'
                    name='role'
                    placeholder='eg: admin'
                  />
                </div>
                <HelpBlock>Role of the user</HelpBlock>
              </FormGroup>
            </Form>
          )}
        </Formik>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(UserForm);
