import React, { useState, Component } from "react";
import Select from "react-select";
import threesConvertor from "../utils/threesConvertor";
import "./WeaponCalc.css";
import FourTierMaterialBox from "./FourTierMaterialBox";
import WeaponMaterialData from "../../data/WeaponMaterialData";
import {
  threeStarCommonMonsterMatCost,
  threeStarRareMonsterMatCost,
  threeStarDomainMatCost,
  fourStarCommonMonsterMatCost,
  fourStarRareMonsterMatCost,
  fourStarDomainMatCost,
  fiveStarCommonMonsterMatCost,
  fiveStarRareMonsterMatCost,
  fiveStarDomainMatCost,
} from "../../data/WeaponCostData";

const WeaponCalcMain = () => {
  const weaponOptions = WeaponMaterialData.map((weapon) => {
    return { value: weapon.Name, label: weapon.Name };
  });

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

  //vars for Selected Weapon
  const [weapon, setWeapon] = useState(WeaponMaterialData[0]);
  const [domainMat, setDomainMat] = useState(WeaponMaterialData[0].DomainMat);
  const [rareMonsterMat, setRareMonsterMat] = useState(
    WeaponMaterialData[0].RareMonsterMat
  );
  const [commonMonsterMat, setCommonMonsterMat] = useState(
    WeaponMaterialData[0].CommonMonsterMat
  );

  //vars for Weapon cost (using above weapon value)
  //todo Onchange for dropdown Desired and Current level
  const [maxLevel, setMaxLevel] = useState("90");
  const [currentLevel, setCurrentLevel] = useState("20");
  const [domainMatCost, setDomainMatCost] = useState(fourStarDomainMatCost[6]);
  const [commonMatCost, setCommonMatCost] = useState(
    fourStarCommonMonsterMatCost[6]
  );
  const [rareMatCost, setRareMatCost] = useState(fourStarRareMonsterMatCost[6]);

  //Weapon level dropdown
  const maxOnChangeHandler = (value) => {
    if (weaponLevelArray.includes(value)) {
      setMaxLevel(value);
    }
    getDomainMatCost(value, currentLevel, getDomainCostByRarity(weapon.Rarity));
    getCommonMatCost(value, currentLevel, getCommonCostByRarity(weapon.Rarity));
    getRareMatCost(value, currentLevel, getRareCostByRarity(weapon.Rarity));
  };
  const currentOnChangeHandler = (value) => {
    if (weaponLevelArray.includes(value)) {
      setCurrentLevel(value);
    }
    getDomainMatCost(maxLevel, value, getDomainCostByRarity(weapon.Rarity));
    getCommonMatCost(maxLevel, value, getCommonCostByRarity(weapon.Rarity));
    getRareMatCost(maxLevel, value, getRareCostByRarity(weapon.Rarity));
  };

  const getDomainCostByRarity = (rarity) => {
    switch (rarity) {
      case "3":
        return threeStarDomainMatCost;
      case "4":
        return fourStarDomainMatCost;
      case "5":
        return fiveStarDomainMatCost;
      default:
        return null; //shldnt happen
    }
  };
  const getCommonCostByRarity = (rarity) => {
    switch (rarity) {
      case "3":
        return threeStarCommonMonsterMatCost;
      case "4":
        return fourStarCommonMonsterMatCost;
      case "5":
        return fiveStarCommonMonsterMatCost;
      default:
        return null; //shldnt happen
    }
  };
  const getRareCostByRarity = (rarity) => {
    switch (rarity) {
      case "3":
        return threeStarRareMonsterMatCost;
      case "4":
        return fourStarRareMonsterMatCost;
      case "5":
        return fiveStarRareMonsterMatCost;
      default:
        return null; //shldnt happen
    }
  };
  const getDomainMatCost = (max, current, domainMatCost) => {
    let newCost = threesConvertor.minus(
      domainMatCost[weaponLevelArray.indexOf(max)],
      domainMatCost[weaponLevelArray.indexOf(current)]
    );
    setDomainMatCost(newCost);
  };
  const getCommonMatCost = (max, current, commonMatCost) => {
    let newCost = threesConvertor.minus(
      commonMatCost[weaponLevelArray.indexOf(max)],
      commonMatCost[weaponLevelArray.indexOf(current)]
    );
    setCommonMatCost(newCost);
  };
  const getRareMatCost = (max, current, rareMatCost) => {
    let newCost = threesConvertor.minus(
      rareMatCost[weaponLevelArray.indexOf(max)],
      rareMatCost[weaponLevelArray.indexOf(current)]
    );
    setRareMatCost(newCost);
  };

  const weaponDropdownOnchange = (e) => {
    //Load the selected weapon's icon and costs
    let selectedWeapon = WeaponMaterialData.find((x) => x.Name === e.value);
    setWeapon(WeaponMaterialData.find((x) => x.Name === e.value));
    setDomainMat(selectedWeapon.DomainMat);
    setRareMonsterMat(selectedWeapon.RareMonsterMat);
    setCommonMonsterMat(selectedWeapon.CommonMonsterMat);

    console.log(selectedWeapon);
  };

  return (
    <div className="body">
      <Select
        className="select"
        defaultValue={weaponOptions[0]}
        isSearchable={true}
        isClearable={false}
        options={weaponOptions}
        onChange={weaponDropdownOnchange}
      ></Select>
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
      <FourTierMaterialBox
        materialName={domainMat}
        totalCost={domainMatCost}
        type={"domain"}
        folder={"weaponMaterials"}
      />
      <FourTierMaterialBox
        materialName={commonMonsterMat}
        totalCost={commonMatCost}
        type={"common"}
        folder={"monsterMaterials"}
      />
      <FourTierMaterialBox
        materialName={rareMonsterMat}
        totalCost={rareMatCost}
        type={"rare"}
        folder={"monsterMaterials"}
      />
    </div>
  );
};

export default WeaponCalcMain;
