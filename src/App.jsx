import { useState, useEffect } from "react";
import "./App.css";
import PieChartComponent from "./PieChartComponent";
import TotalMoneyComponent from "./TotalMoneyComponent";
import TransactionMenu from "./TransactionMenu";
import DropDownMenu from "./DropDownMenu";
import RecentTransactions from "./RecentTransactions";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  const [totalBalance, setTotalBalance] = useState(() => {
    const stored = localStorage.getItem("totalBalance");
    return stored ? parseFloat(stored) : 0;
  });

  const [totalBudget, setTotalBudget] = useState(() => {
    return parseFloat(localStorage.getItem("totalBudget")) || 0;
  });

  const [budgetRemaining, setBudgetRemaining] = useState(() => {
    return parseFloat(localStorage.getItem("budgetRemaining")) || 0;
  });

  const [categories, setCategories] = useState(() => {
    const stored = localStorage.getItem("categories");
    return stored ? JSON.parse(stored) : [];
  });

  const [transactions, setTransactions] = useState(() => {
    const stored = localStorage.getItem("transactions");
    return stored ? JSON.parse(stored) : [];
  });

  const [showTaskForm, setShowTaskForm] = useState(false);

  useEffect(() => {
    localStorage.setItem("totalBalance", totalBalance.toString());
  }, [totalBalance]);

  useEffect(() => {
    localStorage.setItem("totalBudget", totalBudget.toString());
  }, [totalBudget]);

  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem("budgetRemaining", budgetRemaining.toString());
  }, [budgetRemaining]);

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  const handleTransaction = (
    type,
    amount,
    categoryName = "",
    description = ""
  ) => {
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
            cat.name === categoryName
              ? { ...cat, value: Math.max(0, cat.value - value) }
              : cat
          )
        );
        setBudgetRemaining((prev) => {
          const newVal = Math.max(0, prev - value);
          localStorage.setItem("budgetRemaining", newVal.toString());
          return newVal;
        });
      } else if (type === "add") {
        setCategories((prev) =>
          prev.map((cat) =>
            cat.name === categoryName
              ? { ...cat, value: cat.value + value }
              : cat
          )
        );
        setBudgetRemaining((prev) => {
          const newVal = prev + value;
          localStorage.setItem("budgetRemaining", newVal.toString());
          return newVal;
        });
      }
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Manage My Money</h1>
        <TotalMoneyComponent totalBalance={totalBalance} />
      </header>

      <main className="px-6 py-4">
        <PieChartComponent
          categories={categories}
          totalBudget={budgetRemaining}
        />
        {/* <RecentTransactions transactions={transactions} /> */}
      </main>

      <button
        onClick={() => setShowTaskForm((prev) => !prev)}
        className="taskButton"
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
