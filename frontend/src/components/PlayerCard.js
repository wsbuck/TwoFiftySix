import React from 'react';

import { Card, Elevation, H5 } from '@blueprintjs/core';


export default function PlayerCard(props) {
  const { player } = props;
  return(
    <Card
      className='player-card'
      elevation={Elevation.ONE}
      interactive={true}
    >
      <H5>{ player.name }</H5>
      <p className='bp3-text-muted player-card-position'>
        { player.position }
      </p>
    </Card>
  );
}