import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types';

import { useLazyQuery } from "@apollo/react-hooks";

import gql from "graphql-tag";

import PlayerCardList from './PlayerCardList';

import { useAuth } from '../hooks/auth-context';

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
      hasNextPage
    }
  }
`;


function PlayersContainer(props) {
  const [, setAuth] = useAuth();
  const [players, setPlayers] = useState([]);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [getPlayers, { loading, data, error }] = useLazyQuery(GET_PLAYERS);
  const { filter, skip, first, position } = props;

  useEffect(() => {
    getPlayers({
      variables: {
        filter: filter,
        skip: skip,
        first: first,
        position: position
    },
  });
  }, [getPlayers, filter, skip, first, position]);

  useEffect(() => {
    if (error && error.graphQLErrors[0].message === "Not authenticated") {
      setAuth({ type: 'logout' });
    }
    if (data) {
      if (data.playerFeed) {
        setPlayers(data.playerFeed.players);
        setHasNextPage(data.playerFeed.hasNextPage);
      }
    } else {
      setPlayers([]);
    }
  }, [data, error, setAuth]);

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
          hasNextPage={hasNextPage}
        />
      }
    </div>
  );
}

PlayersContainer.propTypes = {
  filter: PropTypes.string,
  skip: PropTypes.number.isRequired,
  first: PropTypes.number.isRequired,
  position: PropTypes.array,
};

export default PlayersContainer;