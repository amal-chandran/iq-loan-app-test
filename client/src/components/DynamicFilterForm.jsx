import React from 'react';
import { Form, Formik } from 'formik';
import {
  fromPairs,
  get,
  isDate,
  isEmpty,
  isNumber,
  isString,
  toPairs,
} from 'lodash';
import { connect } from 'react-redux';
import {
  InputNumber,
  Input,
  SelectPicker,
  DatePicker,
  Whisper,
  Tooltip,
} from 'rsuite';
import { FieldPicker, FieldControl } from './FieldControl';
import * as moment from 'moment';
const typeFields = { FieldPicker, FieldControl };

const components = { InputNumber, Input, SelectPicker, DatePicker };

const DynamicFilterForm = ({
  innerRef,
  onSubmit,
  dynamicSpec,
  containerProps,
}) => {
  const FieldList = dynamicSpec.map((FieldSpec, index) => {
    const Field = get(typeFields, FieldSpec.typeField);
    const fieldClassName = FieldSpec.className || 't-pt-2 t-pr-2 t-w-1/4';

    return (
      <div className={fieldClassName} key={index}>
        <Whisper
          placement='top'
          trigger='hover'
          speaker={<Tooltip>{FieldSpec.placeholder}</Tooltip>}
        >
          <Field
            name={FieldSpec.name}
            placeholder={FieldSpec.placeholder}
            component={get(components, FieldSpec.component)}
            {...FieldSpec.extraProps}
          />
        </Whisper>
      </div>
    );
  });

  const initialPair = dynamicSpec.map((FieldSpec) => [
    FieldSpec.name,
    FieldSpec.initialValue,
  ]);

  const initialValues = fromPairs(initialPair);

  return (
    <Formik
      innerRef={innerRef}
      initialValues={initialValues}
      enableReinitialize={true}
      onSubmit={(formData) => {
        const filterPairs = toPairs(formData);
        // console.log(filterPairs);
        const stringfilterPairs = filterPairs
          .map(([key, value]) => {
            let newValue = value;

            if (isDate(value)) {
              newValue = moment(value).toISOString();
              return { id: `gte$${key}$date`, value: newValue };
            }

            return { id: key, value: newValue };
          })
          .filter(
            ({ id, value }) =>
              (isString(value) && !isEmpty(value)) || isNumber(value)
          );

        onSubmit(stringfilterPairs);
      }}
    >
      {({ values }) => (
        <Form className='t-flex t-flex-wrap t-pb-2' {...containerProps}>
          {FieldList}
        </Form>
      )}
    </Formik>
  );
};

DynamicFilterForm.defaultProps = {
  onSubmit: () => {},
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(DynamicFilterForm);
