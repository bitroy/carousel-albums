import React, { useState } from "react";

const ScrollToTop = () => {
  const [showScroll, setShowScroll] = useState(false);

  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > 400) {
      setShowScroll(true);
    } else if (showScroll && window.pageYOffset <= 400) {
      setShowScroll(false);
    }
  };

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  window.addEventListener("scroll", checkScrollTop);

  return (
    <button
      className="scrollTop"
      onClick={scrollTop}
      style={{
        display: showScroll ? "flex" : "none",
      }}
    >
      <span>&#x25b2;</span>
    </button>
  );
};

export default ScrollToTop;
