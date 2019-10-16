import React from 'react';

import {
  Card, Elevation, H5, Button
} from '@blueprintjs/core';

import PositionFilter from './PositionFilter';


export default function PlayersFilterForm(props) {

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <Card elevation={Elevation.ZERO} className='players-filter-form'>
      <form onSubmit={(e) => handleSubmit(e)}>
        <H5>Players Filter</H5>
        <PositionFilter
          positions={props.positions}
          setPositions={props.setPositions}
        />
        <Button onClick={(e) => handleSubmit(e)}>
          Filter
        </Button>
      </form>
    </Card>
  );
}