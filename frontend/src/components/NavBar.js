import React, { useState, useEffect } from 'react';

import { withRouter } from 'react-router';

import { useAuth } from '../hooks/auth-context';

import {
  Alignment,
  Button,
  Classes,
  Navbar,
  NavbarDivider,
  NavbarGroup,
  NavbarHeading,
} from '@blueprintjs/core';

function NavBar(props) {
  const [darkMode, setDarkMode] = useState(
    matchMedia('(prefers-color-scheme: dark)').matches
  );

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
        <Button className={Classes.MINIMAL} icon="home" text="home" />
        <Button
          className={Classes.MINIMAL}
          icon={darkMode ? 'flash' : 'moon'}
          text={(darkMode ? 'light' : 'dark') + ' mode'}
          onClick={() => setDarkMode(!darkMode)}
        />
      </NavbarGroup>
    </Navbar>
  );
}

export default withRouter(NavBar);