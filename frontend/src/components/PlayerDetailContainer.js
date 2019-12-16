import React, { useState, useEffect } from "react";
import gql from "graphql-tag";
import { useLazyQuery } from "@apollo/react-hooks";
import { Spinner } from "@blueprintjs/core";

// import PropTypes from 'prop-types';

import PlayerHeader from "./PlayerHeader";
import QBStatCharts from "./QBStatCharts";
import PlayerDetailInputs from "./PlayerDetailInputs";

const GET_PLAYER = gql`
  query playerDetailQuery($id: String, $season: [String]) {
    playerDetail(id: $id, season: $season) {
      player {
        id
        name
        position
      }
      stats {
        week
        season
        pass_tds
        pass_completions
        pass_yards
        pass_interceptions
      }
    }
  }
`;

export default function PlayerDetailContainer(props) {
  // const [player, setPlayer] = useState({ name: "" });
  const [player, setPlayer] = useState();
  const [stats, setStats] = useState([]);
  const [season, setSeason] = useState("2018");
  const [getPlayer, { loading, data, error }] = useLazyQuery(GET_PLAYER);
  const { playerID } = props;

  function prepareStats(stats) {
    setStats(stats);
  }

  useEffect(() => {
    getPlayer({
      variables: {
        id: playerID,
        season: [season]
      }
    });
  }, [playerID, getPlayer, season]);

  useEffect(() => {
    if (data) {
      setPlayer(data.playerDetail.player);
      prepareStats(data.playerDetail.stats);
    }
    if (error) {
      console.log(error.message);
    }
  }, [loading, data, error]);

  return player ? (
    <>
      <PlayerHeader playerName={player.name} />
      <PlayerDetailInputs season={season} setSeason={setSeason} />
      {player.position === "QB" && (
        <QBStatCharts stats={stats} loading={loading} />
      )}
    </>
  ) : (
    <div className="spinner-container">
      <Spinner size={100} />
    </div>
  );
}