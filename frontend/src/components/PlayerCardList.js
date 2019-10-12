import React from "react";

import PlayerCard from "./PlayerCard";

export default function PlayerCardList(props) {
  const { players } = props;

  return (
    <div className="player-list">
      {
        players.map(player => (
          <PlayerCard player={player} key={player.id} />
        ))
      }
    </div>
  );
}