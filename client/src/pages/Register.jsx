import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Formik, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { FieldControl } from './../components/FieldControl';
import { Button, Icon, Input } from 'rsuite';
import { Link } from '@reach/router';
import { register, clearErrors } from './../store/slices/auth.slice';
import { navigate } from '@reach/router';
import { unwrapResult } from '@reduxjs/toolkit';

const registerSchema = yup.object().shape({
  name: yup.string().required().min(4),
  email: yup.string().email().required(),
  password: yup.string().required().min(8),
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
            {this.props.error ? (
              <div className='t-text-red-500 t-bg-red-200 t-p-2 t-rounded t-mb-2'>
                {this.props.error.message}
              </div>
            ) : (
              ''
            )}
            <Formik
              validationSchema={registerSchema}
              onSubmit={(values) => {
                this.props
                  .register(values)
                  .then(unwrapResult)

                  .then(() => {
                    navigate('/login');
                  })
                  .catch(() => {
                    setTimeout(() => {
                      this.props.clearErrors();
                    }, 4000);
                  });
              }}
              initialValues={{ name: '', email: '', password: '' }}
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
                  <ErrorMessage
                    name='name'
                    component='div'
                    className='t-text-red-400 t-py-2'
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
                  <ErrorMessage
                    name='email'
                    component='div'
                    className='t-text-red-400 t-py-2'
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
                  <ErrorMessage
                    name='password'
                    component='div'
                    className='t-text-red-400 t-py-2'
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

const mapStateToProps = (state) => ({
  error: state.auth.error,
});

const mapDispatchToProps = {
  register,
  clearErrors,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
