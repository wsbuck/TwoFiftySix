import React from 'react';

import { withRouter } from 'react-router';

import { useSelector, useDispatch } from 'react-redux';

import {
  Alignment,
  Button,
  Navbar,
  NavbarDivider,
  NavbarGroup,
  NavbarHeading,
  Popover,
  Menu,
  MenuItem,
  Position,
} from '@blueprintjs/core';

import { useAuth } from '../hooks/auth-context';

// import { useDarkMode } from '../hooks/dark-mode-context';

import { logoutUser } from '../utils';

function NavBar(props) {
  const [auth, setAuth] = useAuth();
  // const [darkMode, setDarkMode] = useDarkMode();
  const darkMode = useSelector(state => state.darkMode);
  const dispatch = useDispatch();

  const mobileMenu = (
    <Menu large>
      <MenuItem
        large
        icon='home'
        text='home'
        onClick={() => props.history.push('/')}
      />
      <MenuItem
        large
        icon='person'
        text='players'
        onClick={() => props.history.push('/players')}
      />
      <MenuItem
        large
        icon='cog'
        text='settings'
        onClick={() => props.history.push('/settings')}
      />
      <MenuItem
        icon={darkMode ? 'flash' : 'moon'}
        text={darkMode ? 'light mode' : 'dark mode'}
        // onClick={() => setDarkMode(!darkMode)}
        onClick={() => dispatch({ type: 'TOGGLE_DARKMODE' })}
      />
      {
        !auth.isLoggedIn
          ? (
            <MenuItem
              icon='log-in'
              text='sign in'
              onClick={() => props.history.push('/login')}
            />
          )
          : (
            <MenuItem
              icon='log-out'
              text='sign out'
              onClick={() => handleLogout()}
            />
          )
      }
    </Menu>
  );

  async function handleLogout() {
    await logoutUser();
    setAuth({ type: 'logout' })
  }

  return (
    <Navbar>
      <NavbarGroup align={Alignment.LEFT}>
        <NavbarHeading>TwoFiftySix</NavbarHeading>
        <NavbarDivider />
      </NavbarGroup>
      <NavbarGroup className='navbar-group-desktop' align={Alignment.LEFT}>
          <Button
            minimal
            icon="home"
            text="Home"
            onClick={() => props.history.push('/')}
          />
        <Button
          minimal
          icon="person"
          text="Players"
          onClick={() => props.history.push('/players')}
        />
        <Button
          minimal
          icon="cog"
          text="Settings"
          onClick={() => props.history.push('/settings')}
        />
      </NavbarGroup>
      <NavbarGroup className='navbar-group-desktop' align={Alignment.RIGHT}>
        <Button
          minimal
          icon={darkMode ? 'flash' : 'moon'}
          // onClick={() => setDarkMode(!darkMode)}
          onClick={() => dispatch({ type: 'TOGGLE_DARKMODE' })}
        />
        {
          !auth.isLoggedIn
            ? (
              <Button
                minimal
                icon='log-in'
                text='Sign In'
                onClick={() => props.history.push('/login')}
              />
            )
            : (
              <Button
                minimal
                icon='log-out'
                text='Sign Out'
                onClick={() => handleLogout()}
              />
            )
        }
      </NavbarGroup>
      <NavbarGroup className='navbar-group-mobile' align={Alignment.RIGHT}>
        <Popover content={mobileMenu} position={Position.BOTTOM}>
          <Button
            icon="menu"
          />
        </Popover>
      </NavbarGroup>
    </Navbar>
  );
}

export default withRouter(NavBar);