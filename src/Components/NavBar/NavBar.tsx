import React, { useState } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { authActions } from "../redux/authSlice";

import { useTranslation } from "react-i18next";
import "./NavBar.css";

const NavBar = (props: any) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [showDiv, setShowDiv] = useState(false);
  const handleProfile = () => {
    setShowDiv(!showDiv);
  };
  const handleLogout = () => {
    localStorage.removeItem("userId");
    dispatch(authActions.logout());
    window.location.href = "/";
  };
  return (
    <div className="header-navbar">
      {props.flag && (
        <div>
          <input
            type="search"
            className="search-navbar"
            placeholder={t("Search")}
          />
        </div>
      )}
      {!props.flag && <div className="search-navbar"></div>}
      <div className="user-navbar">
        <DropdownButton
          className="dropdown-custom"
          id="dropdown-basic-button button-custom"
          variant="secondary"
          title="Anjali Gupta"
        >
          <Dropdown.Item>{t("My Profile")}</Dropdown.Item>
          <Dropdown.Item onClick={handleLogout}>{t("Sign Out")}</Dropdown.Item>
        </DropdownButton>
      </div>
    </div>
  );
};
export default NavBar;
