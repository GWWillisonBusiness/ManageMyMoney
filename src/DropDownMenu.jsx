import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "./App.css";

const DropDownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { label: "Settings", path: "/settings" },
    { label: "Categories", path: "/categories" },
    { label: "Budget Reset Timer", path: "/timer" },
    { label: "All Transactions", path: "/allTransactionPage" }, // 👈 New menu item
  ];

  return (
    <div className="dropdownContainer">
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
                key={item.label}
                className="dropdownItem"
                onClick={() => {
                  navigate(item.path);
                  setIsOpen(false);
                }}
              >
                {item.label}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DropDownMenu;
