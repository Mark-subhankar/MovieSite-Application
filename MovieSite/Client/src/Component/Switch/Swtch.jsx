import React from "react";
import "../Switch/SwitchBtnStyle.css";

function Switch() {
  const setDarkMode = () => {
    document.querySelector("body").setAttribute("data-theme", "dark");
  };

  const setLightMode = () => {
    document.querySelector("body").setAttribute("data-theme", "light");
  };

  const toggleTheme = (e) => {
    if (e.target.checked) {
      setDarkMode();
    } else {
      setLightMode();
    }
  };

  return (
    <div>
      <label className="switch">
        <input type="checkbox" id="darkmode-toggle" onChange={toggleTheme} />
        <span className="slider round"></span>
      </label>
    </div>
  );
}

export default Switch;
