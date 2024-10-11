/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useContext, useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import {
  AData,
  BodyInfo,
  DataNumber,
  GuardaBodyInfo,
} from "../../pages/Home/HomeStyled";

export function InfoSkeleton({ cards }) {
  return Array(cards)
    .fill(0)
    .map((item, index) => (
      <GuardaBodyInfo key={index}>
        <BodyInfo>
          <AData>
            <DataNumber>
              <h4>{<Skeleton width="40px" />}</h4>
            </DataNumber>
            <h3>Sites</h3>
          </AData>
          <AData>
            <DataNumber>
              <h4>{<Skeleton width="40px" />}</h4>
            </DataNumber>
            <h3>GMB</h3>
          </AData>
          <AData>
            <DataNumber>
              <h4>{<Skeleton width="40px" />}</h4>
            </DataNumber>
            <h3>Redes</h3>
          </AData>
          <AData>
            <DataNumber>
              <h4>{<Skeleton width="40px" />}</h4>
            </DataNumber>
            <h3>Ads</h3>
          </AData>
        </BodyInfo>
      </GuardaBodyInfo>
    ));
}
