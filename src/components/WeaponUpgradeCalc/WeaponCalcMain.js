import React, { useState } from "react";
import MaterialQuality from "./MaterialQuality";
import MaterialQualityStatic from "./MaterialQualityStatic";
import threesConvertor from "../utils/threesConvertor";
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
  //todo Replace totalcost with actual model
  const totalCost = fourStarCostMap.ninety;
  //todo Replace material type with actual model
  const materialType = "coral";
  const [inputMats, setInputMats] = useState({
    max: 0,
    high: 0,
    medium: 0,
    low: 0,
  });

  const [resultMats, setResultMats] = useState({
    max: 0,
    high: 0,
    medium: 0,
    low: 0,
  });

  const [displayMsg, setDisplayMsg] = useState("Insufficient");

  const onChangeHandler = (quality, value) => {
    let copyState = inputMats;
    switch (quality) {
      case "max":
        copyState = { ...copyState, max: value };
        break;
      case "high":
        copyState = { ...copyState, high: value };
        break;
      case "medium":
        copyState = { ...copyState, medium: value };
        break;
      case "low":
        copyState = { ...copyState, low: value };
        break;
      default:
        break;
    }
    setInputMats(copyState);
    let result = calculateMats(copyState, totalCost);
    setDisplayMsg(
      result.sufficient === true
        ? "Sufficient! Your total materials are:"
        : "Insufficient, your total materials are:"
    );
    setResultMats({
      max: result.max,
      high: result.high,
      medium: result.medium,
      low: result.low,
    });
  };

  const calculateMats = (qty, req) => {
    let haveNo = threesConvertor.getMostLow(qty);
    let reqNo = threesConvertor.getMostLow(req);

    if (reqNo < haveNo) {
      //Enough, display upconverted but retain the required amount w/o converting
      let remainder = threesConvertor.getMostMax(haveNo - reqNo);
      let result = threesConvertor.sum(remainder, req);
      result.sufficient = true;

      return result;
    } else {
      //Not enough, display upconverted
      let result = threesConvertor.getMostMax(haveNo);
      result.sufficient = false;

      return result;
    }
  };

  const convertMax = (value) => {
    let result = {
      low: 0,
      medium: 0,
      high: 0,
      max: 0,
    };
    result.max = parseInt(value / 27, 10);
    result.high = parseInt((value - result.max * 27) / 9, 10);
    result.medium = parseInt(
      (value - result.max * 27 - result.high * 9) / 3,
      10
    );
    result.low = value % 3;
    return result;
  };

  return (
    <div className="body">
      {/* <div>What is your desired max weapon level?</div>
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
      ></input> */}
      {/* <div>What is your current max weapon level?</div>
      <div>
      </div> */}
      <div className="materials_parent">
        <div className="materials_row">
          <div className="materials_label">Amount Required: </div>
        </div>
        <div className="materials_row">
          <MaterialQualityStatic
            type={materialType}
            quality={"max"}
            value={totalCost.max}
          />
          <MaterialQualityStatic
            type={materialType}
            quality={"high"}
            value={totalCost.high}
          />
          <MaterialQualityStatic
            type={materialType}
            quality={"medium"}
            value={totalCost.medium}
          />
          <MaterialQualityStatic
            type={materialType}
            quality={"low"}
            value={totalCost.low}
          />
        </div>
        <div className="materials_row">
          <div className="materials_label">Currently you have: </div>
        </div>
        <div className="materials_row">
          <MaterialQuality
            type={materialType}
            quality={"max"}
            value={inputMats.max}
            onChangeHandler={onChangeHandler}
          />
          <MaterialQuality
            type={materialType}
            quality={"high"}
            value={inputMats.high}
            onChangeHandler={onChangeHandler}
          />
          <MaterialQuality
            type={materialType}
            quality={"medium"}
            value={inputMats.medium}
            onChangeHandler={onChangeHandler}
          />
          <MaterialQuality
            type={materialType}
            quality={"low"}
            value={inputMats.low}
            onChangeHandler={onChangeHandler}
          />
        </div>
        <div className="materials_row">
          <div>{displayMsg}</div>
        </div>
        <div className="materials_row">
          <MaterialQualityStatic
            type={materialType}
            quality={"max"}
            value={resultMats.max}
          />
          <MaterialQualityStatic
            type={materialType}
            quality={"high"}
            value={resultMats.high}
          />
          <MaterialQualityStatic
            type={materialType}
            quality={"medium"}
            value={resultMats.medium}
          />
          <MaterialQualityStatic
            type={materialType}
            quality={"low"}
            value={resultMats.low}
          />
        </div>
      </div>
    </div>
  );
};

export default WeaponCalcMain;
