import React, { useState } from "react";
import "./App.css"; // or wherever your styles are

const TransactionMenu = ({ onSubmit, onClose, show }) => {
  const [amount, setAmount] = useState("");
  const [transactionType, setTransactionType] = useState("add");
  const [categoryType, setCategoryType] = useState("");

  const handleSubmit = () => {
    const number = parseFloat(amount);
    if (isNaN(number) || number <= 0) return;
    onSubmit(transactionType, number);
    setAmount("");
    setTransactionType("add");
    onClose();
  };

  return (
    //Note: In Second Select Statement I need to add the categories to it!
    <div className={`taskOverlay ${show ? "show" : ""}`} onClick={onClose}>
      <div className="taskPanel" onClick={(e) => e.stopPropagation()}>
        <h3>{transactionType === "add" ? "Add Money" : "Subtract Money"}</h3>

        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter Amount"
          style={{ marginBottom: "1rem", padding: "0.5rem", width: "95%" }}
        />

        <select
          value={transactionType}
          onChange={(e) => setTransactionType(e.target.value)}
          style={{ marginBottom: "1rem", padding: "0.5rem", width: "100%" }}
        >
          <option value="add">Add</option>
          <option value="subtract">Subtract</option>
        </select>

        <select
          value={categoryType}
          onChange={(e) => setCategoryType(e.target.value)}
          style={{ marginBottom: "1rem", padding: "0.5rem", width: "100%" }}
        >
          <option value="1">Categories</option>
          <option value="2">Categories 2</option>
        </select>

        <button
          onClick={handleSubmit}
          style={{ padding: "0.5rem", width: "100%" }}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default TransactionMenu;
