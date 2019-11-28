import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  FormGroup, Button, Card, NumericInput, H3
} from '@blueprintjs/core';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import clsx from 'clsx';

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

export default function PlayerQuantityForm({ scoreSetting, isFetching }) {
  const [numQB, setNumQB] = useState(0);
  const [numRB, setNumRB] = useState(0);
  const [numWR, setNumWR] = useState(0);
  const [numTE, setNumTE] = useState(0);
  const [numWRT, setNumWRT] = useState(0);
  const [numQWRT, setNumQWRT] = useState(0);

  const [loading, setLoading] = useState(false);
  const [updateScoreSetting] = useMutation(SCORESETTING_MUTATION);

  const dispatch = useDispatch();

  useEffect(() => {
    setNumQB(scoreSetting.num_qb);
    setNumRB(scoreSetting.num_rb);
    setNumWR(scoreSetting.num_wr);
    setNumTE(scoreSetting.num_te);
    setNumWRT(scoreSetting.num_wrt);
    setNumQWRT(scoreSetting.num_qwrt);
  }, [scoreSetting])

  async function handleSubmit(event) {
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
    .then(() => {
      setLoading(false);
      dispatch(fetchScoreSetting());
    })
    .catch((error) => {
      setLoading(false);
      console.log(error)
    })
  }

  return (
    <Card className={clsx('setting-form', isFetching && 'bp3-skeleton')}>
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