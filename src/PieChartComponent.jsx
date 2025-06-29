import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { useState, useEffect } from "react";

const COLORS = [
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#ff6666",
  "#00C49F",
  "#FFBB28",
];

const PieChartComponent = ({ categories, totalBudget }) => {
  const totalUsed = categories.reduce((sum, cat) => sum + (cat.value || 0), 0);

  const [initialMonthlyBudget, setInitialMonthlyBudget] = useState(() => {
    return parseFloat(localStorage.getItem("totalBudget")) || 0;
  });

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={categories}
          dataKey="value"
          nameKey="name"
          innerRadius={65}
          outerRadius={100}
          label={({ name, value }) => `${name}: $${value.toFixed(2)}`}
        >
          {categories.map((entry, index) => (
            <Cell key={`slice-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>

        <text
          x="50%"
          y="45%"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={12}
          fill="#aaa"
        >
          ${initialMonthlyBudget.toFixed(2)}
        </text>

        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={18}
          fontWeight="bold"
          fill="#ffffff"
        >
          ${totalBudget.toFixed(2)}
        </text>

        <Tooltip formatter={(value, name) => [`$${value.toFixed(2)}`, name]} />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PieChartComponent;
