/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useContext, useEffect, useState } from "react";
import { CardContainer, CardStyled } from "./CardStyled";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export function Card(props) {
  return (
    <CardContainer>
      <CardStyled>
        <img src={props.imgSrc || "/avatar-default.png"} draggable="false" />
        <div>
          <h2>{props.name || <Skeleton />}</h2>
          <p>{props.role}</p>
        </div>
      </CardStyled>
    </CardContainer>
  );
}
