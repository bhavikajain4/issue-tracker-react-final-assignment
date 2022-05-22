import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Img from "../../assets/images/no_project.png";
import "./NoProject.css";

const NoProject = () => {
  const { t } = useTranslation();
  return (
    <div>
      <div className="text-home-no-project-page">
        <h1>{t("Welcome to Tracker")}</h1>
      </div>
      <p className="paragraph-no-project-page">
        {t("Seems like you haven'nt created any project yet.")}
        <Link to="/create_project" className="link-no-project-page">
          <p> {t("Click here")} </p>
        </Link>
        {t("to onboard a new project.")}
      </p>
      <img src={Img} alt="" className="img-no-project-page " />
    </div>
  );
};
export default NoProject;
