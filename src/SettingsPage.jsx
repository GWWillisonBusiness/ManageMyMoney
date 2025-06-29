import { useNavigate } from "react-router-dom";

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
    </div>
  );
};

export default SettingsPage;
