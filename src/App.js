import './App.css';
import Header from "./Header";
import BuyOrder from "./BuyOrder";

function App() {
  return (
    <div className="app">
      <div className="app__header">
        <Header />
      </div>
      <div className="app__body">
        <BuyOrder />
      </div>
    </div>
  );
}

export default App;
