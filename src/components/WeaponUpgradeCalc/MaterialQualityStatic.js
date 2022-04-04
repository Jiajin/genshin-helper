import React from "react";

const MaterialQualityStatic = ({ name, quality, value, folder }) => {
  return (
    <div className="materials_single static">
      <img
        className="mat__image"
        src={`../${folder}/item_${name}_${quality}.png`}
        alt=""
      ></img>
      <div className="single_number">x{value}</div>
    </div>
  );
};

export default MaterialQualityStatic;
