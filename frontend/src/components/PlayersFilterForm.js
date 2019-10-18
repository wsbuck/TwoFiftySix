import React from 'react';

import PropTypes from 'prop-types';

import {
  Card, Elevation, H5, InputGroup, Button, Tooltip
} from '@blueprintjs/core';

import PositionFilter from './PositionFilter';


function PlayersFilterForm(props) {
  const { filter, setFilter, positions, setPositions } = props;

  const clearButton = (
    <Tooltip content={`Clear Content`}>
      <Button
        icon="cross"
        onClick={() => setFilter('')}
      />
    </Tooltip>
  )

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <Card elevation={Elevation.ZERO} className='players-filter-form'>
      <form onSubmit={(e) => handleSubmit(e)}>
        <H5>Players Filter</H5>
        <InputGroup
          large
          value={filter}
          onChange={(e) => setFilter(e.target.value) }
          placeholder="Name Filter..."
          rightElement={clearButton}
        />
        <PositionFilter
          positions={positions}
          setPositions={setPositions}
        />
      </form>
    </Card>
  );
}


PlayersFilterForm.propTypes = {
  filter: PropTypes.string.isRequired,
  positions: PropTypes.string.isRequired,
  setFilter: PropTypes.func.isRequired,
  setPositions: PropTypes.func.isRequired,
}

export default PlayersFilterForm;