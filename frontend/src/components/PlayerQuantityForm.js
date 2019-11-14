import React, { useState } from 'react';

import {
  FormGroup, Button, Card, NumericInput, H3
} from '@blueprintjs/core';

// import { useMutation } from '@apollo/react-hooks';

// import gql from 'graphql-tag';

export default function PlayerQuantityForm(props) {
  const [numQB, setNumQB] = useState(1);
  const [numRB, setNumRB] = useState(2);
  const [numWR, setNumWR] = useState(2);
  const [numTE, setNumTE] = useState(1);
  const [numWRT, setNumWRT] = useState(1);
  const [numQWRT, setNumQWRT] = useState(1);


  function handleSubmit(event) {
    console.log(event);
  }

  return (
    <Card className='setting-form'>
      <H3>Roster Position Settings</H3>
      <form onSubmit={e => handleSubmit(e)}>
        <FormGroup
          label="Quarterbacks"
          inline
          className="form-group-inline"
        >
          <NumericInput
            className='player-quantity-input'
            allowNumericCharactersOnly
            onChange={e => setNumQB(e.target.value)}
            value={numQB}
            max={5}
            min={0}
            minorStepSize={1}
          />
        </FormGroup>
        <FormGroup
          label="Runningbacks"
          inline
          className="form-group-inline"
        >
          <NumericInput
            className='player-quantity-input'
            allowNumericCharactersOnly
            onChange={e => setNumRB(e.target.value)}
            value={numRB}
            max={5}
            min={0}
            minorStepSize={1}
          />
        </FormGroup>
        <FormGroup
          label="Wide Receivers"
          inline
          className="form-group-inline"
        >
          <NumericInput
            className='player-quantity-input'
            allowNumericCharactersOnly
            onChange={e => setNumWR(e.target.value)}
            value={numWR}
            max={5}
            min={0}
            minorStepSize={1}
          />
        </FormGroup>
        <FormGroup
          label="Tight Ends"
          inline
          className="form-group-inline"
        >
          <NumericInput
            className='player-quantity-input'
            allowNumericCharactersOnly
            onChange={e => setNumTE(e.target.value)}
            value={numTE}
            max={5}
            min={0}
            minorStepSize={1}
          />
        </FormGroup>
        <FormGroup
          label="WR/RB/TE"
          inline
          className="form-group-inline"
        >
          <NumericInput
            className='player-quantity-input'
            allowNumericCharactersOnly
            onChange={e => setNumWRT(e.target.value)}
            value={numWRT}
            max={5}
            min={0}
            minorStepSize={1}
          />
        </FormGroup>
        <FormGroup
          label="QB/WR/RB/TE"
          inline
          className="form-group-inline"
        >
          <NumericInput
            className='player-quantity-input'
            allowNumericCharactersOnly
            onChange={e => setNumQWRT(e.target.value)}
            value={numQWRT}
            max={5}
            min={0}
            minorStepSize={1}
          />
        </FormGroup>
        <Button
          id="submit-button"
          type="submit"
          // loading={loading}
        >
          Submit
      </Button>
      </form>
    </Card>

  );
}