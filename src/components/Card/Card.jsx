/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useContext, useEffect, useState } from "react";
import { CardContainer, CardStyled } from "./CardStyled";

export function Card(props) {
  return (
    <CardContainer>
      <CardStyled>
        {props.imgSrc && <img src={props.imgSrc} draggable="false" />}
        <div>
          <h2>{props.name}</h2>
          <p>{props.role}</p>
        </div>
      </CardStyled>
    </CardContainer>
  );
}
