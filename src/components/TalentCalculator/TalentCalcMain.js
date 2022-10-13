import React, { useState, useEffect } from "react";
import Select from "react-select";
import { useSearchParams } from "react-router-dom";
import "./TalentCalc.css";
import threesConvertor from "../utils/threesConvertor";
import FourTierMaterialBox from "../common/FourTierMaterialBox";
import {
  domainMatCost,
  commonMonsterMatCost,
  weeklyBossMatCost,
  moraCost,
} from "../../data/TalentCostData";
import TalentMaterialData from "../../data/TalentMaterialData";
import TalentRow from "./TalentRow";

const talentLevelArray = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

// populate character dropdown
const charOptions = TalentMaterialData.map((char) => {
  return { value: char.Id, label: char.Name };
});

// Func for calc cost
const getMatCost = (max, current, costsArray) => {
  return threesConvertor.minus(
    costsArray[talentLevelArray.indexOf(max)],
    costsArray[talentLevelArray.indexOf(current)]
  );
};
// Func for mora cost
const getMoraCost = (max, current, costsArray) => {
  return (
    costsArray[talentLevelArray.indexOf(max)].cost -
    costsArray[talentLevelArray.indexOf(current)].cost
  );
};

class Talent {
  constructor(currentLevel, desiredLevel, selected) {
    this.selected = selected;
    this.selectLevel = currentLevel;
    this.desiredLevel = desiredLevel;
    this.cost = {
      domainMat: getMatCost(desiredLevel, currentLevel, domainMatCost),
      commonMat: getMatCost(desiredLevel, currentLevel, commonMonsterMatCost),
      weeklyBossMatCost: getMoraCost(
        desiredLevel,
        currentLevel,
        weeklyBossMatCost
      ),
      moraCost: getMoraCost(desiredLevel, currentLevel, moraCost),
    };
  }
}

const calcTotalCost = (array) => {
  const domainMat = threesConvertor.sumCosts(
    array
      .filter((talent) => talent.selected === true)
      .map((talent) => talent.cost.domainMat)
  );
  const commonMat = threesConvertor.sumCosts(
    array
      .filter((talent) => talent.selected === true)
      .map((talent) => talent.cost.commonMat)
  );
  const bossMat = array
    .filter((talent) => talent.selected === true)
    .map((talent) => talent.cost.weeklyBossMatCost)
    .reduce(function (a, b) {
      return a + b;
    }, 0);
  const moraCost = array
    .filter((talent) => talent.selected === true)
    .map((talent) => talent.cost.moraCost)
    .reduce(function (a, b) {
      return a + b;
    }, 0);

  return {
    domainMat: domainMat,
    commonMat: commonMat,
    weeklyBossMatCost: bossMat,
    moraCost: moraCost,
  };
};

