import React from "react";
import { Link, NavLink } from "react-router-dom";
import Tracker from "../../assets/images/Icon.png";
import { useTranslation } from "react-i18next";
import Language from "../Language/Language";
import "./SideNav.css";

const Sidebar = () => {
  const { t } = useTranslation();
  return (
    <div className="sidebar-container">
      <img src={Tracker} className="sideImg-sideBar" alt="" />
      <div className="link-div">
        <Link to="/dashboard" className="active">
          <p className="link">{t("PROJECT BOARD")}</p>
        </Link>
        <Link to="/create_issue">
          <p className="link">{t("CREATE ISSUES")}</p>
        </Link>

        <Link to="/create_project">
          <p className="link">{t("CREATE PROJECTS")}</p>
        </Link>
      </div>
      <Language />
    </div>
  );
};

export default Sidebar;
