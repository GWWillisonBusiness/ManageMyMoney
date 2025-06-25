import React from "react";
import "./App.css";
const TotalMoneyComponent = ({ totalMoneyCount }) => {
  return (
    <div className="totalMoneyComponent">
      <h2>Total: ${totalMoneyCount.toFixed(2)}</h2>
    </div>
  );
};

export default TotalMoneyComponent;
