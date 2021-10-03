import React from "react";

const OutputGemQuality = ({ gemType, quality, value }) => {
  return (
    <div className="gem-single__type">
      <img
        className="gem__image"
        src={
          process.env.PUBLIC_URL +
          `./ascensionGems/Item_${gemType}_${quality}.png`
        }
        alt=""
      ></img>
      <div>{value}</div>
    </div>
  );
};

export default OutputGemQuality;
