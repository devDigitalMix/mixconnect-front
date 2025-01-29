/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
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
  MainHeader,
  MessageForm,
} from "./HomeStyled.jsx";
import {
  getCellService,
  getInfosService,
  getLtvService,
} from "../../services/ltvService.js";
import Skeleton from "react-loading-skeleton";
import { InfoSkeleton } from "../../components/InfoSkeleton/InfoSkeleton.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContent.jsx";
import { userLogged } from "../../services/employeeService.js";
import { Input } from "../../components/Input/Input.jsx";
import {
  createMessageService,
  getMessageService,
} from "../../services/messageService.js";

export default function Home() {
  const [ltv, setLtv] = useState();
  const { user, setUser } = useContext(UserContext);
  const [clients, setClients] = useState();
  const [churn, setChurn] = useState();
  const [newClients, setNewClients] = useState();
  const [infos, setInfos] = useState();
  const [graph, setGraph] = useState("");
  const [graphUrl, setGraphUrl] = useState("");
  const [texto1, setTexto1] = useState("");
  const [texto2, setTexto2] = useState("");
  const [clock, setClock] = useState("");
  const [mostra, setMostra] = useState(false);
  const [createMessage, setCreateMessage] = useState(false);
  const [cronometro, setCronometro] = useState();
  const [message, setMessage] = useState({});
  const navigate = useNavigate();

  function isDiaUtil(data) {
    const diaSemana = data.getDay();
    return diaSemana >= 1 && diaSemana <= 5;
  }

  async function findUserLogged() {
    try {
      const response = await userLogged();
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  function paintball() {
    const dataAtual = new Date();
    let mesAtual = dataAtual.getMonth();
    let anoAtual = dataAtual.getFullYear();

    if (dataAtual.getDate() > 5) {
      mesAtual += 1;
      if (mesAtual > 11) {
        mesAtual = 0;
        anoAtual += 1;
      }
    }

    let dia = 1;
    let diaUtilCount = 0;
    let dataAlvo;

    while (diaUtilCount < 4) {
      dataAlvo = new Date(anoAtual, mesAtual, dia);
      if (isDiaUtil(dataAlvo)) {
        diaUtilCount++;
      }
      dia++;
    }

    const diferencaEmMilissegundos = dataAlvo.getTime() - dataAtual.getTime();
    const diferencaEmDias = diferencaEmMilissegundos / (1000 * 3600 * 24);

    if (Math.ceil(diferencaEmDias) == 0) {
      setTexto2("É hoje o pix! Vamo Andreza!");
    } else {
      setTexto2(Math.ceil(diferencaEmDias) + " dias até o pix!");
    }
  }

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
    if (string == "ads clientes") {
      setGraph("ads clientes");
      setGraphUrl(
        "https://charts.mongodb.com/charts-mixconnect-swftspq/embed/charts?id=4e08fd58-bf58-4bfc-a4bc-69088f042685&maxDataAge=3600&theme=dark&autoRefresh=true"
      );
    }
    if (string == "ads") {
      setGraph("ads");
      setGraphUrl(
        "https://charts.mongodb.com/charts-mixconnect-swftspq/embed/charts?id=7f34005b-e41c-4558-862f-9e56cd54b661&maxDataAge=3600&theme=dark&autoRefresh=true"
      );
    }
    if (string == "motive") {
      setGraph("motive");
      setGraphUrl(
        "https://charts.mongodb.com/charts-mixconnect-swftspq/embed/charts?id=5301b39b-1d1f-4848-9824-712c4b3e09fc&maxDataAge=3600&theme=dark&autoRefresh=true"
      );
    }
  }

  async function handleMessage(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    data.writer = user.name;
    const response = await createMessageService(data);
    setMessage(response.data);
    setCreateMessage(false);
  }

  async function getMessage() {
    const response = await getMessageService();
    setMessage(response.data);
  }

  useEffect(() => {
    getLtv();
    getClients();
    getChurn();
    getNewClients();
    getInfos();
    paintball();
  }, []);

  useEffect(() => {
    const getHours = setInterval(() => {
      const date = new Date();
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const hour = hours < 10 ? `0${hours}` : hours;
      const minute = minutes < 10 ? `0${minutes}` : minutes;
      setClock(`${hour}:${minute}`);
      getMessage();
    }, 15000);

    return () => clearInterval(getHours);
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date();
      const hours = date.getHours();

      if (hours < 12) {
        setTexto1("Bom dia!");
      } else if (hours === 12) {
        setTexto1("AL mossar!");
      } else if (hours > 12 && hours < 18) {
        setTexto1("Boa tarde!");
      } else {
        setTexto1("Boa noite!");
      }
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setMostra((prevMostra) => !prevMostra);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const cronometroInterval = setInterval(() => {
      const now = new Date();
      const target = new Date();
      target.setHours(17, 0, 0, 0);

      const diff = target - now;

      if (diff > 0) {
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

        setCronometro(`${hours}h ${minutes}m`);
      } else {
        setCronometro("0h 0m");
        clearInterval(cronometroInterval);
      }
    }, 1000);

    return () => clearInterval(cronometroInterval);
  }, []);

  useEffect(() => {
    if (Cookies.get("token")) findUserLogged();
    else navigate("/");
    getMessage();
  }, []);

  return (
    <>
      {createMessage && (
        <MessageForm onSubmit={handleMessage}>
          <Input type="text" name="text" placeholder="Mensagem" />
          <button className="btn">Enviar</button>
        </MessageForm>
      )}
      <MainHeader>
        {(user.level == "Líder" || user.level == "Admin") && (
          <button
            className="btn"
            onClick={() => setCreateMessage(!createMessage)}
          >
            Alterar Aviso
          </button>
        )}
        <div className={mostra ? "metaTexto texto2" : "metaTexto"}>
          <p id="texto1">{message.text}</p>
          <p id="texto2">{texto2}</p>
          <div className="clock">{clock}</div>
        </div>
      </MainHeader>
      <HomeBody>
        <div id="cronometro">{cronometro}</div>
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
              <button
                className={graph == "ads clientes" ? "active" : ""}
                onClick={() => handleGraph("ads clientes")}
              >
                <span>
                  <span></span>
                </span>
                <p>Gestores</p>
              </button>
              <button
                className={graph == "motive" ? "active" : ""}
                onClick={() => handleGraph("motive")}
              >
                <span>
                  <span></span>
                </span>
                <p>Saídas</p>
              </button>
            </GraphBtns>
          </GuardaGraph>
        </BodyContent>
      </HomeBody>
    </>
  );
}
