/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useContext, useEffect, useState } from "react";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { PlanItemSkeleton } from "./PlanSkeletonStyled";

export function PlanSkeleton({ cards }) {
  return Array(cards)
    .fill(0)
    .map((item, index) => (
      <PlanItemSkeleton key={index}>
        <div>
          <h2>{<Skeleton width="100px" />}</h2>
        </div>
      </PlanItemSkeleton>
    ));
}
