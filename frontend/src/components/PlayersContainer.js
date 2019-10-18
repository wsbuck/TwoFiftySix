import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types';

import { useLazyQuery } from "@apollo/react-hooks";

import gql from "graphql-tag";

import PlayerCardList from './PlayerCardList';

const GET_PLAYERS = gql`
  query playerFeedQuery(
    $skip: Int, 
    $first: Int,
    $filter: String,
    $position: [String]
    ) {
    playerFeed(
      skip: $skip,
      first: $first,
      filter: $filter,
      position: $position,
      orderBy: name_ASC
      ) {
      players {
        id
        name
        position
      }
    }
  }
`;


function PlayersContainer(props) {
  const [players, setPlayers] = useState([]);
  const [getPlayers, { loading, data }] = useLazyQuery(GET_PLAYERS);
  const { filter, skip, first, position } = props;

  useEffect(() => {
    getPlayers({
      variables: {
        filter: filter,
        skip: skip,
        first: first,
        position: position
    }});
  }, [getPlayers, filter, skip, first, position]);

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
        <PlayerCardList
          players={players}
          skip={props.skip}
          first={props.first}
          setSkip={props.setSkip}
          setFirst={props.setFirst}
          loading={loading}
        />
      }
    </div>
  );
}

PlayersContainer.propTypes = {
  filter: PropTypes.string.isRequired,
  skip: PropTypes.number.isRequired,
  first: PropTypes.number.isRequired,
  position: PropTypes.arrayOf.isRequired,
};

export default PlayersContainer;