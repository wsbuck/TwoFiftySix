import React from 'react';

import { Card, Elevation, H3 } from '@blueprintjs/core';

import { Link } from 'react-router-dom';

import LoginForm from '../components/LoginForm';

export default function Login(props) {
  return (
    <Card 
      elevation={Elevation.ONE}
      className='form-container'
    >
      <H3>User Sign In</H3>
      <LoginForm />
      <div className='login-links-container'>
        <Link to="#" variant='body2'>
          Forgot password?
        </Link>
        <Link to='/signup' variant='body2'>
          Don't have an account? Sign up
        </Link>
      </div>
    </Card>
  );
}