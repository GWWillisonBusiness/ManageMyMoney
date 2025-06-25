import { useState } from "react";
import "./App.css";
import PieChartComponent from "./PieChartComponent";
import TotalMoneyComponent from "./TotalMoneyComponent";

function App() {
  const [totalMoney, setTotalMoney] = useState(0);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Manage My Money</h1>
        <TotalMoneyComponent totalMoneyCount={totalMoney} />
      </header>
      <main>
        <PieChartComponent />
      </main>
    </div>
  );
}

export default App;
