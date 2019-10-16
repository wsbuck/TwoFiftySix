import React, { useState } from 'react';

import PlayersContainer from '../components/PlayersContainer';
import PlayersFilterForm from '../components/PlayersFilterForm';


export default function Players(props) {
  const [positions, setPositions] = useState(
    ['QB', 'RB', 'WR', 'TE']
  );


  return (
    <div className='players-page-container'>
      <PlayersFilterForm
        positions={positions}

        setPositions={setPositions}
      />
      <PlayersContainer
        filter=''
        first={25}
        skip={0}
        position={positions}
      />
    </div>
  );
}