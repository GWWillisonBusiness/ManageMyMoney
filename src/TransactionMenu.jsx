import React, { useState } from "react";
import "./TransactionMenu.css";

const TransactionMenu = ({ onSubmit, onClose, show, categories }) => {
  const [amount, setAmount] = useState("");
  const [transactionType, setTransactionType] = useState("subtract");
  const [categoryType, setCategoryType] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    const number = parseFloat(amount);
    if (isNaN(number) || number <= 0) return;
    onSubmit(transactionType, number, categoryType, description);
    setAmount("");
    setTransactionType("add");
    setCategoryType("");
    setDescription("");
    onClose();
  };

  return (
    <div className={`taskOverlay ${show ? "show" : ""}`} onClick={onClose}>
      <div className="transactionPopup" onClick={(e) => e.stopPropagation()}>
        <h3>{transactionType === "add" ? "Add Money" : "Subtract Money"}</h3>

        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter Amount"
        />

        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description (optional)"
        />

        <select
          value={transactionType}
          onChange={(e) => setTransactionType(e.target.value)}
        >
          <option value="add">Add</option>
          <option value="subtract">Subtract</option>
        </select>

        <select
          value={categoryType}
          onChange={(e) => setCategoryType(e.target.value)}
        >
          <option value="">No Category</option>
          {categories.map((cat, idx) => (
            <option key={idx} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>

        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default TransactionMenu;
