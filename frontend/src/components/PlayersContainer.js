import React, { useState, useEffect } from 'react';

import { useLazyQuery } from "@apollo/react-hooks";

import gql from "graphql-tag";

import { Spinner } from '@blueprintjs/core';

import PlayerCardList from './PlayerCardList';

const GET_PLAYERS = gql`
  query playerFeedQuery($skip: Int, $first: Int, $filter: String) {
    playerFeed(skip: $skip, first: $first, filter: $filter) {
      players {
        id
        name
        position
      }
    }
  }
`;

export default function PlayersContainer(props) {
  const [players, setPlayers] = useState([]);
  const [getPlayers, { loading, data }] = useLazyQuery(GET_PLAYERS);
  const { filter, skip, first } = props;

  useEffect(() => {
    getPlayers({
      variables: {
        filter: filter,
        skip: skip,
        first: first,
    }});
  }, [getPlayers, filter, skip, first]);

  useEffect(() => {
    if (data && data.playerFeed.players) {
      setPlayers(data.playerFeed.players);
    } else {
      setPlayers([]);
    }
  }, [data]);

  return (
    <div className='players-container'>
      {
        loading
        ? <Spinner className='players-spinner' />
        : <PlayerCardList players={players} />
      }
    </div>
  );
}