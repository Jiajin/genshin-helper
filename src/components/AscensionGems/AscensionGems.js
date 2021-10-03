import React, { useState } from "react";
import "./AscensionGems.css";
import GemQuality from "./GemQuality";
import OutputGemQuality from "./OutputGemQuality";

const AscensionGems = ({ gemType }) => {
  const [gemFamily, setGemFamily] = useState({
    sliver: 0,
    fragment: 0,
    chunk: 0,
    gemstone: 0,
    computeSilver: 0,
    maxGemstone: 0,
    maxChunk: 0,
    maxFragment: 0,
    maxSliver: 0,
  });
  const onChangeHandler = (quality, value) => {
    let copyState = gemFamily;
    switch (quality) {
      case "sliver":
        copyState = { ...copyState, sliver: value };
        break;
      case "fragment":
        copyState = { ...copyState, fragment: value };
        break;
      case "chunk":
        copyState = { ...copyState, chunk: value };
        break;
      case "gemstone":
        copyState = { ...copyState, gemstone: value };
        break;
      default:
        break;
    }

    copyState.computeSilver =
      Number(copyState.sliver) +
      Number(copyState.fragment) * 3 +
      Number(copyState.chunk) * 9 +
      Number(copyState.gemstone) * 27;
    copyState.maxGemstone = parseInt(copyState.computeSilver / 27, 10);
    copyState.maxChunk = parseInt(
      (copyState.computeSilver - copyState.maxGemstone * 27) / 9,
      10
    );
    console.log(copyState);
    copyState.maxFragment = parseInt(
      (copyState.computeSilver -
        copyState.maxGemstone * 27 -
        copyState.maxChunk * 3) /
        3,
      10
    );
    copyState.maxSliver = copyState.computeSilver % 3;
    console.log(copyState);
    setGemFamily(copyState);
  };

  return (
    <div className="gems-container">
      <div className="gems-input-container">
        <GemQuality
          type={gemType}
          quality="Sliver"
          value={gemFamily.sliver}
          onChangeHandler={onChangeHandler}
        />
        <GemQuality
          type={gemType}
          quality="Fragment"
          value={gemFamily.fragment}
          onChangeHandler={onChangeHandler}
        />
        <GemQuality
          type={gemType}
          quality="Chunk"
          value={gemFamily.chunk}
          onChangeHandler={onChangeHandler}
        />
        <GemQuality
          type={gemType}
          quality="Gemstone"
          value={gemFamily.gemstone}
          onChangeHandler={onChangeHandler}
        />
      </div>
      <div className="gems-output-container">
        <div className="gem__title">Max Gemstones: </div>
        <OutputGemQuality
          gemType={gemType}
          quality="Gemstone"
          value={gemFamily.maxGemstone}
        />
        <OutputGemQuality
          gemType={gemType}
          quality="Chunk"
          value={gemFamily.maxChunk}
        />
        <OutputGemQuality
          gemType={gemType}
          quality="Fragment"
          value={gemFamily.maxFragment}
        />
        <OutputGemQuality
          gemType={gemType}
          quality="Sliver"
          value={gemFamily.maxSliver}
        />
        <div className="gem__title">Total Slivers: </div>
        <OutputGemQuality
          gemType={gemType}
          quality="Sliver"
          value={gemFamily.computeSilver}
        />
      </div>
    </div>
  );
};

export default AscensionGems;
