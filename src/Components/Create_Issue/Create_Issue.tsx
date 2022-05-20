import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Create_Issue.css";
import NavBar from "../NavBar/NavBar";
import Tracker from "../../assets/images/Icon.png";
import { useTranslation } from "react-i18next";
import Language from "../Language/Language";

const Create_Issue = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [allProjects, setAllProjects] = useState([]);
  const [allUser, setAllUser] = useState([]);
  const [summary, setSummary] = useState("");
  const [type, setType] = useState("");
  const [project, setProject] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [assignee, setAssignee] = useState("");
  const [tags, setTags] = useState("");
  const [sprint, setSprint] = useState("");
  const [story, setStory] = useState("");

  const headers: any = {
    userID:
      localStorage.getItem("userId") !== null
        ? localStorage.getItem("userId")
        : "1",
  };
  const handleSubmit = (event: any) => {
    event.preventDefault();
    const issueData = {
      summary,
      type,
      projectID: project,
      description,
      priority,
      status: 1,
      assignee,
      tags: [tags],
      sprint,
      storyPoint: story,
    };
    console.log(issueData);
    axios
      .post(
        "https://hu-22-angular-mockapi-urtjok3rza-wl.a.run.app/issue",
        issueData,
        {
          headers: headers,
        }
      )
      .then((response: any) => {
        localStorage.setItem("issueId", response.data["issueId"]);
        navigate("/dashboard");
      })
      .catch((error: any) => {
        if (summary.trim().length < 5) {
          alert("Summary must be at least 5 characters");
        } else if (type.trim().length <= 0) {
          alert("Type cannot be empty");
        } else if (project.trim().length <= 0) {
          alert("Project cannot be empty");
        } else if (description.trim().length <= 0) {
          alert("Description cannot be empty");
        } else if (priority.trim().length <= 0) {
          alert("Priority cannot be empty");
        } else if (assignee.trim().length <= 0) {
          alert("Assignee cannot be empty");
        } else if (tags.trim().length <= 0) {
          alert("Tags cannot be empty");
        } else if (sprint.trim().length <= 0) {
          alert("Sprint cannot be empty");
        } else if (story.trim().length <= 0) {
          alert("Story must be between 1-13");
        }
        console.log(error.response.data.message);
      });
  };
  const handleReset = (event: any) => {
    event.preventDefault();
    setSummary("");
    setType("");
    setProject("");
    setDescription("");
    setPriority("");
    setAssignee("");
    setTags("");
    setSprint("");
    setStory("");
  };

  useEffect(() => {
    async function getRes() {
      const response = await axios.get(
        "https://hu-22-angular-mockapi-urtjok3rza-wl.a.run.app/user",
        { headers: headers }
      );
      setAllUser(response.data);
    }
    getRes();
  }, []);

  useEffect(() => {
    async function getRes() {
      const response = await axios.get(
        "https://hu-22-angular-mockapi-urtjok3rza-wl.a.run.app/project",
        { headers: headers }
      );
      setAllProjects(response.data);
    }
    getRes();
  }, []);

  return (
    <div className="issue-container-create-issue">
      <div className="sidebar">
        <img src={Tracker} className="sideImg" alt="" />
        <div className="link-div">
          <Link to="/dashboard">{t("PROJECT BOARD")}</Link>
          <Link to="/create_issue" className="active">
            <p className="link">{t("CREATE ISSUES")}</p>
          </Link>
          <Link to="/create_project">{t("CREATE PROJECTS")}</Link>
        </div>
        <Language flag={false} />
      </div>
      <div>
        <NavBar flag={false} />
        <div className="content-container-create-issue">
          <h1 className="h1-create-issue-page">
            {t("Create User Stories/Tasks/Bugs")}
          </h1>
          <form onSubmit={handleSubmit} onReset={handleReset}>
            <div className="input-container-create-issue">
              <label htmlFor="summary">{t("Summary")}</label>
              <input
                type="text"
                placeholder={t("Add Summary")}
                className="summary"
                name="Summary"
                value={summary}
                onChange={(event) => setSummary(event.target.value)}
              />
            </div>
            <div className="select-input">
              <div className="input-container-create-issue">
                <label htmlFor="select">{t("Type")}</label>
                <select
                  className="select"
                  name="Type"
                  value={type}
                  onChange={(event) => setType(event.target.value)}
                >
                  <option disabled selected hidden value="">
                    {t("Select")}
                  </option>
                  <option value="1">{t("BUG")}</option>
                  <option value="2">{t("TASK")}</option>
                  <option value="3">{t("STORY")}</option>
                </select>
              </div>
              <div className="input-container-create-issue">
                <label htmlFor="select">{t("Project")}</label>
                <select
                  className="select"
                  name="Project"
                  value={project}
                  onChange={(event) => setProject(event.target.value)}
                >
                  <option
                    selected
                    disabled
                    hidden
                    value=""
                    style={{ display: "none" }}
                  >
                    {t("Select")}
                  </option>
                  {allProjects.map((project) => (
                    <option
                      key={project["projectID"]}
                      value={project["projectID"]}
                    >
                      {project["projectID"]}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="input-container-create-issue">
              <label htmlFor="">{t("Description")}</label>
              <textarea
                cols={10}
                rows={4}
                name="Description"
                className="description"
                placeholder={t("Write description")}
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </div>

            <div className="select-input">
              <div className="input-container-create-issue">
                <label htmlFor="select">{t("Priority")}</label>
                <select
                  className="select"
                  name="Priority"
                  value={priority}
                  onChange={(event) => setPriority(event.target.value)}
                >
                  <option selected disabled hidden value="">
                    {t("Select")}
                  </option>
                  <option value="1">LOW</option>
                  <option value="2">MEDIUM</option>
                  <option value="3">HIGH</option>
                </select>
              </div>

              <div className="input-container-create-issue">
                <label htmlFor="select">{t("Asignee")}</label>
                <select
                  className="select"
                  name="Asignee"
                  value={assignee}
                  onChange={(event) => setAssignee(event.target.value)}
                >
                  <option selected disabled hidden value="">
                    {t("Select")}
                  </option>
                  {allUser.map((user) => (
                    <option key={user["id"]} value={user["id"]}>
                      {user["name"]}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="select-input">
              <div className="input-container-create-issue">
                <label htmlFor="select">{t("Tags")}</label>
                <select
                  className="select"
                  name="Tags"
                  value={tags}
                  onChange={(event) => setTags(event.target.value)}
                >
                  <option selected disabled hidden value="">
                    {t("Select")}
                  </option>
                  <option>{t("React")}</option>
                  <option>Hu-22</option>
                  <option>HashedIn</option>
                </select>
              </div>

              <div className="input-container-create-issue">
                <label htmlFor="select">{t("Sprint")}</label>
                <select
                  className="select"
                  name="Sprint"
                  value={sprint}
                  onChange={(event) => setSprint(event.target.value)}
                >
                  <option selected disabled hidden value="">
                    {t("Select")}
                  </option>
                  <option>React_1</option>
                  <option>React_2</option>
                  <option>React_3</option>
                </select>
              </div>
            </div>
            <div className="input-container-create-issue">
              <label htmlFor="">{t("Story Points")}</label>
              <input
                type="number"
                name="Story"
                min="1"
                max="12"
                className="story"
                placeholder="1,2,3..."
                value={story}
                onChange={(event) => setStory(event.target.value)}
              />
            </div>
            <div className="button">
              <button type="reset" className="reset">
                {t("RESET")}
              </button>
              <button type="submit" className="create">
                {t("CREATE")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Create_Issue;
