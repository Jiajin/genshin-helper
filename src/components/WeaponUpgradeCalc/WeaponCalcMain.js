import React, { useState } from "react";
import threesConvertor from "../utils/threesConvertor";
import "./WeaponCalc.css";
import FourTierMaterialBox from "./FourTierMaterialBox";

const WeaponCalcMain = () => {
  const fourStarCostMap = [
    {
      low: 0,
      medium: 0,
      high: 0,
      max: 0,
    },
    {
      low: 3,
      medium: 0,
      high: 0,
      max: 0,
    },
    {
      low: 3,
      medium: 3,
      high: 0,
      max: 0,
    },
    {
      low: 3,
      medium: 6,
      high: 0,
      max: 0,
    },
    {
      low: 3,
      medium: 6,
      high: 3,
      max: 0,
    },
    {
      low: 3,
      medium: 6,
      high: 6,
      max: 0,
    },
    {
      low: 3,
      medium: 6,
      high: 6,
      max: 4,
    },
  ];
  const weaponLevelData = [
    { value: 20, desc: "0/20" },
    { value: 40, desc: "20/40" },
    { value: 50, desc: "40/50" },
    { value: 60, desc: "50/60" },
    { value: 70, desc: "60/70" },
    { value: 80, desc: "70/80" },
    { value: 90, desc: "80/90" },
  ];
  const weaponLevelArray = ["20", "40", "50", "60", "70", "80", "90"];

  //todo Onchange for dropdown Desired and Current level
  const [maxLevel, setMaxLevel] = useState("90");
  const [currentLevel, setCurrentLevel] = useState("20");
  const [domainMatCost, setDomainMatCost] = useState(fourStarCostMap[6]);
  const maxOnChangeHandler = (value) => {
    if (weaponLevelArray.includes(value)) {
      setMaxLevel(value);
    }
    getDomainMatCost(value, currentLevel);
  };
  const currentOnChangeHandler = (value) => {
    if (weaponLevelArray.includes(value)) {
      setCurrentLevel(value);
    }
    getDomainMatCost(maxLevel, value);
  };
  const getDomainMatCost = (max, current) => {
    console.log(max);
    console.log(weaponLevelArray.indexOf(max));
    console.log(fourStarCostMap[weaponLevelArray.indexOf(max)]);
    console.log(fourStarCostMap[weaponLevelArray.indexOf(current)]);
    let newCost = threesConvertor.minus(
      fourStarCostMap[weaponLevelArray.indexOf(max)],
      fourStarCostMap[weaponLevelArray.indexOf(current)]
    );
    console.log(newCost);
    setDomainMatCost(newCost);
  };
  //todo Replace material type with actual model
  const materialType = "coral";

  return (
    <div className="body">
      <div className="materials_row">
        <div className="materials_label">
          What is your desired max weapon level?{" "}
        </div>
      </div>
      <label className="materials_row">
        <select
          id="maxDropdown"
          value={maxLevel}
          onChange={(e) => maxOnChangeHandler(e.target.value)}
        >
          {weaponLevelData.map((level) => (
            <option value={level.value}>{level.desc}</option>
          ))}
        </select>
      </label>
      <div className="materials_row">
        <div className="materials_label">
          What is your current weapon level?{" "}
        </div>
      </div>
      <label className="materials_row">
        <select
          id="inputDropdown"
          value={currentLevel}
          onChange={(e) => currentOnChangeHandler(e.target.value)}
        >
          {weaponLevelData.map((level) => (
            <option value={level.value}>{level.desc}</option>
          ))}
        </select>
      </label>
      {/* <div>What is your current max weapon level?</div>
      <div>
      </div> */}
      <FourTierMaterialBox
        materialType={materialType}
        totalCost={domainMatCost}
      />
    </div>
  );
};

export default WeaponCalcMain;
