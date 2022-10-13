import React from "react";

const MaterialQuality = ({ name, quality, value, folder, onChangeHandler }) => {
  return (
    <div className="materials_single">
      <img
        className={`mat__image ${
          folder === "weaponMaterials" ? "weapon_" + quality : quality
        }`}
        src={`../${folder}/item_${name}_${quality}.png`}
        alt=""
      ></img>
      <div className="d-flex flex-column">
        <div className="d-flex flex-row">
          <div>x</div>
          <input
            className="mat__input"
            value={value}
            onChange={(e) => onChangeHandler(quality, e.target.value)}
          ></input>
        </div>
        <div className="d-flex flex-row">
          <div
            className="materials_button"
            onClick={(e) => onChangeHandler(quality, parseInt(value) + 1)}
          >
            +1
          </div>
          <div
            className="materials_button"
            onClick={(e) => onChangeHandler(quality, parseInt(value) + 2)}
          >
            +2
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaterialQuality;
