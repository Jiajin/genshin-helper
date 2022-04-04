import React from "react";

const MaterialQuality = ({ name, quality, value, folder, onChangeHandler }) => {
  return (
    <div className="materials_single">
      <img
        className="mat__image"
        src={`../${folder}/item_${name}_${quality}.png`}
        alt=""
      ></img>
      <div>x</div>
      <input
        className="mat__input"
        value={value}
        onChange={(e) => onChangeHandler(quality, e.target.value)}
      ></input>
    </div>
  );
};

export default MaterialQuality;
