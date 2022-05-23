import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Create_Issue.css";
import NavBar from "../NavBar/NavBar";
import Tracker from "../../assets/images/Icon.png";
import { useTranslation } from "react-i18next";
import Language from "../Language/Language";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";

const Create_Issue = () => {
  const CreateIssueSchema = Yup.object().shape({
    summary: Yup.string().required(),
    type: Yup.number().required(),
    projectID: Yup.string().required(),
    description: Yup.string().required(),
    priority: Yup.number().required(),
    status: Yup.number().required(),
    assignee: Yup.string().required(),
    tags: Yup.string().required(),
    sprint: Yup.string().required(),
    storyPoint: Yup.number().required(),
  });

  const initialValues = {
    summary: "",
    type: "",
    projectID: "",
    description: "",
    priority: 0,
    status: 0,
    assignee: "",
    tags: "",
    sprint: "",
    storyPoint: "",
  };

  const { t } = useTranslation();
  const navigate = useNavigate();
  const [allProjects, setAllProjects] = useState([]);
  const [allUser, setAllUser] = useState([]);

  const headers: any = {
    userID:
      localStorage.getItem("userId") !== null
        ? localStorage.getItem("userId")
        : "1",
  };
  const handleSubmit = (event: any) => {
    event.preventDefault();
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

  const handleReset = (resetForm: any) => {
    if (window.confirm("Reset?")) {
      resetForm();
    }
  };
  return (
    <div className="issue-container-create-issue">
      <div className="sidebar">
        <img src={Tracker} className="sideImg" alt="" />
        <div className="link-div">
          <Link to="/dashboard">{t("project_board")}</Link>
          <Link to="/create_issue" className="active">
            <p className="link">{t("create_issues")}</p>
          </Link>
          <Link to="/create_project">{t("create_projects")}</Link>
        </div>
        <Language flag={false} />
      </div>
      <div>
        <NavBar flag={false} />
        <div className="content-container-create-issue">
          <Formik
            initialValues={initialValues}
            validationSchema={CreateIssueSchema}
            onSubmit={(values: any, { resetForm }) => {
              console.log(values);
              resetForm();
              values.type = Number(values.type);
              values.priority = Number(values.priority);
              values.storyPoint = Number(values.storyPoint);
              values.status = 1;
              values.tags = Array(values.tags);
              axios
                .post(
                  "https://hu-22-angular-mockapi-urtjok3rza-wl.a.run.app/issue",
                  values,
                  {
                    headers: headers,
                  }
                )
                .then((response: any) => {
                  // localStorage.setItem("issueId", response.data["issueId"]);
                  navigate("/dashboard");
                });
            }}
          >
            {(formik) => {
              const { errors, touched, isValid, dirty } = formik;
              return (
                <div className="container">
                  <h1 className="mb-3 h1-create-issue-page">
                    {t("Create User Stories/Tasks/Bugs")}
                  </h1>
                  <Form>
                    <div className="form-row mb-2">
                      <label htmlFor="summary">{t("summary")}</label>

                      <Field
                        type="text"
                        name="summary"
                        id="summary"
                        placeholder={t("summary")}
                        className={
                          errors.summary && touched.summary
                            ? "input-error && input-container-create-issue"
                            : "input-container-create-issue"
                        }
                      />
                      <br />
                      <ErrorMessage
                        name="summary"
                        component="span"
                        className="error error-custom"
                      />
                    </div>

                    <div className="form-row row mb-2">
                      <div className="col">
                        <label htmlFor="type">{t("type")}</label>
                        <br />
                        <Field
                          name="type"
                          as="select"
                          className="dropdown-container-create-issue"
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
                          <option value="1">{t("BUG")}</option>
                          <option value="2">{t("TASK")}</option>
                          <option value="3">{t("STORY")}</option>
                        </Field>
                        <br />
                        <ErrorMessage
                          name="type"
                          component="span"
                          className="error error-custom"
                        />
                      </div>

                      <div className="col">
                        <label htmlFor="projectID">{t("project")}</label>
                        <br />
                        <Field
                          name="projectID"
                          as="select"
                          className="dropdown-container-create-issue"
                        >
                          <option
                            selected
                            disabled
                            hidden
                            value=""
                            style={{ display: "none" }}
                            className={
                              errors.projectID && touched.projectID
                                ? "input-error "
                                : ""
                            }
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
                        </Field>
                        <br />
                        <ErrorMessage
                          name="projectID"
                          component="span"
                          className="error error-custom"
                        />
                      </div>
                    </div>
                    <div className="form-row mb-2">
                      <label htmlFor="description">{t("description")}</label>
                      <Field
                        type="text"
                        name="description"
                        id="description"
                        placeholder={t("description")}
                        className={
                          errors.description && touched.description
                            ? "input-error && input-container-create-issue"
                            : "input-container-create-issue"
                        }
                      />
                      <br />
                      <ErrorMessage
                        name="description"
                        component="span"
                        className="error error-custom"
                      />
                    </div>

                    <div className="form-row row mb-2">
                      <div className="col">
                        <label htmlFor="priority">{t("Priority")}</label>
                        <br />
                        <Field
                          name="priority"
                          as="select"
                          className="dropdown-container-create-issue"
                        >
                          <option selected disabled hidden value="">
                            {t("Select")}
                          </option>
                          <option value="1">LOW</option>
                          <option value="2">MEDIUM</option>
                          <option value="3">HIGH</option>
                        </Field>
                        <br />
                        <ErrorMessage
                          name="priority"
                          component="span"
                          className="error error-custom"
                        />
                      </div>

                      <div className="col">
                        <label htmlFor="assignee">{t("Assignee")}</label>
                        <br />
                        <Field
                          name="assignee"
                          as="select"
                          className="dropdown-container-create-issue"
                        >
                          <option selected disabled hidden value="">
                            {t("Select")}
                          </option>
                          {allUser.map((user) => (
                            <option key={user["id"]} value={user["id"]}>
                              {user["name"]}
                            </option>
                          ))}
                        </Field>
                        <br />
                        <ErrorMessage
                          name="assignee"
                          component="span"
                          className="error error-custom"
                        />
                      </div>
                    </div>

                    <div className="form-row row mb-2">
                      <div className="col">
                        <label htmlFor="tags">{t("Tags")}</label>
                        <br />
                        <Field
                          name="tags"
                          as="select"
                          className="dropdown-container-create-issue"
                        >
                          <option selected disabled hidden value="">
                            {t("Select")}
                          </option>
                          <option>Tag 1</option>
                          <option>Tag 2</option>
                          <option>Tag 3</option>
                        </Field>
                        <br />
                        <ErrorMessage
                          name="tags"
                          component="span"
                          className="error error-custom"
                        />
                      </div>

                      <div className="col">
                        <label htmlFor="sprint">{t("Sprint")}</label>
                        <br />
                        <Field
                          name="sprint"
                          as="select"
                          className="dropdown-container-create-issue"
                        >
                          <option selected disabled hidden value="">
                            {t("Select")}
                          </option>
                          <option>Sprint 1</option>
                          <option>Sprint 2</option>
                          <option>Sprint 3</option>
                        </Field>
                        <br />
                        <ErrorMessage
                          name="sprint"
                          component="span"
                          className="error error-custom"
                        />
                      </div>
                    </div>

                    <div className="form-row mb-2">
                      <label htmlFor="storyPoint">{t("storyPoint")}</label>
                      <br />
                      <Field
                        type="text"
                        name="storyPoint"
                        id="storyPoint"
                        placeholder={t("storyPoint")}
                        className={
                          errors.storyPoint && touched.storyPoint
                            ? "input-error && input-container-create-issue"
                            : "input-container-login"
                        }
                      />
                      <br />
                      <ErrorMessage
                        name="storyPoint"
                        component="span"
                        className="error error-custom"
                      />
                    </div>
                    <div className="row">
                      <button
                        type="submit"
                        className={
                          !(dirty && isValid)
                            ? "disabled-btn  create-button-create-issue-page col  "
                            : " create-button-create-issue-page col "
                        }
                        disabled={!(dirty && isValid)}
                      >
                        {t("create")}
                      </button>

                      <button
                        type="reset"
                        onClick={handleReset.bind(null, formik.resetForm)}
                        className={
                          !(dirty && isValid)
                            ? "disabled-btn reset-button-create-issue-page col"
                            : "reset-button-create-issue-page col "
                        }
                      >
                        {t("reset")}
                      </button>
                    </div>
                  </Form>
                </div>
              );
            }}
          </Formik>
        </div>
      </div>
    </div>
  );
};
export default Create_Issue;
