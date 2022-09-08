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
    <>
      <ResponsiveContainer width="100%" height="85%">
        <LineChart
          width={200}
          height={350}
          data={props.data}
          margin={{
            top: 20,
            right: 10,
            left: 15,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" label={{ value: props.xaxis}} tick={false}/>
          <YAxis dataKey="value" sx={{mt: 20}} tickCount={1} label={{ value: props.yaxis, angle: -90, position: 'insideBottomLeft' }}/>
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
