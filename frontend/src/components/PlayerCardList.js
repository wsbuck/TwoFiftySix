import React, { useState, useEffect } from 'react';

import { useQuery, useLazyQuery } from '@apollo/react-hooks';

import  gql from 'graphql-tag';

import PlayerCard from './PlayerCard';

const GET_PLAYERS = gql`
  query playerFeedQuery($filter: String, $skip: Int, $first: Int) {
    playerFeed(filter: $filter, skip: $skip, first: $first) {
      Players {
        id
        name
        position
      }
    }
  }
`;

export default function PlayerCardList(props) {
  const [players, setPlayers] = useState([]);
  const [getPlayers, { loading, data }] = useLazyQuery(GET_PLAYERS);

  if (loading) return <p>loading</p>;

  if (data) {
    console.log(data);
    setPlayers(data.players);
  }


  // const players = [
  //   { key: 0, name: 'Tom Brady', position: 'QB' },
  //   { key: 1, name: 'Sammy Watkins', position: 'WR' },
  //   { key: 2, name: 'David Johnson', position: 'RB' },
  // ]

  return (
    <div className='player-list'>
      <button onClick={() => getPlayers({ variables: {filter: 'QB'}})}>hey</button>
      {
        players.map(player => (
          <PlayerCard player={player} key={player.key} />
        ))
      }
    </div>
  );
}