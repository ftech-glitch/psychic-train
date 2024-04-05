import React, { useContext } from "react";
import styles from "./NavBar.module.css";
import { NavLink } from "react-router-dom";
import UserContext from "../context/user";

const NavBar = () => {
  const userCtx = useContext(UserContext);
  return (
    <header className={styles.navbar}>
      <nav>
        <ul>
          <li>
            <NavLink
              className={(navData) => (navData.isActive ? styles.active : "")}
              to="/"
            >
              The HopSpot
            </NavLink>
          </li>
          {userCtx.isSignedIn && (
            <>
              <li>
                <NavLink
                  className={(navData) => (navData.isActive ? styles.active : "")}
                  to="/add"
                >
                  Submit a new brewery
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={(navData) => (navData.isActive ? styles.active : "")}
                  to="/review"
                >
                  Share your experience
                </NavLink>
              </li></>
          )}

        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
