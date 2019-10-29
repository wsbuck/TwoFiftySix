import React, { useState, useEffect } from 'react';

import gql from 'graphql-tag';

import { useLazyQuery } from "@apollo/react-hooks";

// import PropTypes from 'prop-types';

import PlayerHeader from './PlayerHeader';

const GET_PLAYER = gql`
  query playerDetail($id: String) {
    playerDetail(id: $id) {
      player {
        id
        name
      }
    }
  }
`;

export default function PlayerDetailContainer(props) {
  const [player, setPlayer] = useState({name: ""});
  const [getPlayer, { loading, data, error }] = useLazyQuery(GET_PLAYER);
  const { playerID } = props;

  useEffect(() => {
    getPlayer({ variables: { id: playerID }});
  }, [getPlayer, playerID]);

  useEffect(() => {
    if (data) {
      setPlayer(data.playerDetail.player);
    }
    if (error) {
      console.log(error.message);
    }
  }, [loading, data, error]);

  return (
    <PlayerHeader playerName={player.name} />
  );
}