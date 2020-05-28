import React from "react";
import "./Restaurant.scss";

export default function Restaurant(props) {
  return (
    <div id="restaurant-container">
      {/* <div id="image"></div> */}
      <div id="name">{props.name}</div>
      <div id="address">{props.address}</div>
      <div id="description">{props.description}</div>
    </div>
  );
}
