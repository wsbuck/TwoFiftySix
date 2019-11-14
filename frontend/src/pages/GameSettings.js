import React, { useEffect } from 'react';

import { withRouter } from 'react-router';

import { useAuth } from '../hooks/auth-context';

import PlayerQuantityForm from '../components/PlayerQuantityForm';

function GameSettings(props) {
  const [auth, ] = useAuth();

  useEffect(() => {
    if (!auth.isLoggedIn) {
      props.history.push('/login');
    }
  }, [auth.isLoggedIn, props.history]);

  return (
    <div className="game-settings-container">
      <PlayerQuantityForm />
    </div>
  );
}

export default withRouter(GameSettings);