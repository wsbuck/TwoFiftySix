import React, { useState, useEffect } from 'react';

import { useDarkMode } from '../hooks/dark-mode-context';

import { 
  VictoryBar,
  VictoryChart,
  VictoryTooltip,
  VictoryGroup,
  VictoryLegend,
  // VictoryTheme,
  VictoryAxis,
  // VictoryLabel
} from 'victory';

export default function BarChart(props) {
  const { data, x, y, xLabel, yLabel } = props;
  const [darkMode,] = useDarkMode();
  const [chartColor, setChartColor] = useState(
    darkMode ? "BFCCD6" : "#394B59"
  );
  const barWidth = 10;
  
  useEffect(() => {
    setChartColor(darkMode ? "#BFCCD6" : "#394B59");
  }, [darkMode]);

  return (
    <div className='barchart-container'>
      <VictoryChart
         animate={{
           duration: 300,
           onLoad: { duration: 500 }
        }}
         domainPadding={15}
      >
        <VictoryAxis 
          label={xLabel}
          style={{
            axis: { stroke: chartColor },
            axisLabel: { fill: chartColor, padding: 30 },
            tickLabels: { fill: chartColor },
          }}
        />
        <VictoryAxis
          dependentAxis
          label={yLabel}
          style={{
            axis: { stroke: chartColor },
            axisLabel: { fill: chartColor, padding: 30 },
            tickLabels: { fill: chartColor },
          }}
        />
          <VictoryBar
            data={data}
            x={x}
            y={y}
            barWidth={barWidth}
            labels={({ datum }) => `${datum[y]}`}
            labelComponent={
              <VictoryTooltip
                style={{ fill: 'black' }}
              />
            }
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