import React from 'react';

import { withRouter } from 'react-router';

import { Card, Elevation, H5 } from '@blueprintjs/core';

import clsx from 'clsx';


function PlayerCard(props) {
  const { player, loading } = props;

  function handleClick() {
    props.history.push(`/player/${player.id}`);
  }

  return(
    <Card
      className={clsx('player-card', loading && 'bp3-skeleton')}
      elevation={Elevation.ONE}
      interactive={true}
      onClick={() => handleClick()}
    >
      <H5>{ player.name }</H5>
      <p className='bp3-text-muted player-card-position'>
        { player.position }
      </p>
    </Card>
  );
}

export default withRouter(PlayerCard);