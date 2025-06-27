import React, { useEffect } from "react";
import "./App.css";
const TotalMoneyComponent = ({totalBalance}) => {
  return (
    <div className="totalMoneyComponent">
      <h2>Total: ${totalBalance.toFixed(2)}</h2>
    </div>
  );
};

export default TotalMoneyComponent;
