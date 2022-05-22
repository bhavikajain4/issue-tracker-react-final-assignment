import React, { useState } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { authActions } from "../redux/authSlice";
// import profile from "../../assests/images/profile.png";
// import logout from "../../assests/images/logout.png";
import "./NavBar.css";

const NavBar = (props: any) => {
  const dispatch = useDispatch();
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
    <React.Fragment>
      <div className="header-navbar">
        {props.flag && (
          <div>
            <input
              type="search"
              className="search-navbar"
              placeholder="Search"
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
            <Dropdown.Item>My Profile</Dropdown.Item>
            <Dropdown.Item onClick={handleLogout}>Sign Out</Dropdown.Item>
          </DropdownButton>
          {/* <p>Anjali Gupta</p>
          <img src={profile} alt="" onClick={handleProfile} />
          {showDiv && (
            <div className="info-navbar" onClick={handleLogout}>
              <img src={logout} alt="" /> Logout
            </div>
          )} */}
        </div>
      </div>
    </React.Fragment>
  );
};
export default NavBar;
