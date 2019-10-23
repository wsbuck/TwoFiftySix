import React, { useState, useEffect } from "react";

import PlayerCard from "./PlayerCard";
import PlayerListPagination from "./PlayerListPagination";

export default function PlayerCardList(props) {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    setPlayers(
      props.players.length > 0 
      ? props.players 
      : [...Array(25).keys()]
    );
  }, [props.players])

  return (
    <div className="player-list">
      <PlayerListPagination
        first={props.first}
        setFirst={props.setFirst}
        skip={props.skip}
        setSkip={props.setSkip}
        hasNextPage={props.hasNextPage}
      />
      {players.map(player => (
        <PlayerCard
          player={player}
          key={player.id ? player.id : player}
          loading={props.loading}
        />
      ))}
      <PlayerListPagination
        first={props.first}
        setFirst={props.setFirst}
        skip={props.skip}
        setSkip={props.setSkip}
        hasNextPage={props.hasNextPage}
      />
    </div>
  );
}