import React from "react";
import AscensionGems from "./AscensionGems";

const AscensionGemsMain = () => {
  return (
    <div className="body">
      <AscensionGems gemType="Agnidus_Agate" />
      <AscensionGems gemType="Varunada_Lazurite" />
      <AscensionGems gemType="Vajrada_Amethyst" />
      <AscensionGems gemType="Vayuda_Turquoise" />
      <AscensionGems gemType="Shivada_Jade" />
      <AscensionGems gemType="Prithiva_Topaz" />
    </div>
  );
};

export default AscensionGemsMain;
