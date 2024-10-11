/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useContext, useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import {
  AClient,
  ClientContent,
  ClientHead,
} from "../../pages/Clients/ClientsStyled";

export function ClientSkeleton({ cards }) {
  return Array(cards)
    .fill(0)
    .map((item, index) => (
      <AClient key={index}>
        <ClientContent>
          <ClientHead>
            <img src="/avatar-default.png" className="clientLogo" alt="logo" />
            <div>
              <h2>{<Skeleton width="100px" />}</h2>
              <p>{<Skeleton width="80px" />}</p>
            </div>
          </ClientHead>
          <p>Gestor: {<Skeleton width="100px" />}</p>
          <p>CS: {<Skeleton width="100px" />}</p>
          <p>Valor Contrato: R$ {<Skeleton width="100px" />}</p>
        </ClientContent>
      </AClient>
    ));
}
