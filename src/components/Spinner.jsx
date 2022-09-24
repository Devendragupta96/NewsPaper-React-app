import React, { Component } from "react";
import spinner from "./loader.gif";

export class Spinner extends Component {
  render() {
    return (
      <div className="text-center">
        <img src={spinner} alt="spinner" />
      </div>
    );
  }
}

export default Spinner;
