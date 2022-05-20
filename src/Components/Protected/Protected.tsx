import { Navigate } from "react-router-dom";

import PropTypes from "prop-types";

const Protected = (props: any) => {
  if (props.isLoggedIn !== "true") {
    return <Navigate to="/" replace />;
  }

  return props.children;
};

Protected.propTypes = {
  isLoggedIn: PropTypes.any,

  children: PropTypes.any.isRequired,
};

export default Protected;
