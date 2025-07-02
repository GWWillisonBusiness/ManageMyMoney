import React, { useEffect } from "react";
import "./App.css";

const TotalMoneyComponent = ({ totalBalance }) => {
  const formattedBalance = totalBalance.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <div className="totalMoneyComponent">
      <h2>Total: ${formattedBalance}</h2>
    </div>
  );
};

export default TotalMoneyComponent;
