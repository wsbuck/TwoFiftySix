import React from 'react';

// import PlayerCardList from '../components/PlayerCardList';
import PlayersContainer from '../components/PlayersContainer';


export default function Players(props) {

  return (
    <PlayersContainer filter='QB' first={25} skip={0} />
  );
}