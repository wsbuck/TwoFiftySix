import React from 'react';

export default function PlayerHeader(props) {
  const { playerName } = props;
  return (
    <div className='player-detail-header'>
      <h2>{playerName}</h2>
    </div>
  );
}