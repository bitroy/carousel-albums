import React from "react";

const Arrow = ({ clickArrow, glyph }) => {
  return (
    <div className="arrow" onClick={() => clickArrow()}>
      {glyph}
    </div>
  );
};

export default Arrow;
