import React from "react";
import PropTypes from "prop-types";

import "./Legend.css";

const Legend = ({ colorScale, percentileValues, title }) => {
  const isAscending = percentileValues[0] < percentileValues[percentileValues.length - 1];

  // Create a color block for each percentile value
  const colorBlocks = percentileValues.map((value, index) => (
    <div
      key={index}
      style={{
        backgroundColor: colorScale(value),
        width: `${100 / percentileValues.length}%`,
        height: "20px",
      }}
    />
  ));

  const valueLabels = isAscending ? percentileValues : [...percentileValues].reverse();

  return (
    <div className="legend-container">
      <div className="legend-title">{title}</div>
      <div className="color-blocks" style={{ display: "flex", width: "100%" }}>
        {colorBlocks}
      </div>
      <div
        className="value-labels"
        style={{
          display: "flex",
          width: "100%",
          flexDirection: isAscending ? "row" : "row-reverse",
        }}
      >
        {valueLabels.map((value, index) => (
          <span key={index} className={isAscending ? "value-label-left" : "value-label-right"}>
            {value}
          </span>
        ))}
      </div>
      <div className="legend-labels">
        {Array.from({ length: percentileValues.length }, (_, i) => `Level ${i + 1}`).map(
          (level, index) => (
            <div key={index} className="legend-label">
              {level}
            </div>
          )
        )}
      </div>
    </div>
  );
};

Legend.propTypes = {
  colorScale: PropTypes.func.isRequired,
  percentileValues: PropTypes.arrayOf(PropTypes.number).isRequired,
  title: PropTypes.string.isRequired,
};

export default Legend;
