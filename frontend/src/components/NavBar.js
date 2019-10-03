import React from 'react';

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
  return (
    <Navbar>
      <NavbarGroup align={Alignment.LEFT}>
        <NavbarHeading>TwoFiftySix</NavbarHeading>
        <NavbarDivider />
        <Button className={Classes.MINIMAL} icon="home" text="home" />
      </NavbarGroup>
    </Navbar>
  );
}

export default withRouter(NavBar);