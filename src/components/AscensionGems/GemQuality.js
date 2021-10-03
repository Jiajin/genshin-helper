import React from "react";

const GemQuality = ({ type, quality, value, onChangeHandler }) => {
  return (
    <div className="gem-single__type">
      <img
        className="gem__image"
        src={`../ascensionGems/Item_${type}_${quality}.png`}
        alt=""
      ></img>
      <div>{quality}:</div>
      <input
        type="number"
        step="1"
        className="gem__input"
        value={value}
        onChange={(e) => onChangeHandler(quality, e.target.value)}
      ></input>
    </div>
  );
};

export default GemQuality;
