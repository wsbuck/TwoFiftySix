import React, { useState, useEffect } from 'react';

import { withRouter } from 'react-router';

import {
  Alignment,
  Button,
  Navbar,
  NavbarDivider,
  NavbarGroup,
  NavbarHeading,
} from '@blueprintjs/core';

import { useAuth } from '../hooks/auth-context';

import { logoutUser } from '../utils';

function NavBar(props) {
  const [auth, setAuth] = useAuth();
  const [darkMode, setDarkMode] = useState(
    matchMedia('(prefers-color-scheme: dark)').matches
  );

  async function handleLogout() {
    await logoutUser();
    setAuth({ type: 'logout'})
  }

  useEffect(() => {
    if (darkMode) {
      document.querySelector('body').classList.add('bp3-dark');
    } else {
      document.querySelector('body').classList.remove('bp3-dark');
    }
  }, [darkMode])
  
  return (
    <Navbar>
      <NavbarGroup align={Alignment.LEFT}>
        <NavbarHeading>TwoFiftySix</NavbarHeading>
        <NavbarDivider />
        <Button
          minimal
          icon="home"
          text="home"
          onClick={() => props.history.push('/')}
        />
        <Button
          minimal
          icon={darkMode ? 'flash' : 'moon'}
          text={(darkMode ? 'light' : 'dark') + ' mode'}
          onClick={() => setDarkMode(!darkMode)}
        />
      </NavbarGroup>
      <NavbarGroup align={Alignment.RIGHT}>
        {
          !auth.isLoggedIn
          ? (
            <Button
              minimal
              icon='log-in'
              text='sign in'
              onClick={() => props.history.push('/login')}
            />
          )
          : (
            <Button
              minimal
              icon='log-out'
              text='sign out'
              onClick={() => handleLogout()}
            />
          )
        }
      </NavbarGroup>
    </Navbar>
  );
}

export default withRouter(NavBar);