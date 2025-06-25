import React from "react";
const TotalMoneyComponent = ({ totalMoneyCount }) => {
  return (
    <div className="totalMoneyComponent">
      <h2>Total Amount of Money: ${totalMoneyCount.toFixed(2)}</h2>
    </div>
  );
};

export default TotalMoneyComponent;
