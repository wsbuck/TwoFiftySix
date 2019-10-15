import React from 'react';

import PlayersContainer from '../components/PlayersContainer';
import PlayersFilterForm from '../components/PlayersFilterForm';


export default function Players(props) {

  return (
    <div className='players-page-container'>
      <PlayersFilterForm />
      <PlayersContainer
        // className='players-container'
        filter=''
        first={25}
        skip={0}
      />
    </div>
  );
}