import React from "react";

const MaterialQualityStatic = ({ type, quality, value }) => {
  return (
    <div className="materials_single static">
      <img
        className="mat__image"
        src={`../weaponMaterials/Item_${type}_${quality}.png`}
        alt=""
      ></img>
      <div className="single_number">x{value}</div>
    </div>
  );
};

export default MaterialQualityStatic;
