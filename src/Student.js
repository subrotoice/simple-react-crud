import React from "react";

const Student = (props) => {
  return <button onClick={props.data}>{props.children}</button>;
};

export default Student;
