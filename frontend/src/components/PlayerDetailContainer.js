import React, { useState, useEffect } from 'react';

import gql from 'graphql-tag';

import { useLazyQuery } from "@apollo/react-hooks";

// import PropTypes from 'prop-types';

import PlayerHeader from './PlayerHeader';
import QBStatCharts from './QBStatCharts';

const GET_PLAYER = gql`
  query playerDetailQuery(
    $id: String,
    $season: [String]
  ) {
    playerDetail(
      id: $id,
      season: $season
    ) {
      player {
        id
        name
        position
      }
      stats {
        week
        pass_tds
        pass_completions
        pass_yards
      }
    }
  }
`;

export default function PlayerDetailContainer(props) {
  const [player, setPlayer] = useState({name: ""});
  const [stats, setStats] = useState([]);
  const [getPlayer, { loading, data, error }] = useLazyQuery(GET_PLAYER);
  const { playerID } = props;

  function prepareStats(stats) {
    setStats(stats);
  }

  useEffect(() => {
    getPlayer({ variables: {
      id: playerID,
      season: ["2018"]
    }});
  }, [playerID, getPlayer]);

  useEffect(() => {
    if (data) {
      setPlayer(data.playerDetail.player);
      prepareStats(data.playerDetail.stats);
    }
    if (error) {
      console.log(error.message);
    }
  }, [loading, data, error]);

  return (
    <>
      <PlayerHeader playerName={player.name} />
      { player.position === 'QB' ? <QBStatCharts stats={stats} /> : "" }
      {/* <BarChart 
        data={stats}
        x="week"
        y="pass_tds"
        xLabel="Week"
        yLabel="Pass TDs"
      /> */}
    </>
  );
}