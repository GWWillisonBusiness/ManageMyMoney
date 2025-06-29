import { useState, useEffect } from "react";
import "./CategoriesPage.css";
import { useNavigate } from "react-router-dom";

const getNextResetTime = (frequency) => {
  const now = new Date();
  let next = new Date(now);

  switch (frequency) {
    case "weekly":
      next.setDate(now.getDate() + (7 - now.getDay()));
      break;
    case "monthly":
      next.setMonth(now.getMonth() + 1);
      next.setDate(1);
      break;
    case "yearly":
      next.setFullYear(now.getFullYear() + 1);
      next.setMonth(0);
      next.setDate(1);
      break;
    default:
      break;
  }

  next.setHours(0, 0, 0, 0);
  return next.getTime();
};

const CategoriesPage = () => {
  const navigate = useNavigate();

  const [totalBudget, setTotalBudget] = useState(() => {
    return parseFloat(localStorage.getItem("totalBudget")) || 0;
  });

  const [resetFrequency, setResetFrequency] = useState(() => {
    return localStorage.getItem("resetFrequency") || "monthly";
  });

  const [resetTime, setResetTime] = useState(() => {
    return (
      parseInt(localStorage.getItem("nextResetTime")) ||
      getNextResetTime(resetFrequency)
    );
  });

  const [timeLeft, setTimeLeft] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [newCategory, setNewCategory] = useState({
    name: "",
    description: "",
    percent: "",
  });

  const [categories, setCategories] = useState(() => {
    const stored = localStorage.getItem("categories");
    return stored ? JSON.parse(stored) : [];
  });

  const totalBudgetPercent = categories.reduce(
    (acc, cat) => acc + parseFloat(cat.percent || 0),
    0
  );

  // Timer countdown logic
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const diff = resetTime - now;
      if (diff <= 0) {
        resetBudget();
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        const timeString =
          (days > 0 ? `${days}d ` : "") + `${hours}h ${minutes}m ${seconds}s`;

        setTimeLeft(timeString);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [resetTime]);

  // Reset all category values based on % when timer expires
  const resetBudget = () => {
    const nextReset = getNextResetTime(resetFrequency);
    setResetTime(nextReset);
    localStorage.setItem("nextResetTime", nextReset.toString());
    localStorage.setItem("budgetRemaining", totalBudget.toString());

    const updated = categories.map((cat) => ({
      ...cat,
      value: (parseFloat(cat.percent) / 100) * totalBudget,
    }));
    setCategories(updated);
  };

  const handleAddCategory = () => {
    const percentValue = parseFloat(newCategory.percent);
    if (
      !newCategory.name ||
      isNaN(percentValue) ||
      percentValue <= 0 ||
      totalBudgetPercent + percentValue > 100
    ) {
      alert("Please enter valid data within 100% total.");
      return;
    }

    const categoryWithValue = {
      ...newCategory,
      percent: percentValue,
      value: (percentValue / 100) * totalBudget,
    };

    const updated = [...categories, categoryWithValue];
    setCategories(updated);
    setNewCategory({ name: "", description: "", percent: "" });
    setShowPopup(false);
  };

  const handleRemove = (index) => {
    const updated = [...categories];
    updated.splice(index, 1);
    setCategories(updated);
  };

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem("totalBudget", totalBudget.toString());
  }, [totalBudget]);

  useEffect(() => {
    localStorage.setItem("resetFrequency", resetFrequency);
  }, [resetFrequency]);

  return (
    <div className="App">
      <div className="pageContainer">
        <h2>Categories</h2>

        <div style={{ marginBottom: "1rem", color: "#fff" }}>
          <label>Total Budget: </label>
          <input
            type="number"
            value={totalBudget}
            onChange={(e) => {
              const newVal = parseFloat(e.target.value);
              // When budget manually changes
              setTotalBudget(newVal);
              localStorage.setItem("totalBudget", newVal.toString());
              localStorage.setItem("budgetRemaining", newVal.toString()); // Set initial remaining

              const updated = categories.map((cat) => ({
                ...cat,
                value: (parseFloat(cat.percent) / 100) * newVal,
              }));
              setCategories(updated);
            }}
          />
        </div>

        <div style={{ marginBottom: "1rem", color: "#fff" }}>
          <label>Reset Frequency: </label>
          <select
            value={resetFrequency}
            onChange={(e) => {
              const newFreq = e.target.value;
              setResetFrequency(newFreq);
              const newTime = getNextResetTime(newFreq);
              setResetTime(newTime);
              localStorage.setItem("nextResetTime", newTime.toString());
            }}
          >
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>

        <p style={{ color: "#fff", fontStyle: "italic" }}>
          Time until next reset: {timeLeft}
        </p>

        <div className="categoryList">
          {categories.map((cat, idx) => (
            <div key={idx} className="categoryItem">
              <div>
                <strong>{cat.name}</strong> – ({cat.percent}%) — $
                {(cat.value ?? 0).toFixed(2)}
              </div>
              <button
                onClick={() => handleRemove(idx)}
                className="removeButton"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        <button onClick={() => setShowPopup(true)} className="addButton">
          + Add Category
        </button>

        <button onClick={() => navigate("/")} className="homeButton">
          ← Home
        </button>

        {showPopup && (
          <div className="popupOverlay" onClick={() => setShowPopup(false)}>
            <div className="popupContent" onClick={(e) => e.stopPropagation()}>
              <h3>Create New Category</h3>
              <input
                type="text"
                placeholder="Name"
                value={newCategory.name}
                onChange={(e) =>
                  setNewCategory({ ...newCategory, name: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Description"
                value={newCategory.description}
                onChange={(e) =>
                  setNewCategory({
                    ...newCategory,
                    description: e.target.value,
                  })
                }
              />
              <input
                type="number"
                placeholder="% of Budget"
                value={newCategory.percent}
                onChange={(e) =>
                  setNewCategory({
                    ...newCategory,
                    percent: e.target.value,
                  })
                }
              />
              <button onClick={handleAddCategory}>Create</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoriesPage;
