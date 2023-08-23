/* eslint-disable max-classes-per-file */
/* eslint-disable react/no-multi-comp */
import React from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";

const LineChart = ({ data }) => {
  return (
    <ResponsiveContainer width={"100%"} height={350}>
      
      <AreaChart
        data={data}
        syncId="anyId"
        margin={{
          top: 10,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="5 5" />
        <XAxis dataKey="name" attributeName={"date"} />
        {/* <YAxis /> */}
        <Tooltip />
        <Area
          type="linear"
          dataKey="pv"
          stroke="#065F46"
          fill="#065F46"
          fillOpacity={1}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default LineChart;
