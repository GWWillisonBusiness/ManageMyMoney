import React, { useEffect, useState } from "react";
import "./AllTransactionsPage.css";
import { useNavigate } from "react-router-dom";

const AllTransactionsPage = () => {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("transactions");
    setTransactions(stored ? JSON.parse(stored) : []);
  }, []);

  return (
    <div className="transactionsPage">
      <h2>All Transactions</h2>
      <button className="homeButton" onClick={() => navigate("/")}>
        ← Home
      </button>
      <div className="transactionList">
        {transactions.length === 0 ? (
          <p className="empty">No transactions yet.</p>
        ) : (
          transactions.map((txn, index) => (
            <div
              key={index}
              className={`transactionItem ${
                txn.type === "add" ? "add" : "subtract"
              }`}
            >
              <div>
                <strong>{txn.category}</strong> - ${txn.amount.toFixed(2)}
              </div>
              <div className="desc">{txn.description || "No description"}</div>
              <div className="timestamp">
                {new Date(txn.timestamp).toLocaleString()}
              </div>
              <div className="typeLabel">{txn.type.toUpperCase()}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AllTransactionsPage;
