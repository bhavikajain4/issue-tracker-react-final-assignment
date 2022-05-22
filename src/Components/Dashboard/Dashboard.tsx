import NoProject from "../NoProject/NoProject";
import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../NavBar/NavBar";
import Tracker from "../../assets/images/Icon.png";
import "./Dashboard.css";
import { Link } from "react-router-dom";

import IssueCards from "../Issue_Cards_Dashboard/Issue_Cards_Dashboard";
import { useTranslation } from "react-i18next";
import Language from "../Language/Language";
import Issue_Cards_Dashboard from "../Issue_Cards_Dashboard/Issue_Cards_Dashboard";

const Dashboard = () => {
  const { t } = useTranslation();
  const [allProjects, setAllProjects] = useState([]);
  const [user, setUser] = useState([]);
  const [project, setProject] = useState("");
  const [issues, setIssues] = useState([] as any[]);
  const [assignees, setAssignees] = useState([] as any[]);
  const [fassign, setFassign] = useState("");
  const [fpriority, setFpriority] = useState("");
  const headers: any = {
    userID:
      localStorage.getItem("userId") !== null
        ? localStorage.getItem("userId")
        : "1",
  };
  useEffect(() => {
    async function getUser() {
      const response = await axios.get(
        `https://hu-22-angular-mockapi-urtjok3rza-wl.a.run.app/user?userID=${localStorage.getItem(
          "userId"
        )}`,
        { headers: headers }
      );
      setUser(response.data[0].name);
    }
    getUser();
  }, []);

  useEffect(() => {
    async function getRes() {
      const response = await axios.get(
        "https://hu-22-angular-mockapi-urtjok3rza-wl.a.run.app/project",
        { headers: headers }
      );
      console.log(response.data);
      setAllProjects(response.data);
    }
    getRes();
  }, []);

  useEffect(() => {
    async function getIssues() {
      const response = await axios.get(
        `https://hu-22-angular-mockapi-urtjok3rza-wl.a.run.app/issue?projectID=${project}`,
        { headers: headers }
      );
      setIssues(response.data);
    }
    getIssues();
  }, [project]);
  useEffect(() => {
    const assign = [...issues];
    assign.map((x) => x.assignee);
    const a = assign.map((x) => x.assignee);
    const unique = [...new Map(a.map((obj) => [obj["id"], obj])).values()];
    setAssignees(unique);
  }, [issues]);
  return (
    <div className="dashboard-container">
      <div className="sidebar-dashboard">
        <img src={Tracker} className="sideImg-dashboard" alt="" />
        <div className="link-div-dashboard">
          <Link to="/dashboard" className="active">
            <p className="link-dashboard">{t("PROJECT BOARD")}</p>
          </Link>
          <Link to="/create_issue">{t("CREATE ISSUES")}</Link>
          <Link to="/create_project">{t("CREATE PROJECTS")}</Link>
        </div>
        <Language props={false} />
      </div>
      <div className="content">
        <NavBar flag={true} />
        {allProjects.length <= 0 && <NoProject />}
        {allProjects.length > 0 && (
          <React.Fragment>
            <div className="text-home-dashboard">
              <h1>{t("Project Details")}</h1>
              <button className="button-dashboard">{t("VIEW INSIGHT")}</button>
            </div>

            <div className="project-dashboard">
              <div className="input-container-dashboard">
                <label htmlFor="select">{t("Project Name")}</label>
                <select
                  className="select-dashboard"
                  name="Priority"
                  onChange={(event) => {
                    setProject(event.target.value);
                  }}
                >
                  <option selected disabled hidden>
                    {t("Select")}
                  </option>
                  {allProjects.map((project) => (
                    <option
                      key={project["projectID"]}
                      value={project["projectID"]}
                    >
                      {project["projectName"]}
                    </option>
                  ))}
                </select>
              </div>
              <div className="input-container-dashboard">
                <label htmlFor="select">{"Project Owner"}</label>
                <input
                  type="text"
                  className="owner-dashboard"
                  name="project Owner"
                  value={user}
                />
              </div>
            </div>
            <div className="filter-dashboard">
              <div className="input-container-dashboard" id="assignee">
                <select
                  className="filter-container-dashboard"
                  onChange={(event) => {
                    setFassign(event.target.value);
                  }}
                  name="Priority"
                >
                  <option selected value="">
                    {t("None")}
                  </option>
                  {assignees.map((user) => (
                    <option key={user["id"]} value={user["id"]}>
                      {user["name"]}
                    </option>
                  ))}
                </select>
                <label htmlFor="select">{t("Filter Asignee")}</label>
              </div>
              <div className="input-container-dashboard" id="priority">
                <select
                  className="filter-container-dashboard"
                  name="Priority"
                  onChange={(event) => {
                    setFpriority(event.target.value);
                  }}
                >
                  <option selected value="">
                    {t("None")}
                  </option>
                  <option value="1">{"LOW"}</option>
                  <option value="2">{"MEDIUM"}</option>
                  <option value="3">{"HIGH"}</option>
                </select>
                <label htmlFor="select">{t("Filter Priority")}</label>
              </div>
            </div>
            <Issue_Cards_Dashboard
              list={issues}
              filterbyassignee={fassign}
              filterbypriority={fpriority}
            />
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
