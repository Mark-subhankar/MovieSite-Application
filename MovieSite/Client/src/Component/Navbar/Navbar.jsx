import React, { useState } from "react";
import "../Navbar/NavbarStyle.css";
import { Link } from "react-router-dom";
import Switch from "../Switch/Swtch";

function Navbar() {
  const [isNavOpen, setIsNavOpen] = useState(true);

  const handleNavClick = () => {
    setIsNavOpen(false);
  };

  return (
    <>
      <header>
        <div className="container">
          <input
            type="checkbox"
            id="check"
            checked={isNavOpen}
            onChange={() => setIsNavOpen(!isNavOpen)}
          />

          <div className="logo-container">
            <h3 className="logo">
              <span>motion</span>
            </h3>
            <div className="SwitchBtn">
              <Switch />
            </div>
          </div>

          <div className="nav-btn">
            <div className="nav-links">
              <ul>
                <li className="nav-link" style={{ "--i": ".6s" }}>
                  <Link to="/" onClick={handleNavClick}>
                    Home
                  </Link>
                </li>

                {/* <li className="nav-link" style={{ "--i": ".6s" }}>
                  <Link to="/movies/popular" onClick={handleNavClick}>
                    Popular
                  </Link>
                </li> */}

                {/* <li className="nav-link" style={{ "--i": ".6s" }}>
                  <Link to="/movies/toprated" onClick={handleNavClick}>
                    Top - Rated
                  </Link>
                </li> */}

                <li className="nav-link" style={{ "--i": ".6s" }}>
                  <Link to="tv/popular" onClick={handleNavClick}>
                    Popular Tv Shows
                  </Link>
                </li>

                <li className="nav-link" style={{ "--i": "1.1s" }}>
                  <Link to="#">
                    Upcoming Movies <i className="fas fa-caret-down"></i>
                  </Link>

                  <div className="dropdown">
                    <ul>
                      <li className="dropdown-link">
                        <Link>
                          Asia <i className="fas fa-caret-down"></i>
                        </Link>

                        <div className="dropdown second">
                          <ul>
                            <li className="dropdown-link">
                              <Link
                                to="/movies/upcoming/japan"
                                onClick={handleNavClick}
                              >
                                Japan
                              </Link>
                            </li>

                            <li className="dropdown-link">
                              <Link
                                to="/movies/upcoming/south_korea"
                                onClick={handleNavClick}
                              >
                                South Korea
                              </Link>
                            </li>

                            <li className="dropdown-link">
                              <Link
                                to="/movies/upcoming/china"
                                onClick={handleNavClick}
                              >
                                China
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </li>

                      <li className="dropdown-link">
                        <Link>
                          Europe <i className="fas fa-caret-down"></i>
                        </Link>

                        <div className="dropdown second">
                          <ul>
                            <li className="dropdown-link">
                              <Link
                                to="/movies/upcoming/france"
                                onClick={handleNavClick}
                              >
                                France
                              </Link>
                            </li>

                            <li className="dropdown-link">
                              <Link
                                to="/movies/upcoming/germany"
                                onClick={handleNavClick}
                              >
                                Germany
                              </Link>
                            </li>

                            <li className="dropdown-link">
                              <Link
                                to="/movies/upcoming/switzerland"
                                onClick={handleNavClick}
                              >
                                Switzerland
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="hamburger-menu-container">
            <div className="hamburger-menu">
              <div></div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Navbar;
