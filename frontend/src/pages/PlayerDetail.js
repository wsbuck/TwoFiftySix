import React, { useEffect } from 'react';

import  { withRouter } from 'react-router';

import  { useAuth } from '../hooks/auth-context';

import PlayerDetailContainer from '../components/PlayerDetailContainer';

function PlayerDetail(props) {
  const [auth, ] = useAuth();
  const playerID = props.match.params.id;

  useEffect(() => {
    if (!auth.isLoggedIn) {
      props.history.push('/login');
    }
  }, [auth.isLoggedIn, props.history]);

  return (
    <div className='player-detail-page'>
      <PlayerDetailContainer playerID={playerID} season={"2018"} />
    </div>
  );
}

export default withRouter(PlayerDetail);