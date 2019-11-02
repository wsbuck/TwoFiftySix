import React from 'react';

import { 
  VictoryBar,
  VictoryChart,
  // VictoryTheme,
  VictoryAxis,
  // VictoryLabel
} from 'victory';

export default function BarChart(props) {
  const { data, x, y, xLabel, yLabel } = props;

  return (
    <div className='barchart-container'>
      <VictoryChart
         animate={{ duration: 500 }}
         domainPadding={15}
      >
        <VictoryAxis 
          label={xLabel}
          style={{
            axis: { stroke: "#BFCCD6" },
            axisLabel: { fill: "#BFCCD6" },
            tickLabels: { fill: "#BFCCD6"}
          }}
        />
        <VictoryAxis
          dependentAxis
          label={yLabel}
          style={{
            axis: { stroke: "#BFCCD6" },
            axisLabel: { fill: "#BFCCD6" },
            tickLabels: { fill: "#BFCCD6"}
          }}
        />
        <VictoryBar
          data={data}
          x={x}
          y={y}
          style={{
            data: {
              fill: "#48AFF0", stroke: "#2B95D6", width: 14,
              strokeWidth: 2, fillOpacity: 0.7,
            },
            labels: { fill: "red", stroke: "red" }
          }}
        />
      </VictoryChart>
    </div>
  );
}