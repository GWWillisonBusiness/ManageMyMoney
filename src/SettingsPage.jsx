import { useNavigate } from "react-router-dom";
import { storageAvailable } from "./utils/storageAvailable";
import "./App.css";

let safeStorage = null;
if (typeof window !== "undefined" && storageAvailable("localStorage")) {
  safeStorage = window.localStorage;
} else {
  console.warn("localStorage not available — likely Safari Private Mode");
}

const handleFullReset = () => {
  if (safeStorage) {
    safeStorage.clear();
  }
};
const SettingsPage = () => {
  const navigate = useNavigate();
  return (
    <div style={{ padding: "2rem", color: "#fff" }}>
      <h1>Settings Page</h1>
      <p>
        This is the area where you modify settings that might be needed... idk
        yet.
      </p>
      <button onClick={() => navigate("/")} className="homeButton">
        ← Home
      </button>

      <button
        onClick={() => {
          handleFullReset();
          navigate("/");
        }}
        className="homeButton"
      >
        Reset All
      </button>
    </div>
  );
};

export default SettingsPage;
