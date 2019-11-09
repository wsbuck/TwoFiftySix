import React from "react";

import {
  Card, Elevation, Radio, RadioGroup, Checkbox, Label
} from "@blueprintjs/core";

export default function PlayerDetailInputs(props) {
  const { season, setSeason } = props;

  return (
    <Card
      interactive={false}
      elevation={Elevation.ONE}
      className='player-detail-container'
    >
      <RadioGroup
        label="Historical Season Data"
        onChange={e => setSeason(e.target.value)}
        selectedValue={season}
        inline
      >
        <Radio label="2015" value="2015" />
        <Radio label="2016" value="2016" />
        <Radio label="2017" value="2017" />
        <Radio label="2018" value="2018" />
      </RadioGroup>
    </Card>
  );
}