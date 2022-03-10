import "./App.css";
import AscensionGemsMain from "./components/AscensionGems/AscensionGemsMain";
import Navigation from "./components/Navigation";
import FishGoals from "./components/FIshGoals";
import PondList from "./components/PondList";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import WeaponCalcMain from "./components/WeaponUpgradeCalc/WeaponCalcMain";

function App() {
  return (
    // <div className="App">
    //   {/* <FishGoals />
    //   <PondList /> */}
    //   <AscensionGemsMain />
    // </div>
    <BrowserRouter className="App">
      {/* <div className="parent navibar">
       <NavLink to="/home">Home Page</NavLink>
       <NavLink to="/preferences">Preferences</NavLink>
     </div> */}
      <Navigation></Navigation>
      <Routes>
        <Route path="/element" element={<AscensionGemsMain />} />
        <Route path="/weapon" element={<WeaponCalcMain />} />
        <Route path="/404" render={() => <div>Page Not Found</div>} />
        {/* <Redirect to="/404"></Redirect> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
