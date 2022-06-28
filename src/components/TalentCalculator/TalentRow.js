import React, { useState, useEffect } from "react";

const TalentRow = ({
  title,
  selected,
  currentLevel,
  desiredLevel,
  setFunction,
}) => {
  const [inputCurrentLevel, setInputCurrentLevel] = useState(currentLevel);
  const [inputDesiredLevel, setInputDesiredLevel] = useState(desiredLevel);
  const [inputSelected, setInputSelected] = useState(selected);

  useEffect(() => {
    setInputCurrentLevel(currentLevel);
  }, [currentLevel]);
  useEffect(() => {
    setInputDesiredLevel(desiredLevel);
  }, [desiredLevel]);
  useEffect(() => {
    setInputSelected(selected);
  }, [selected]);

  const re = /^(?:[1-9]|0[1-9]|10)$/;
  const currentOnChangeHandler = (value) => {
    // Process if valid
    if (re.test(value)) {
      setInputCurrentLevel(value);
      setFunction(value, inputDesiredLevel, inputSelected);
    } else if (value === "") {
      //If empty, set as empty so user can clear field
      setInputCurrentLevel(value);
    }
  };

  const desiredOnChangeHandler = (value) => {
    // Process if valid
    if (re.test(value)) {
      setInputDesiredLevel(value);
      setFunction(inputCurrentLevel, value, inputSelected);
    } else if (value === "") {
      //If empty, set as empty so user can clear field
      setInputDesiredLevel(value);
    }
  };

  const selectedOnChangeHandler = (value) => {
    setInputSelected(value);
    setFunction(inputCurrentLevel, inputDesiredLevel, value);
  };

  return (
    <div className="page-row">
      <div onClick={(e) => selectedOnChangeHandler(!selected)}>
        <div className={`mx-2 checkbox ${inputSelected ? "selected" : ""}`}>
          {inputSelected ? "✓ " : "✖ "}
          {title}
        </div>
      </div>

      <div className="mx-2">Current Level</div>
      <input
        className="level-input"
        value={inputCurrentLevel}
        onChange={(e) => currentOnChangeHandler(e.target.value)}
      />
      <div className="mx-2">Desired Level</div>
      <input
        className="level-input"
        value={inputDesiredLevel}
        onChange={(e) => desiredOnChangeHandler(e.target.value)}
      />
    </div>
  );
};

export default TalentRow;
