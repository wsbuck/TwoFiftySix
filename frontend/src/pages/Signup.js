import React from 'react';

import { Card, Elevation, H3 } from '@blueprintjs/core';

import { Link } from 'react-router-dom';

import SignupForm from '../components/SignupForm';

export default function Login(props) {
  return (
    <Card 
      elevation={Elevation.ONE}
      className='form-container'
    >
      <H3>User Sign Up</H3>
      <SignupForm />
      <div className='login-links-container'>
        <Link to='/login' variant='body2'>
          Already have an account? Sign in
        </Link>
      </div>
    </Card>
  );
}