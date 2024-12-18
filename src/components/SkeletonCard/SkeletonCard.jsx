/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useContext, useEffect, useState } from "react";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { CardContainer, CardStyled } from "../Card/CardStyled";

export function SkeletonCard({ cards }) {
  return Array(cards)
    .fill(0)
    .map((item, index) => (
      <CardContainer key={index} $isactive={true}>
        <CardStyled>
          <img src="/avatar-default.png" draggable="false" />
          <div>
            <h2>{<Skeleton width="200px" />}</h2>
            <p>{<Skeleton width="100px" />}</p>
          </div>
        </CardStyled>
      </CardContainer>
    ));
}
