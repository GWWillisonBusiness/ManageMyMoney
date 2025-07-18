import { useState, useEffect } from "react";
import "./App.css";
import PieChartComponent from "./PieChartComponent";
import TotalMoneyComponent from "./TotalMoneyComponent";
import TransactionMenu from "./TransactionMenu";
import DropDownMenu from "./DropDownMenu";
import RecentTransactions from "./RecentTransactions";
import { useNavigate } from "react-router-dom";
import { storageAvailable } from "./utils/storageAvailable";

let safeStorage = null;
if (typeof window !== "undefined" && storageAvailable("localStorage")) {
  safeStorage = window.localStorage;
} else {
  console.warn("localStorage not available — likely Safari Private Mode");
}

function App() {
  const navigate = useNavigate();

  const [totalBalance, setTotalBalance] = useState(() => {
    const stored = safeStorage?.getItem("totalBalance");
    return stored ? parseFloat(stored) : 0;
  });

  const [totalBudget, setTotalBudget] = useState(() => {
    return parseFloat(safeStorage?.getItem("totalBudget")) || 0;
  });

  const [budgetRemaining, setBudgetRemaining] = useState(() => {
    return parseFloat(safeStorage?.getItem("budgetRemaining")) || 0;
  });

  const [categories, setCategories] = useState(() => {
    const stored = safeStorage?.getItem("categories");
    return stored ? JSON.parse(stored) : [];
  });

  const [transactions, setTransactions] = useState(() => {
    const stored = safeStorage?.getItem("transactions");
    return stored ? JSON.parse(stored) : [];
  });

  const [showTaskForm, setShowTaskForm] = useState(false);

  useEffect(() => {
    if (safeStorage) safeStorage.setItem("totalBalance", totalBalance.toString());
  }, [totalBalance]);

  useEffect(() => {
    if (safeStorage) safeStorage.setItem("totalBudget", totalBudget.toString());
  }, [totalBudget]);

  useEffect(() => {
    if (safeStorage) safeStorage.setItem("categories", JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    if (safeStorage) safeStorage.setItem("budgetRemaining", budgetRemaining.toString());
  }, [budgetRemaining]);

  useEffect(() => {
    if (safeStorage) safeStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextResetTime = parseInt(localStorage.getItem("nextResetTime"));
      if (Date.now() > nextResetTime) {
        const updatedBudget = parseFloat(localStorage.getItem("budgetRemaining")) || 0;
        const updatedCategories = JSON.parse(localStorage.getItem("categories")) || [];
        const updatedTotal = parseFloat(localStorage.getItem("totalBudget")) || 0;

        setBudgetRemaining(updatedBudget);
        setCategories(updatedCategories);
        setTotalBudget(updatedTotal);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleTransaction = (type, amount, categoryName = "", description = "") => {
    const value = parseFloat(amount);
    if (isNaN(value) || value <= 0) return;

    const newTransaction = {
      type,
      amount: value,
      category: categoryName || "No Category",
      description,
      timestamp: new Date().toISOString(),
    };

    setTransactions((prev) => [newTransaction, ...prev]);
    setTotalBalance((prev) => (type === "add" ? prev + value : prev - value));

    if (categoryName) {
      if (type === "subtract") {
        setCategories((prev) =>
          prev.map((cat) =>
            cat.name === categoryName ? { ...cat, value: Math.max(0, cat.value - value) } : cat
          )
        );
        setBudgetRemaining((prev) => Math.max(0, prev - value));
      } else {
        setCategories((prev) =>
          prev.map((cat) =>
            cat.name === categoryName ? { ...cat, value: cat.value + value } : cat
          )
        );
        setBudgetRemaining((prev) => prev + value);
      }
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Manage My Money</h1>
        <TotalMoneyComponent totalBalance={totalBalance} />
      </header>

      <main className="mainContent">
        <PieChartComponent
          categories={categories}
          totalBudget={budgetRemaining}
        />
        <RecentTransactions transactions={transactions} />
      </main>

      <button
        onClick={() => setShowTaskForm((prev) => !prev)}
        className="taskButton"
        title="Add Transaction"
      >
        +
      </button>

      <DropDownMenu onNavigate={navigate} />

      {showTaskForm && (
        <TransactionMenu
          show={showTaskForm}
          onSubmit={handleTransaction}
          onClose={() => setShowTaskForm(false)}
          categories={categories}
        />
      )}
    </div>
  );
}

export default App;
