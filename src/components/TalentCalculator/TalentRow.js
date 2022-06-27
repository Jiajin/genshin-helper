import React from "react";

const TalentRow = ({
  title,
  selected,
  currentLevel,
  desiredLevel,
  onChangeHandler,
}) => {
  return (
    <div className="page-row">
      <div
        onClick={(e) => onChangeHandler(currentLevel, desiredLevel, !selected)}
      >
        <div className={`mx-2 checkbox ${selected ? "selected" : ""}`}>
          {selected ? "✓ " : "✖ "}
          {title}
        </div>
      </div>

      <div className="mx-2">Current Level</div>
      <input
        className="level-input"
        value={currentLevel}
        onChange={(e) =>
          onChangeHandler(e.target.value, desiredLevel, selected)
        }
      />
      <div className="mx-2">Desired Level</div>
      <input
        className="level-input"
        value={desiredLevel}
        onChange={(e) =>
          onChangeHandler(currentLevel, e.target.value, selected)
        }
      />
    </div>
  );
};

export default TalentRow;
