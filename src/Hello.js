import React from "react";

const Hello = (props) => {
  return (
    <div>
      <h1>Hello</h1>
      <h1>Hello2</h1>
      <h1>{props.repeatOk}</h1>
    </div>
  );
};

export default Hello;
