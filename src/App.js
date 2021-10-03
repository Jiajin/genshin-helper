import "./App.css";
import AscensionGems from "./components/AscensionGems/AscensionGems";

import FishGoals from "./components/FIshGoals";
import PondList from "./components/PondList";

function App() {
  return (
    <div className="App">
      {/* <FishGoals />
      <PondList /> */}
      <AscensionGems gemType="Agnidus_Agate" />
      <AscensionGems gemType="Varunada_Lazurite" />
      <AscensionGems gemType="Vajrada_Amethyst" />
      <AscensionGems gemType="Vayuda_Turquoise" />
      <AscensionGems gemType="Shivada_Jade" />
      <AscensionGems gemType="Prithiva_Topaz" />
    </div>
  );
}

export default App;
