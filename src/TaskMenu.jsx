import React, { useState } from "react";
import "./App.css"; // or wherever your styles are

const TaskMenu = ({ onSubmit, onClose, show }) => {
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("add");

  const handleSubmit = () => {
    const num = parseFloat(amount);
    if (isNaN(num) || num <= 0) return;
    onSubmit(type, num);
    setAmount("");
    setType("add");
    onClose();
  };

  return (
    <div className={`taskOverlay ${show ? "show" : ""}`} onClick={onClose}>
      <div className="taskPanel" onClick={(e) => e.stopPropagation()}>
        <h3>{type === "add" ? "Add Money" : "Subtract Money"}</h3>

        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          style={{ marginBottom: "1rem", padding: "0.5rem", width: "95%" }}
        />

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          style={{ marginBottom: "1rem", padding: "0.5rem", width: "100%" }}
        >
          <option value="add">Add</option>
          <option value="subtract">Subtract</option>
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

export default TaskMenu;
