import React from "react";

const Alert = ({ type, text }) => {
  return <div className={`alert alert-${type}`} data-testid = {'alert-test'}>{text}</div>;
};

export default Alert;
