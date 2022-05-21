import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "react-bootstrap";
import Tracker from "../../assets/images/Icon.png";
import SideImg from "../../assets/images/sideImg.png";
import "./Login.css";
import Language from "../Language/Language";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";

const Login = () => {
  const SignInSchema = Yup.object().shape({
    email: Yup.string().email().required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(4, "Password is too short - should be 4 chars minimum"),
  });
  const initialValues = {
    email: "",
    password: "",
  };

  const { t } = useTranslation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const emailHandler = (event: any) => {
    setEmail(event.target.value);
  };
  const passwordHandler = (event: any) => {
    setPassword(event.target.value);
  };

  return (
    <div className="login">
      <div className="sidebar">
        <img src={Tracker} className="tracker" />
        <img src={SideImg} className="tracker" />
        <Language />
        {/* <div></div> */}
      </div>
      <div className="login_section">
        <Formik
          initialValues={initialValues}
          validationSchema={SignInSchema}
          onSubmit={(values) => {
            axios
              .post(
                "https://hu-22-angular-mockapi-urtjok3rza-wl.a.run.app/auth/login",
                values
              )
              .then((response: any) => {
                console.log(response);
                navigate("/create_issue");
              })
              .catch((error: any) => {
                console.log(error.response.data["error"]);
                navigate("/");
              });
          }}
        >
          {(formik) => {
            const { errors, touched, isValid, dirty } = formik;
            return (
              <div className="container">
                <h1 className="mb-5">{t("login")}</h1>
                <Form>
                  <div className="form-row mb-3">
                    <label htmlFor="email">{t("email")}</label>
                    <br />
                    <Field
                      type="email"
                      name="email"
                      id="email"
                      placeholder={t("enter_your_email_address")}
                      className={
                        errors.email && touched.email
                          ? "input-error && input-container-login"
                          : "input-container-login"
                      }
                    />
                    <br />
                    <ErrorMessage
                      name="email"
                      component="span"
                      className="error error-custom"
                    />
                  </div>

                  <div className="form-row mb-5">
                    <label htmlFor="password">{t("password")}</label>
                    <br />
                    <Field
                      type="password"
                      name="password"
                      id="password"
                      placeholder="**********"
                      className={
                        errors.password && touched.password
                          ? "input-error input-container-login"
                          : "input-container-login"
                      }
                    />
                    <br />
                    <ErrorMessage
                      name="password"
                      component="span"
                      className="error error-custom"
                    />
                  </div>

                  <button
                    type="submit"
                    className={
                      !(dirty && isValid)
                        ? "disabled-btn login-button-login-page"
                        : "login-button-login-page"
                    }
                    disabled={!(dirty && isValid)}
                  >
                    {t("login")}
                  </button>
                </Form>
              </div>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
