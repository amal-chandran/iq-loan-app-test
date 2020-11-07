import { Field as FormikField } from 'formik';

// Component : InputNumber,Input
export const FieldControl = ({ name, component: Component, ...props }) => (
  <FormikField name={name}>
    {({ field, form, meta }) => {
      return (
        <Component
          {...props}
          {...field}
          onChange={(v, e) => field.onChange(e)}
          name={name}
        ></Component>
      );
    }}
  </FormikField>
);

export const FieldPicker = ({ name, component: Component, ...props }) => (
  <FormikField name={name}>
    {({ field, form, meta }) => {
      return (
        <Component
          value={field.value}
          {...props}
          onChange={(value, e) => form.setFieldValue(name, value)}
          name={name}
        ></Component>
      );
    }}
  </FormikField>
);
