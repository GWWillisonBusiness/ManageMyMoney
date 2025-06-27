import { useState, useEffect } from "react";
import "./App.css";
import PieChartComponent from "./PieChartComponent";
import TotalMoneyComponent from "./TotalMoneyComponent";
import TaskMenu from "./TaskMenu";

function App() {
  const [totalBalance, setTotalBalance] = useState(() => {
    const stored = localStorage.getItem("totalBalance");
    return stored ? parseFloat(stored) : 0;
  });
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [inputTotalAmount, setInputTotalAmount] = useState("");

  // Load from localStorage on first render
  useEffect(() => {
    const storedTotalBalance = localStorage.getItem("totalBalance");
    if (storedTotalBalance) {
      setTotalBalance(parseFloat(storedTotalBalance));
    }
  }, []);

  // Save to localStorage when balance changes
  useEffect(() => {
    localStorage.setItem("totalBalance", totalBalance.toString());

    console.log("Saved to localStorage:", totalBalance);
  }, [totalBalance]);

  const handleTransaction = (type, amount) => {
    const value = parseFloat(amount);
    if (isNaN(value) || value <= 0) return;

    setTotalBalance((prev) => (type === "add" ? prev + value : prev - value));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Manage My Money</h1>
        <TotalMoneyComponent totalBalance={totalBalance} />
      </header>
      <main>
        <PieChartComponent />
      </main>
      <button
        onClick={() => setShowTaskForm((prev) => !prev)}
        className="taskButton"
      >
        +
      </button>

      {showTaskForm && (
        <TaskMenu
          show={showTaskForm}
          onSubmit={handleTransaction}
          onClose={() => setShowTaskForm(false)}
        />
      )}
    </div>
  );
}

export default App;
