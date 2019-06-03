import React from "react";

const Form = props => (
  <form onSubmit = {props.getWeather}>
    <input type="text" name="username" placeholder="Enter name"/>
    <button>Show details</button>
  </form>
);

export default Form;
