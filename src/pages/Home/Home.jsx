/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";

import {
  AData,
  BodyContent,
  BodyInfo,
  DataNumber,
  GuardaBodyInfo,
  GuardaMainData,
  HomeBody,
  MainBody,
  MainData,
} from "./HomeStyled.jsx";
import {
  getCellService,
  getInfosService,
  getLtvService,
} from "../../services/ltvService.js";

export default function Home() {
  const [ltv, setLtv] = useState();
  const [clients, setClients] = useState();
  const [infos, setInfos] = useState();

  async function getLtv() {
    const response = await getLtvService();
    setLtv(response.data.result);
  }
  async function getClients() {
    const response = await getCellService("C4");
    setClients(response.data);
  }
  async function getInfos() {
    const response = await getInfosService();
    setInfos(response.data);
  }

  useEffect(() => {
    getLtv();
    getClients();
    getInfos();
  }, []);

  return (
    <>
      <HomeBody>
        <MainBody>
          <GuardaMainData>
            <MainData>
              <h3>{clients}</h3>
              <h2>Clientes Ativos</h2>
            </MainData>
          </GuardaMainData>
          <GuardaMainData>
            <MainData>
              <h3>{ltv}</h3>
              <h2>LTV</h2>
            </MainData>
          </GuardaMainData>
        </MainBody>
        <BodyContent>
          {infos && (
            <GuardaBodyInfo>
              <BodyInfo>
                <AData>
                  <DataNumber>
                    <h4>{infos.sumPages}</h4>
                  </DataNumber>
                  <h3>Sites</h3>
                </AData>
                <AData>
                  <DataNumber>
                    <h4>{infos.sumGMB}</h4>
                  </DataNumber>
                  <h3>GMB</h3>
                </AData>
                <AData>
                  <DataNumber>
                    <h4>{infos.sumRedesSociais}</h4>
                  </DataNumber>
                  <h3>Redes</h3>
                </AData>
                <AData>
                  <DataNumber>
                    <h4>{infos.sumAds}</h4>
                  </DataNumber>
                  <h3>Ads</h3>
                </AData>
              </BodyInfo>
            </GuardaBodyInfo>
          )}
        </BodyContent>
      </HomeBody>
    </>
  );
}
