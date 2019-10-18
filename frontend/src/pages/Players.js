import React, { useState } from 'react';

import PlayersContainer from '../components/PlayersContainer';
import PlayersFilterForm from '../components/PlayersFilterForm';


export default function Players(props) {
  const [positions, setPositions] = useState(
    ['QB', 'RB', 'WR', 'TE']
  );
  const [first, setFirst] = useState(25);
  const [skip, setSkip] = useState(0);
  const [filter, setFilter] = useState();


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