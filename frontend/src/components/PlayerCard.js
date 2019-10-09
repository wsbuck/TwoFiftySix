import React, { useState } from 'react';

import { Button, Card, Elevation, H5 } from '@blueprintjs/core';


export default function PlayerCard(props) {

  return (
    <Card
      className='player-card'
      elevation={Elevation.ONE}
      interactive={true}
    >
      <H5>Tom Brady</H5>
      <p>Position: QB</p>
      <Button>Go</Button>
    </Card>
  );
}