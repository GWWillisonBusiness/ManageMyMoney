import React, { useEffect, useState } from "react";
import "./AllTransactionsPage.css";
import { useNavigate } from "react-router-dom";

const AllTransactionsPage = () => {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [months, setMonths] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("transactions");
    const txns = stored ? JSON.parse(stored) : [];
    setTransactions(txns);

    // Extract unique months from all transactions (even old ones)
    const uniqueMonthsSet = new Set();
    txns.forEach((txn) => {
      const date = new Date(txn.timestamp);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const key = `${year}-${String(month).padStart(2, "0")}`;
      uniqueMonthsSet.add(key);
    });

    // Add current month if not already present
    const now = new Date();
    const currentMonthKey = `${now.getFullYear()}-${String(
      now.getMonth() + 1
    ).padStart(2, "0")}`;
    uniqueMonthsSet.add(currentMonthKey);

    const sortedMonths = Array.from(uniqueMonthsSet).sort((a, b) =>
      b.localeCompare(a)
    );
    setMonths(sortedMonths);
    setSelectedMonth(currentMonthKey);
  }, []);

  const filteredTxns = transactions.filter((txn) => {
    const d = new Date(txn.timestamp);
    const txnMonth = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
      2,
      "0"
    )}`;
    return txnMonth === selectedMonth;
  });

  const categoryTotals = {};
  let totalSpent = 0;

  filteredTxns.forEach((txn) => {
    if (txn.type === "subtract") {
      totalSpent += txn.amount;
      if (txn.category) {
        categoryTotals[txn.category] =
          (categoryTotals[txn.category] || 0) + txn.amount;
      }
    }
  });

  return (
    <div className="transactionsPage">
      <h2>All Transactions</h2>
      <button className="homeButton" onClick={() => navigate("/")}>
        ← Home
      </button>

      {months.length > 0 && (
        <div className="monthSelector">
          <label htmlFor="month">Select Month:</label>
          <select
            id="month"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            {months.map((month) => (
              <option key={month} value={month}>
                {new Date(`${month}-01T00:00:00`).toLocaleString("default", {
                  month: "long",
                  year: "numeric",
                })}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="categoryBreakdown">
        <h3>Spending Breakdown</h3>
        {totalSpent === 0 ? (
          <p>No spending for this month.</p>
        ) : (
          <ul>
            {Object.entries(categoryTotals)
              .filter(([cat]) => cat.toLowerCase() !== "no category")
              .map(([cat, amt]) => (
                <li key={cat}>
                  <strong>{cat}:</strong> ${amt.toFixed(2)}
                </li>
              ))}
            <li
              style={{
                marginTop: "1rem",
                fontWeight: "bold",
                color: "#ffd700",
              }}
            >
              Total Spent: ${totalSpent.toFixed(2)}
            </li>
          </ul>
        )}
      </div>

      <div className="transactionList">
        <h3>Transactions</h3>
        {filteredTxns.length === 0 ? (
          <p className="empty">No transactions yet.</p>
        ) : (
          filteredTxns.map((txn, index) => (
            <div
              key={index}
              className={`transactionItem ${
                txn.type === "add" ? "add" : "subtract"
              }`}
            >
              <div>
                <strong>{txn.category || "No category"}</strong> - $
                {txn.amount.toFixed(2)}
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
