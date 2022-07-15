import React from "react";
import {
  ArgumentAxis,
  ValueAxis,
  Title,
  Chart,
  SplineSeries,
} from "@devexpress/dx-react-chart-material-ui";

function Graph(props) {
  return (
    <Chart height={160} width={200} data={props.data}>
      <ArgumentAxis showLabels={false} />
      <Title text={props.title} size={12} />
      <SplineSeries valueField="value" argumentField="argument" />
    </Chart>
  );
}

export default Graph;
