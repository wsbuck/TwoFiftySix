import React from "react";

import { Card, Elevation } from '@blueprintjs/core';

import BarChart from "./BarChart";

export default function QBStatCharts(props) {
  const { stats } = props;

  return (
    <Card
      interactive={false}
      elevation={Elevation.ONE}
      className="player-detail-container"
    >
      <h2 className="chart-container-header">Past Season Data</h2>
      <BarChart
        data={stats}
        x="week"
        y="pass_tds"
        xLabel="Week"
        yLabel="Pass TDs"
      />
      <BarChart
        data={stats}
        x="week"
        y="pass_completions"
        xLabel="Week"
        yLabel="Pass Completions"
      />
      <BarChart
        data={stats}
        x="week"
        y="pass_completions"
        xLabel="Week"
        yLabel="Pass Completions"
      />
      <BarChart
        data={stats}
        x="week"
        y="pass_interceptions"
        xLabel="Week"
        yLabel="Pass Interceptions"
      />
    </Card>
  );
}