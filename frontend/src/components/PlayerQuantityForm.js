import React, { useState, useEffect } from 'react';

import { useDispatch } from 'react-redux';

import {
  FormGroup, Button, Card, NumericInput, H3
} from '@blueprintjs/core';

import { useMutation } from '@apollo/react-hooks';

import gql from 'graphql-tag';

import { fetchScoreSetting } from '../redux/actions';

const SCORESETTING_MUTATION = gql`
  mutation ScoreSettingMutation(
    $num_qb: Int!
    $num_rb: Int!
    $num_wr: Int!
    $num_te: Int!
    $num_wrt: Int!
    $num_qwrt: Int!
  ) {
    updateScoreSetting(
      num_qb: $num_qb,
      num_rb: $num_rb,
      num_wr: $num_wr,
      num_te: $num_te,
      num_wrt: $num_wrt,
      num_qwrt: $num_qwrt
    ) {
      id
    }
  }
`;

export default function PlayerQuantityForm({ scoreSetting }) {
  const [numQB, setNumQB] = useState(scoreSetting.num_qb);
  const [numRB, setNumRB] = useState(scoreSetting.num_rb);
  const [numWR, setNumWR] = useState(scoreSetting.num_wr);
  const [numTE, setNumTE] = useState(scoreSetting.num_te);
  const [numWRT, setNumWRT] = useState(scoreSetting.num_wrt);
  const [numQWRT, setNumQWRT] = useState(scoreSetting.num_qwrt);

  const [loading, setLoading] = useState(false);
  const [updateScoreSetting] = useMutation(SCORESETTING_MUTATION);

  const dispatch = useDispatch();

  async function handleSubmit(event) {
    console.log(numQB);
    event.preventDefault();
    setLoading(true);
    await updateScoreSetting({
      variables: {
        num_qb: numQB,
        num_rb: numRB,
        num_wr: numWR,
        num_te: numTE,
        num_wrt: numWRT,
        num_qwrt: numQWRT,
      }
    })
    .then((resp) => {
      setLoading(false);
      dispatch(fetchScoreSetting());
    })
    .catch((error) => {
      setLoading(false);
      console.log(error)
    })
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
            onValueChange={val => setNumQB(val)}
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
            onValueChange={val => setNumRB(val)}
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
            onValueChange={val => setNumWR(val)}
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
            onValueChange={val => setNumTE(val)}
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
            onValueChange={val => setNumWRT(val)}
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
            onValueChange={val => setNumQWRT(val)}
            value={numQWRT}
            max={5}
            min={0}
            minorStepSize={1}
          />
        </FormGroup>
        <Button
          id="submit-button"
          type="submit"
          loading={loading}
        >
          Submit
      </Button>
      </form>
    </Card>

  );
}