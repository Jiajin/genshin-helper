import React, { useState } from "react";
import "./WeaponCalc.css";

const WeaponCalcMain = () => {
  const materialCostMap = [
    { level: "fourty", cost: { low: 3, medium: 0, high: 0, max: 0 } },
    { level: "fifty", cost: { low: 3, medium: 3, high: 0, max: 0 } },
    { level: "sixty", cost: { low: 3, medium: 6, high: 0, max: 0 } },
    { level: "seventy", cost: { low: 3, medium: 6, high: 3, max: 0 } },
    { level: "eighty", cost: { low: 3, medium: 6, high: 6, max: 0 } },
    { level: "ninety", cost: { low: 3, medium: 6, high: 6, max: 4 } },
  ];
  const fourStarCostMap = {
    fourty: {
      low: 3,
      medium: 0,
      high: 0,
      max: 0,
    },
    fifty: {
      low: 3,
      medium: 3,
      high: 0,
      max: 0,
    },
    sixty: {
      low: 3,
      medium: 6,
      high: 0,
      max: 0,
    },
    seventy: {
      low: 3,
      medium: 6,
      high: 3,
      max: 0,
    },
    eighty: {
      low: 3,
      medium: 6,
      high: 6,
      max: 0,
    },
    ninety: {
      low: 3,
      medium: 6,
      high: 6,
      max: 4,
    },
  };
  const weaponLevelData = [
    { value: 20, desc: "0/20" },
    { value: 40, desc: "20/40" },
    { value: 50, desc: "40/50" },
    { value: 60, desc: "50/60" },
    { value: 70, desc: "60/70" },
    { value: 80, desc: "70/80" },
    { value: 90, desc: "80/90" },
  ];

  return (
    <div className="body">
      <div>What is your desired max weapon level?</div>
      <label>
        <select id="dropdown">
          {weaponLevelData.map((level) => (
            <option value={level.value}>{level.desc}</option>
          ))}
        </select>
      </label>
      <input
        type="number"
        className="weaponCalc__input"
        value={weaponLevelData[6]}
      ></input>
      <div>What is your current max weapon level?</div>
      <div>
        <div>You have enough!/You don't have enough!</div>
        <div>*Required mats here</div>
      </div>
    </div>
  );
};

export default WeaponCalcMain;
