import React, { useState } from "react";
import MaterialQuality from "./MaterialQuality";
import MaterialQualityStatic from "./MaterialQualityStatic";
import threesConvertor from "../utils/threesConvertor";

const FourTierMaterialBox = ({ materialType, totalCost }) => {
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

export default FourTierMaterialBox;
