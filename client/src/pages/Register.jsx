import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { register } from '../store/actions/appActions';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import { FieldControl } from './../components/FieldControl';
import { Button, Icon, Input } from 'rsuite';
import { Link } from '@reach/router';
const registerSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  phone: yup.string().required(),
  password: yup.string().required(),
});

export class Login extends Component {
  render() {
    return (
      <div className='md:t-flex t-justify-center t-items-center t-min-h-screen'>
        <div className='lg:t-w-1/5 xl:t-w-1/6'>
          <div className='t-bg-white t-p-4 t-shadow-md t-mt-6 md:t-rounded md:t-h-auto t-h-screen'>
            <div className='t-text-center t-py-2 t-font-bold t-text-2xl'>
              <Icon icon='money' size='2x' className='t-pr-2' />
              Loan Book
              <div className='t-text-sm t-font-thin  t-text-gray-500'>
                Start a new loan book !
              </div>
            </div>
            <Formik
              validationSchema={registerSchema}
              onSubmit={(values) => {
                // this.props.register(values);
              }}
              initialValues={{ name: '', email: '', phone: '', password: '' }}
            >
              <Form>
                <div className='t-pb-2'>
                  <label className='t-pb-2 t-block' htmlFor='name'>
                    Name
                  </label>
                  <FieldControl
                    component={Input}
                    placeholder='Name'
                    name='name'
                  />
                </div>
                <div className='t-pb-2'>
                  <label className='t-pb-2 t-block' htmlFor='phone'>
                    Phone
                  </label>
                  <FieldControl
                    component={Input}
                    name='phone'
                    placeholder='Phone'
                  />
                </div>
                <div className='t-pb-2'>
                  <label className='t-pb-2 t-block' htmlFor='email'>
                    Email
                  </label>
                  <FieldControl
                    component={Input}
                    placeholder='Email'
                    name='email'
                  />
                </div>
                <div className='t-pb-2'>
                  <label className='t-pb-2 t-block' htmlFor='password'>
                    Password
                  </label>
                  <FieldControl
                    component={Input}
                    type='password'
                    name='password'
                    placeholder='Password'
                  />
                </div>
                <div className='t-mt-2 t-flex t-items-center t-justify-between'>
                  <Button color='blue' type='submit'>
                    Sign Up
                  </Button>
                  <Link className='t-px-1 t-text-center t-block' to='/login'>
                    Already joined ?
                  </Link>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
  // register
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
