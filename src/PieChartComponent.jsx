import React, { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "./PieChartComponent.css";

const COLORS = [
  "#ff6b6b", "#4dd599", "#ffd93d", "#1e90ff", "#ff9f1c", "#9b5de5",
  "#00f5d4", "#ff006e", "#8338ec", "#06d6a0", "#f15bb5", "#f46036"
];

const buildDisplayPieData = (categories, totalBudget) => {
  return categories.map((cat) => ({
    name: cat.name,
    remaining: cat.value ?? 0,
    size: (parseFloat(cat.percent) / 100) * totalBudget,
  }));
};

const buildSpentOverlay = (categories, totalBudget) => {
  return categories.flatMap((cat) => {
    const original = (parseFloat(cat.percent) / 100) * totalBudget;
    const spent = Math.max(0, original - (cat.value ?? 0));
    const unspent = original - spent;

    return [
      {
        name: `${cat.name}-spent`,
        value: spent,
        fill: "rgba(0,0,0,0.3)",
      },
      {
        name: `${cat.name}-unspent`,
        value: unspent,
        fill: "transparent",
      },
    ];
  });
};

const PieChartComponent = ({ categories, totalBudget }) => {
  const [initialMonthlyBudget] = useState(() => {
    return parseFloat(localStorage.getItem("totalBudget")) || 0;
  });

  const displayData = buildDisplayPieData(categories, initialMonthlyBudget);
  const spentOverlay = buildSpentOverlay(categories, initialMonthlyBudget);

  const formattedInitial = initialMonthlyBudget.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const formattedRemaining = totalBudget.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={displayData}
          dataKey="size"
          nameKey="name"
          innerRadius={65}
          outerRadius={100}
          label={({ name, payload }) => `${name}: $${payload.remaining.toFixed(2)}`}
        >
          {displayData.map((entry, index) => (
            <Cell key={`base-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>

        <Pie
          data={spentOverlay}
          dataKey="value"
          innerRadius={65}
          outerRadius={100}
        >
          {spentOverlay.map((entry, index) => (
            <Cell key={`overlay-${index}`} fill={entry.fill} stroke="none" />
          ))}
        </Pie>

        {/* Center labels */}
        <text x="50%" y="43%" className="pieChartCenterTextTop">
          ${formattedInitial}
        </text>

        <text x="50%" y="50%" className="pieChartCenterTextBottom">
          ${formattedRemaining}
        </text>

        <Tooltip
          formatter={(value, name, props) => {
            const remaining = props.payload.remaining ?? 0;
            return [`$${remaining.toFixed(2)}`, `${name} (left)`];
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PieChartComponent;