const TalentCalcMain = () => {
  // URL Params to set default char
  const [searchParams, setSearchParams] = useSearchParams();
  const charParam = searchParams.get("char");

  // Default char is newest 5*
  let defaultChar = TalentMaterialData.find((x) => x.Id === "nahida");

  if (TalentMaterialData.find((x) => x.Id === charParam)) {
    defaultChar = TalentMaterialData.find((x) => x.Id === charParam);
  }

  // Page model
  const [talentCalcModel, setTalentCalcModel] = useState({
    character: defaultChar,
    normalAttack: new Talent("1", "10", true),
    skill: new Talent("1", "10", true),
    burst: new Talent("1", "10", true),
    get totalCost() {
      // Calculates dynamically
      return calcTotalCost([this.normalAttack, this.skill, this.burst]);
    },
  });

  // OnChangeHandlers for Level selectors
  const setNormalAttackLevel = (current, max, selected) => {
    if (talentLevelArray.includes(current) && talentLevelArray.includes(max)) {
      setTalentCalcModel({
        ...talentCalcModel,
        normalAttack: new Talent(current, max, selected),
        totalCost: calcTotalCost([
          new Talent(current, max, selected),
          talentCalcModel.skill,
          talentCalcModel.burst,
        ]),
      });
    }
  };

  const setSkillLevel = (current, max, selected) => {
    if (talentLevelArray.includes(current) && talentLevelArray.includes(max)) {
      setTalentCalcModel({
        ...talentCalcModel,
        skill: new Talent(current, max, selected),
        totalCost: calcTotalCost([
          talentCalcModel.normalAttack,
          new Talent(current, max, selected),
          talentCalcModel.burst,
        ]),
      });
    }
  };

  const setBurstLevel = (current, max, selected) => {
    if (talentLevelArray.includes(current) && talentLevelArray.includes(max)) {
      setTalentCalcModel({
        ...talentCalcModel,
        burst: new Talent(current, max, selected),
        totalCost: calcTotalCost([
          talentCalcModel.normalAttack,
          talentCalcModel.skill,
          new Talent(current, max, selected),
        ]),
      });
    }
  };
  const setAllLevel = (current, max) => {
    setTalentCalcModel({
      ...talentCalcModel,
      normalAttack: new Talent(current, max, true),
      skill: new Talent(current, max, true),
      burst: new Talent(current, max, true),
      totalCost: calcTotalCost([
        new Talent(current, max, true),
        new Talent(current, max, true),
        new Talent(current, max, true),
      ]),
    });
  };
  // End Onchange handlers for level selectors

  const charDropdownOnchange = (e) => {
    //Load the selected weapon's icon and costs
    let selectedChar = TalentMaterialData.find((x) => x.Id === e.value);

    setTalentCalcModel({
      ...talentCalcModel,
      character: selectedChar,
    });

    setSearchParams({ char: e.value });
  };

  return (
    <div className="body">
      <Select
        className="select"
        defaultValue={charOptions.find(
          (x) => x.value === talentCalcModel.character.Id
        )}
        isSearchable={true}
        isClearable={false}
        options={charOptions}
        onChange={charDropdownOnchange}
      ></Select>
      <div className="page-row mt-2">
        Click below to use one of the preset Talent levels
      </div>
      <div className="page-row">
        <div className="level-button" onClick={(e) => setAllLevel("1", "6")}>
          1 - 6
        </div>
        <div className="level-button" onClick={(e) => setAllLevel("1", "8")}>
          1 - 8
        </div>
        <div className="level-button" onClick={(e) => setAllLevel("1", "9")}>
          1 - 9
        </div>
        <div className="level-button" onClick={(e) => setAllLevel("1", "10")}>
          1 - 10
        </div>
      </div>
      <div className="page-row">
        <div className="level-button" onClick={(e) => setAllLevel("6", "8")}>
          6 - 8
        </div>
        <div className="level-button" onClick={(e) => setAllLevel("6", "9")}>
          6 - 9
        </div>
        <div className="level-button" onClick={(e) => setAllLevel("6", "10")}>
          6 - 10
        </div>
      </div>
      <div className="page-row">
        <div className="level-button" onClick={(e) => setAllLevel("8", "9")}>
          8 - 9
        </div>
        <div className="level-button" onClick={(e) => setAllLevel("8", "10")}>
          8 - 10
        </div>
        <div className="level-button" onClick={(e) => setAllLevel("9", "10")}>
          9 - 10
        </div>
      </div>

      <div className="page-row mt-2">
        You can toggle unwanted talents or change individual levels here
      </div>
      <TalentRow
        title={"Normal Attack"}
        selected={talentCalcModel.normalAttack.selected}
        currentLevel={talentCalcModel.normalAttack.selectLevel}
        desiredLevel={talentCalcModel.normalAttack.desiredLevel}
        setFunction={setNormalAttackLevel}
      />
      <TalentRow
        title={"Skill"}
        selected={talentCalcModel.skill.selected}
        currentLevel={talentCalcModel.skill.selectLevel}
        desiredLevel={talentCalcModel.skill.desiredLevel}
        setFunction={setSkillLevel}
      />
      <TalentRow
        title={"Burst"}
        selected={talentCalcModel.burst.selected}
        currentLevel={talentCalcModel.burst.selectLevel}
        desiredLevel={talentCalcModel.burst.desiredLevel}
        setFunction={setBurstLevel}
      />
      <FourTierMaterialBox
        title={"Domain Materials"}
        materialName={talentCalcModel.character.DomainMat}
        totalCost={talentCalcModel.totalCost.domainMat}
        type={"rare"}
        folder={"talentMaterials"}
      />
      <FourTierMaterialBox
        title={"Common Monster Materials"}
        materialName={talentCalcModel.character.CommonMonsterMat}
        totalCost={talentCalcModel.totalCost.commonMat}
        type={"common"}
        folder={"monsterMaterials"}
      />
    </div>
  );
};

export default TalentCalcMain;
