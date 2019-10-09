import React from 'react';

import PlayerCard from './PlayerCard';

export default function PlayerCardList(props) {

  const players = [
    { key: 0, name: 'Tom Brady' },
    { key: 1, name: 'Sammy Watkins' },
    { key: 2, name: 'David Johnson' },
  ]

  return (
    <div className='player-list'>
      {
        players.map(player => (
          <PlayerCard player={player} key={player.key} />
        ))
      }
    </div>
  );
}