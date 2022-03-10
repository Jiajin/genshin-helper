import "./App.css";
import AscensionGemsMain from "./components/AscensionGems/AscensionGemsMain";
import Navigation from "./components/Navigation";
import FishGoals from "./components/FIshGoals";
import PondList from "./components/PondList";
import {
  BrowserRouter,
  Route,
  Routes,
  Redirect,
  NavLink,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

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
        <Route path="/home" element={<AscensionGemsMain />} />
        <Route path="/preferences" element={<AscensionGemsMain />} />
        <Route path="/404" render={() => <div>Page Not Found</div>} />
        {/* <Redirect to="/404"></Redirect> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
