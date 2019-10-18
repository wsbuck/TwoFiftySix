import React from 'react';

import { Card, Elevation, H5 } from '@blueprintjs/core';

import clsx from 'clsx';


export default function PlayerCard(props) {
  const { player, loading } = props;
  return(
    <Card
      className={clsx('player-card', loading && 'bp3-skeleton')}
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