import React, { useState, useEffect } from 'react';

import {
  FormGroup, InputGroup, Tooltip, Button, Intent
} from '@blueprintjs/core';

import gql from 'graphql-tag';

import { useMutation } from '@apollo/react-hooks';

import { withRouter } from 'react-router';

import { useAuth } from '../hooks/auth-context';

import { AUTH_TOKEN_NAME } from '../constants';

const SIGNUP_MUTATION = gql`
  mutation SignupMutation(
    $email: String!,
    $password: String!,
    $name: String!
  ) {
    signup(email: $email, password: $password, name: $name) {
      token
    }
  }
`;

function SignupForm(props) {
  const [auth, setAuth] = useAuth();
  const [signupUser] = useMutation(SIGNUP_MUTATION);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [name, setName] = useState('');
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

  async function handleSignup(event) {
    event.preventDefault();
    await signupUser({
      variables: {
        email: email,
        password: password,
        name: name
      }
    })
      .then((resp) => {
        console.log(resp);
        saveToken(resp.data.signup.token);
        setAuth({ type: 'login' });
      })
      .catch((e) => {
        console.log(e);
        alertError()
      });
  }

  function saveToken(token) {
    localStorage.setItem(AUTH_TOKEN_NAME, token);
  }

  function alertError() {
    console.log('error');
  }

  useEffect(() => {
    if (auth.isLoggedIn) {
      props.history.push('/');
    }
  }, [auth, props.history]);

  return (
    <>
      <form onSubmit={e => handleSignup(e)}>
        <FormGroup
          label="Name"
          labelFor="user-name"
          labelInfo="(required)"
        >
          <InputGroup
            large
            required
            leftIcon="user"
            placeholder="Name"
            value={name}
            onChange={e => setName(e.target.value)}
            type="text"
          />
        </FormGroup>
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
            required
            large
            leftIcon="lock"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            type={showPassword ? 'text' : 'password'}
            rightElement={lockButton}
          />
        </FormGroup>
        <FormGroup
          label="Repeat Password"
          labelFor="user-pass2"
          labelInfo="(required)"
          intent='danger'
        >
          <InputGroup
            required
            large
            leftIcon="lock"
            placeholder="Password"
            value={password2}
            onChange={e => setPassword2(e.target.value)}
            type={showPassword ? 'text' : 'password'}
            rightElement={lockButton}
            intent={(password !== password2) ? 'danger' : ''}
          />
        </FormGroup>
        <Button
          type="submit"
        >
          Submit
      </Button>
      </form>
    </>
  );
}

export default withRouter(SignupForm);