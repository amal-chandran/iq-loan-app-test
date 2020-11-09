import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  FormGroup,
  HelpBlock,
  ControlLabel,
  SelectPicker,
  InputNumber,
  Icon,
} from 'rsuite';
import { Formik, Form } from 'formik';
import { FieldPicker } from '../../FieldControl';
import { loadPickerList } from './../../../store/slices/users.slice';
import { get } from 'lodash';

const LoanForm = ({
  onSubmit,
  initialValues,
  usersPickerList,
  innerRef,
  pickerLoading,
  loadPickerList,
  type,
}) => {
  useEffect(() => {
    if (type === 'edit') loadPickerList(get(initialValues, 'createdBy.name'));
  }, [initialValues, loadPickerList, type]);

  return (
    <div>
      <Formik
        innerRef={innerRef}
        initialValues={initialValues}
        enableReinitialize={true}
        onSubmit={(formData) => {
          // console.log(formData);
          onSubmit(formData);
        }}
      >
        {({ values }) => (
          <Form className='rs-form'>
            <FormGroup>
              <ControlLabel>Principal Amount</ControlLabel>
              <FieldPicker
                className='tw-my-2'
                prefix='₹'
                component={InputNumber}
                min={0}
                name='principal_amount'
                placeholder='eg: 100000'
              />
              <HelpBlock>Principal Amount of the loan</HelpBlock>
            </FormGroup>
            <FormGroup>
              <ControlLabel>Tenure</ControlLabel>
              <FieldPicker
                component={InputNumber}
                className='tw-my-2'
                postfix={<Icon icon='calendar-o' />}
                name='tenure'
                min={0}
                placeholder='eg: 12 months'
              />
              <HelpBlock>Tenure of the loan in months</HelpBlock>
            </FormGroup>
            <FormGroup>
              <ControlLabel>Interest</ControlLabel>
              <FieldPicker
                component={InputNumber}
                className='tw-my-2'
                name='interest'
                postfix='%'
                step={0.1}
                placeholder='eg: 12%'
              />
              <HelpBlock>Interest of the loan in %</HelpBlock>
            </FormGroup>
            <FormGroup>
              <ControlLabel>Interest Type</ControlLabel>
              <div>
                <FieldPicker
                  component={SelectPicker}
                  block
                  searchable={false}
                  data={[
                    {
                      label: 'Fixed',
                      value: 'FIXED',
                    },
                    {
                      label: 'Reducing',
                      value: 'REDUCING',
                    },
                  ]}
                  className='tw-my-2'
                  name='interest_type'
                  placeholder='eg: Fixed'
                />
              </div>
              <HelpBlock>Interest Type of the loan</HelpBlock>
            </FormGroup>
            <FormGroup>
              <ControlLabel>Applicant</ControlLabel>
              <div>
                <FieldPicker
                  component={SelectPicker}
                  block
                  onSearch={(searchKeyword) => loadPickerList(searchKeyword)}
                  onOpen={() => {
                    if (usersPickerList.length === 0) loadPickerList('');
                  }}
                  data={usersPickerList}
                  renderMenu={(menu) => {
                    if (pickerLoading) {
                      return (
                        <p className='t-text-gray-500 t-text-center t-p-2'>
                          <Icon icon='spinner' spin /> Loading...
                        </p>
                      );
                    }
                    return menu;
                  }}
                  className='tw-my-2'
                  name='createdfor'
                  placeholder='eg: Amal Chandran'
                />
              </div>
              <HelpBlock>Applicant of the loan</HelpBlock>
            </FormGroup>
          </Form>
        )}
      </Formik>
    </div>
  );
};

LoanForm.defaultProps = {
  onSubmit: () => {},
  initialValues: {
    principal_amount: '',
    tenure: '',
    interest: '',
    interest_type: 'fixed',
    createdfor: '',
  },
};

const mapStateToProps = (state) => ({
  usersPickerList: state.users.usersPickerList,
  pickerLoading: state.users.loading,
});

const mapDispatchToProps = { loadPickerList };

export default connect(mapStateToProps, mapDispatchToProps)(LoanForm);
