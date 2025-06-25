import { useState } from "react";
import "./App.css";
import PieChartComponent from "./PieChartComponent";
import TotalMoneyComponent from "./TotalMoneyComponent";
import TaskMenu from "./TaskMenu";

function App() {
  const [totalMoney, setTotalMoney] = useState(0);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [inputTotalAmount, setInputTotalAmount] = useState("");

  const handleTransaction = (type, amount) => {
    const value = parseFloat(amount);
    if (isNaN(value) || value <= 0) return;

    setTotalMoney((prev) => (type === "add" ? prev + value : prev - value));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Manage My Money</h1>
        <TotalMoneyComponent totalMoneyCount={totalMoney} />
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
