/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useContext, useEffect, useState } from "react";
import { CardStyled } from "./CardStyled";

export function Card(props) {
  return (
    <CardStyled>
      <p>{props.name}</p>
      <p>{props.desc}</p>
      <p>{props.email}</p>
      <p>{props.role}</p>
      <p>{props.whats}</p>
      {props.imgSrc && <img src={props.imgSrc} alt="" />}
    </CardStyled>
  );
}
