import React, { useState, useEffect } from 'react';

import { withRouter } from 'react-router';

import PlayersContainer from '../components/PlayersContainer';
import PlayersFilterForm from '../components/PlayersFilterForm';

import { useAuth } from '../hooks/auth-context';


function Players(props) {
  const [auth, ] = useAuth();
  const [positions, setPositions] = useState(
    ['QB', 'RB', 'WR', 'TE']
  );
  const [first, setFirst] = useState(25);
  const [skip, setSkip] = useState(0);
  const [filter, setFilter] = useState();

  useEffect(() => {
    if (!auth.isLoggedIn) {
      props.history.push('/login');
    }
  }, [auth.isLoggedIn, props.history]);


  return (
    <div className='players-page-container'>
      <PlayersFilterForm
        positions={positions}
        setPositions={setPositions}
        filter={filter}
        setFilter={setFilter}
      />
      <PlayersContainer
        filter={filter}
        first={first}
        skip={skip}
        setFirst={setFirst}
        setSkip={setSkip}
        position={positions}
      />
    </div>
  );
}

export default withRouter(Players);