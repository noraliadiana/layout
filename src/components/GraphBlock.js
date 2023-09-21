import React from "react";
import PropTypes from "prop-types";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Cell
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const GraphBlock = ({ type, data, width, height }) => {
  switch (type) {
    case "pie":
      return (
        <PieChart width={width} height={height}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      );
    case "line":
      return (
        <LineChart
          width={width}
          height={height}
          data={data}
          margin={{ left: 10, right: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1} />
          <XAxis dataKey="time" />
          <YAxis dataKey="value" mirror />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#0075ff"
            dot={false}
            isAnimationActive={false}
          />
          <Tooltip cursor={true} />
        </LineChart>
      );
    case "bar":
      return (
        <BarChart
          width={width}
          height={height}
          data={data}
          margin={{ left: 10, right: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1} />
          <XAxis dataKey="time" />
          <YAxis dataKey="value" mirror />
          <Bar dataKey="value" fill="#0075ff" isAnimationActive={false} />
          <Tooltip cursor={true} />
        </BarChart>
      );
    case "area":
      return (
        <AreaChart
          width={width}
          height={height}
          data={data}
          margin={{ left: 10, right: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1} />
          <XAxis dataKey="time" />
          <YAxis dataKey="value" mirror />
          <Area
            dataKey="value"
            fill="#0075ff"
            stroke="#0075ff"
            isAnimationActive={false}
          />
          <Tooltip cursor={true} />
        </AreaChart>
      );
    default:
      return null;
  }
};

GraphBlock.propTypes = {
  type: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired
};

export default GraphBlock;
