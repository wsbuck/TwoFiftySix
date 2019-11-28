import React, { useEffect } from 'react';

import { withRouter } from 'react-router';

import { useSelector } from 'react-redux';

import { useAuth } from '../hooks/auth-context';

import PlayerQuantityForm from '../components/PlayerQuantityForm';

function GameSettings(props) {
  const [auth, ] = useAuth();
  const scoreSetting = useSelector(state => state.scoreSetting.setting);
  const isFetching = useSelector(state => state.scoreSetting.isFetching);

  useEffect(() => {
    if (!auth.isLoggedIn) {
      props.history.push('/login');
    }
  }, [auth.isLoggedIn, props.history]);

  return (
    <div className="game-settings-container">
      {/* {!isFetching && (
        <PlayerQuantityForm
          scoreSetting={scoreSetting}
        />
      )}
      {isFetching && (
        <Spinner />
      )} */}
      <PlayerQuantityForm
        scoreSetting={scoreSetting}
        isFetching={isFetching}
      />
    </div>
  );
}

export default withRouter(GameSettings);