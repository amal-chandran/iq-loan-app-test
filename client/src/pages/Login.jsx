import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Formik, Form } from 'formik';
import { Button, Icon, Input } from 'rsuite';
import { FieldControl } from './../components/FieldControl';
import { Link, navigate } from '@reach/router';
import { login, clearErrors } from '../store/slices/auth.slice';
import { unwrapResult } from '@reduxjs/toolkit';

export class Login extends Component {
  render() {
    return (
      <div className='md:t-flex t-justify-center t-items-center t-min-h-screen'>
        <div className='lg:t-w-1/5 xl:t-w-1/6'>
          <div className='t-bg-white t-p-4 t-shadow-md t-mt-6 md:t-rounded md:t-h-auto t-h-screen'>
            <div className='t-text-center t-py-2 t-font-bold t-text-2xl'>
              <Icon icon='money' size='2x' className='t-pr-2' />
              Loan Book
            </div>
            {this.props.error ? (
              <div className='t-text-red-500 t-bg-red-200 t-p-2 t-rounded t-mb-2'>
                {this.props.error.message}
              </div>
            ) : (
              ''
            )}
            <Formik
              onSubmit={(values) => {
                this.props
                  .login(values)
                  .then(unwrapResult)
                  .then(() => {
                    navigate('/dashboard');
                  })
                  .catch(() => {
                    setTimeout(() => {
                      this.props.clearErrors();
                    }, 4000);
                  });
              }}
              initialValues={{ email: '', password: '' }}
            >
              <Form>
                <div className='t-pb-2'>
                  <label className='t-pb-2 t-block' htmlFor='email'>
                    Email
                  </label>
                  <FieldControl
                    component={Input}
                    placeholder='name@mail-provider.com'
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
                    placeholder='secret-text'
                  />
                </div>
                <div className='t-mt-2 t-flex t-items-center t-justify-between'>
                  <Button color='blue' type='submit'>
                    Log In
                  </Button>
                  <Link className='t-px-1 t-text-center t-block' to='/signup'>
                    New here ?
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
  login,
  clearErrors,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
