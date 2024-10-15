/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";

import {
  AData,
  BodyContent,
  BodyInfo,
  DataNumber,
  Graph,
  GraphBtns,
  GuardaBodyInfo,
  GuardaGraph,
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
import Skeleton from "react-loading-skeleton";
import { InfoSkeleton } from "../../components/InfoSkeleton/InfoSkeleton.jsx";

export default function Home() {
  const [ltv, setLtv] = useState();
  const [clients, setClients] = useState();
  const [churn, setChurn] = useState();
  const [newClients, setNewClients] = useState();
  const [infos, setInfos] = useState();
  const [graph, setGraph] = useState("");
  const [graphUrl, setGraphUrl] = useState("");

  async function getLtv() {
    const response = await getLtvService();
    setLtv(response.data.result);
    handleGraph("planos");
  }
  async function getClients() {
    const response = await getCellService("C4");
    setClients(response.data);
  }
  async function getChurn() {
    const response = await getCellService("Q9");
    setChurn(response.data);
  }
  async function getNewClients() {
    const response = await getCellService("Q7");
    setNewClients(response.data);
  }
  async function getInfos() {
    const response = await getInfosService();
    setInfos(response.data);
  }

  function handleGraph(string) {
    if (string == "planos") {
      setGraph("planos");
      setGraphUrl(
        "https://charts.mongodb.com/charts-mixconnect-swftspq/embed/charts?id=3494e42b-93a3-4aed-8597-a54627d13bd4&maxDataAge=3600&theme=dark&autoRefresh=true"
      );
    }
    if (string == "ads") {
      setGraph("ads");
      setGraphUrl(
        "https://charts.mongodb.com/charts-mixconnect-swftspq/embed/charts?id=7f34005b-e41c-4558-862f-9e56cd54b661&maxDataAge=3600&theme=dark&autoRefresh=true"
      );
    }
  }

  useEffect(() => {
    getLtv();
    getClients();
    getChurn();
    getNewClients();
    getInfos();
  }, []);

  return (
    <>
      <HomeBody>
        <MainBody>
          <GuardaMainData>
            <MainData>
              <h3>{clients || <Skeleton width="130px" />}</h3>
              <h2>Clientes Ativos</h2>
            </MainData>
          </GuardaMainData>
          <GuardaMainData>
            <MainData>
              <h3>{ltv || <Skeleton width="120px" />}</h3>
              <h2>LTV (mês)</h2>
            </MainData>
          </GuardaMainData>
          <GuardaMainData>
            <MainData>
              <h3>{churn || <Skeleton width="120px" />}</h3>
              <h2>Churn Mensal</h2>
            </MainData>
          </GuardaMainData>
          <GuardaMainData>
            <MainData>
              <h3>
                {newClients >= 0 ? newClients : <Skeleton width="120px" />}
                {newClients > 0 && <img src="/seta-up.svg" />}
              </h3>
              <h2>Novos Clientes</h2>
            </MainData>
          </GuardaMainData>
        </MainBody>
        <BodyContent>
          {infos ? (
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
          ) : (
            <InfoSkeleton></InfoSkeleton>
          )}
          <GuardaGraph>
            <Graph>
              <iframe width="400" height="300" src={graphUrl}></iframe>
            </Graph>
            <GraphBtns>
              <button
                className={graph == "planos" ? "active" : ""}
                onClick={() => handleGraph("planos")}
              >
                <span>
                  <span></span>
                </span>
                <p>Planos</p>
              </button>
              <button
                className={graph == "ads" ? "active" : ""}
                onClick={() => handleGraph("ads")}
              >
                <span>
                  <span></span>
                </span>
                <p>Ads</p>
              </button>
            </GraphBtns>
          </GuardaGraph>
        </BodyContent>
      </HomeBody>
    </>
  );
}
