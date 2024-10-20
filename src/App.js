import './App.css';
import Header from "./Header";
import BuyOrder from "./BuyOrder";
import SellOrder from "./SellOrder";
import PortfolioOverview from './PortfolioOverview';

function App() {
  return (
    <div className="app">
      <div className="app__header">
        <Header />
      </div>
      <div className="app__body">
            {/* <BuyOrder /> */}
            <PortfolioOverview />
            {/* <SellOrder /> */}
      </div>
    </div>
  );
}

export default App;
