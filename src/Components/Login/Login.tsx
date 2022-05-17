import React, { useState } from "react";
import axios from "axios";
// import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button, Form } from "react-bootstrap";
import Tracker from "../../assets/images/Icon.png";
import SideImg from "../../assets/images/sideImg.png";
import "./Login.css";
import Language from "../Language/Language";

const Login = () => {
  const { t } = useTranslation();
  //   const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const emailHandler = (event: any) => {
    setEmail(event.target.value);
  };
  const passwordHandler = (event: any) => {
    setPassword(event.target.value);
  };
  const onSubmit = (event: any) => {
    event.preventDefault();
    axios
      .post(
        "https://hu-22-angular-mockapi-urtjok3rza-wl.a.run.app/auth/login",
        {
          email: email,
          password: password,
        }
      )
      .then((response: any) => {
        console.log(response);
        // navigate("/create_issue");
      })
      .catch((error: any) => {
        console.log(error.response.data["error"]);
        // navigate("/");
      });
  };
  return (
    <div className="login">
      <div className="sidebar">
        <img src={Tracker} className="tracker" />
        <img src={SideImg} className="tracker" />
        <Language />
        <div>
          {/* <Dropdown>
            <Dropdown.Toggle variant="dark" id="dropdown-basic" className={classes.dropdown}>
              {t('LANGUAGE')}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {languages.map(({ code, name, country_code }) => (
                <Dropdown.Item key={country_code}>
                <button
                  className="dropdown-item"
                  onClick={() => i18next.changeLanguage(code)}
                  key={country_code}>
                  {name}
                </button>
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown> */}
        </div>
      </div>
      <div className="login_section">
        <Form className="form" onSubmit={onSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>{t("Email")}</Form.Label>
            <Form.Control
              type="email"
              placeholder={t("Enter your email address")}
              onChange={emailHandler}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>{t("Password")}</Form.Label>
            <Form.Control
              type="password"
              placeholder="**********"
              onChange={passwordHandler}
            />
          </Form.Group>
          <Button variant="dark" className="button" type="submit">
            {t("LOGIN")}
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Login;
