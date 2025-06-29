import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DropDownMenu from "./DropDownMenu";
import CategoriesPage from "./CategoriesPage";
import SettingsPage from "./SettingsPage";
import App from "./App";
import AllTransactionsPage from "./AllTransactionsPage";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/allTransactionPage" element={<AllTransactionsPage />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
