import React, { useState } from 'react';

import { Button, Card, Elevation, H5 } from '@blueprintjs/core';


export default function PlayerCard(props) {
  const {player} = props;

  return (
    <Card
      className='player-card'
      elevation={Elevation.ONE}
      interactive={true}
    >
      <H5>{ player.name }</H5>
      <p>Position: { player.position }</p>
      <Button>Go</Button>
    </Card>
  );
}