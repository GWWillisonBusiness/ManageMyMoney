import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Sample budget data MODIFY LATER
// This data can be replaced with actual budget entries
const data = [
  { name: "Rent", value: 400.99 },
  { name: "Groceries", value: 300 },
  { name: "Entertainment", value: 200 },
  { name: "Savings", value: 100 },
];

const total = data.reduce((sum, entry) => sum + entry.value, 0);

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff6666"];

const PieChartComponent = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          innerRadius={65}
          outerRadius={100}
          fill="#8884d8"
          label
        >
          {data.map((entry, index) => (
            <Cell key={`slice-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>

        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={18}
          fontWeight="bold"
          fill="#ffffff"
        >
          ${total}
        </text>

        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PieChartComponent;
