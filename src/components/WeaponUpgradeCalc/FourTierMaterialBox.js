import React, { useState } from "react";
import MaterialQuality from "./MaterialQuality";
import MaterialQualityStatic from "./MaterialQualityStatic";
import threesConvertor from "../utils/threesConvertor";

const FourTierMaterialBox = ({ materialName, totalCost, type, folder }) => {
  //Determine if all 4 tiers should be shown
  //If type == Domain, show all
  let showMax = true;
  let showLow = true;
  if (type === "rare") showLow = false;
  else if (type === "common") showMax = false;

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
    const re = /^[0-9\b]+$/;

    // if value is not blank, then test the regex
    if (value === "" || re.test(value)) {
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
      let result = processInput(copyState, totalCost);
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
    }
  };

  const processInput = (qty, req) => {
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

  return (
    <div className="body">
      <div className="materials_parent">
        <div className="materials_row">
          <div className="materials_label">Amount Required: </div>
        </div>
        <div className="materials_row">
          {showMax && (
            <MaterialQualityStatic
              name={materialName}
              quality={"max"}
              value={totalCost.max}
              folder={folder}
            />
          )}
          <MaterialQualityStatic
            name={materialName}
            quality={"high"}
            value={totalCost.high}
            folder={folder}
          />
          <MaterialQualityStatic
            name={materialName}
            quality={"medium"}
            value={totalCost.medium}
            folder={folder}
          />
          {showLow && (
            <MaterialQualityStatic
              name={materialName}
              quality={"low"}
              value={totalCost.low}
              folder={folder}
            />
          )}
        </div>
        <div className="materials_row">
          <div className="materials_label">Currently you have: </div>
        </div>
        <div className="materials_row">
          {showMax && (
            <MaterialQuality
              name={materialName}
              quality={"max"}
              value={inputMats.max}
              folder={folder}
              onChangeHandler={onChangeHandler}
            />
          )}
          <MaterialQuality
            name={materialName}
            quality={"high"}
            value={inputMats.high}
            folder={folder}
            onChangeHandler={onChangeHandler}
          />
          <MaterialQuality
            name={materialName}
            quality={"medium"}
            value={inputMats.medium}
            folder={folder}
            onChangeHandler={onChangeHandler}
          />
          {showLow && (
            <MaterialQuality
              name={materialName}
              quality={"low"}
              value={inputMats.low}
              folder={folder}
              onChangeHandler={onChangeHandler}
            />
          )}
        </div>
        <div className="materials_row">
          <div>{displayMsg}</div>
        </div>
        <div className="materials_row">
          {showMax && (
            <MaterialQualityStatic
              name={materialName}
              quality={"max"}
              value={resultMats.max}
              folder={folder}
            />
          )}
          <MaterialQualityStatic
            name={materialName}
            quality={"high"}
            value={resultMats.high}
            folder={folder}
          />
          <MaterialQualityStatic
            name={materialName}
            quality={"medium"}
            value={resultMats.medium}
            folder={folder}
          />
          {showLow && (
            <MaterialQualityStatic
              name={materialName}
              quality={"low"}
              value={resultMats.low}
              folder={folder}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default FourTierMaterialBox;
