import React, { useState, useEffect } from 'react';

import {
  FormGroup, InputGroup, Tooltip, Button, Intent
} from '@blueprintjs/core';

import gql from 'graphql-tag';

import { useMutation } from '@apollo/react-hooks';

import { withRouter } from 'react-router';

import { useAuth } from '../hooks/auth-context';

import { AUTH_TOKEN_NAME } from '../constants';

import ErrorLoginDialog from './ErrorLoginDialog';

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

function LoginForm(props) {
  const [auth, setAuth] = useAuth();

  const [loginUser] = useMutation(LOGIN_MUTATION);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);


  const lockButton = (
    <Tooltip
      content={`${showPassword ? "Hide" : "Show"} Password`}
    >
      <Button
        icon={showPassword ? "eye-open" : "eye-off"}
        intent={Intent.WARNING}
        minimal={true}
        onClick={() => setShowPassword(!showPassword)}
      />
    </Tooltip>
  );

  async function handleLogin(event) {
    event.preventDefault();
    await loginUser({
      variables: {
        email: email,
        password: password
      }
    })
      .then((resp) => {
        saveToken(resp.data.login.token);
        setAuth({ type: 'login' });
      })
      .catch((e) => alertError());
  }

  function saveToken(token) {
    localStorage.setItem(AUTH_TOKEN_NAME, token);
  }

  function alertError() {
    setError(true);
  }

  function dismissError() {
    setError(false);
  }

  useEffect(() => {
    if (auth.isLoggedIn) {
      props.history.push('/');
    }
  }, [auth, props.history]);

  return (
    <>
      <ErrorLoginDialog isOpen={error} dismissError={dismissError} />
      <form onSubmit={e => handleLogin(e)}>
        <FormGroup
          label="Email"
          labelFor="user-email"
          labelInfo="(required)"
        >
          <InputGroup
            large
            required
            leftIcon="envelope"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            type="email"
          />
        </FormGroup>
        <FormGroup
          label="Password"
          labelFor="user-pass"
          labelInfo="(required)"
        >
          <InputGroup
            large
            required
            leftIcon="lock"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            type={showPassword ? 'text' : 'password'}
            rightElement={lockButton}
          />
        </FormGroup>
        <Button
          type="submit"
        // onClick={e => handleLogin(e)}
        >
          Submit
      </Button>
      </form>
    </>
  )
}

export default withRouter(LoginForm);