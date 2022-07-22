import React from "react";
import Typography from "@mui/material/Typography";
import {
  PieChart,
  Pie,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function Graph(props) {
  return (
    // <Chart height={160} width={200} data={props.data}>
    //   <ArgumentAxis showLabels={false} />
    //   <Title text={props.title} size={12} />
    //   <SplineSeries valueField="value" argumentField="argument" />
    // </Chart>
    <>
      <ResponsiveContainer width="100%" height="80%">
        <LineChart
          width={200}
          height={350}
          data={props.data}
          margin={{
            top: 10,
            right: 10,
            left: 0,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#008ac1"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
      <Typography sx={{ textAlign: "center", fontSize: 15 }}>
        {props.title}
      </Typography>
    </>
  );
}

export default Graph;
