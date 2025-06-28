import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./App.css";

const DropDownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [showTimer, setShowTimer] = useState(false);

  const handleItemClick = (item) => {
    setIsOpen(false); // close dropdown

    if (item === "Settings") setShowSettings(true);
    if (item === "Categories") setShowCategories(true);
    if (item === "Budget Reset Timer") setShowTimer(true);
  };

  const menuItems = ["Settings", "Categories", "Budget Reset Timer"];

  return (
    <div className="dropdownContainer">
      <div style={{ position: "relative" }}>
        <button onClick={() => setIsOpen(!isOpen)} className="dropdownButton">
          ☰ Menu
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="dropdownMenu"
            >
              {menuItems.map((item) => (
                <div
                  key={item}
                  className="dropdownItem"
                  onClick={() => handleItemClick(item)}
                >
                  {item}
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Popups */}
      {showSettings && (
        <div
          className="taskOverlay show"
          onClick={() => setShowSettings(false)}
        >
          <div className="taskPanel">Settings Panel</div>
        </div>
      )}

      {showCategories && (
        <div
          className="taskOverlay show"
          onClick={() => setShowCategories(false)}
        >
          <div className="taskPanel">Categories Panel</div>
        </div>
      )}

      {showTimer && (
        <div className="taskOverlay show" onClick={() => setShowTimer(false)}>
          <div className="taskPanel">Budget Reset Timer Panel</div>
        </div>
      )}
    </div>
  );
};

export default DropDownMenu;
