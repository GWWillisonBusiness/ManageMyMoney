import React from "react";
import "./RecentTransactions.css";

const RecentTransactions = ({ transactions }) => {
  const recent = [...transactions].slice(0, 5); // Assumes newest at top

  return (
    <div className="recentTransactionsContainer">
      <h3>Recent Transactions</h3>
      {recent.length === 0 ? (
        <p className="recentTransactionEmpty">No transactions yet.</p>
      ) : (
        <ul className="recentTransactionsList">
          {recent.map((tx, idx) => (
            <li key={idx} className="recentTransactionItem">
              <span className="recentTransactionCategory">
                <strong>{tx.category || "No Category"}</strong>
              </span>{" "}
              –{" "}
              <span
                className={`recentTransactionAmount ${tx.type === "add" ? "add" : "subtract"}`}
              >
                {tx.type === "add" ? "+" : "-"}${parseFloat(tx.amount).toFixed(2)}
              </span>
              <br />
              <div className="recentTransactionDate">
                {new Date(tx.timestamp).toLocaleString()}
              </div>
              {tx.description && (
                <div className="recentTransactionDescription">
                  {tx.description}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RecentTransactions;
