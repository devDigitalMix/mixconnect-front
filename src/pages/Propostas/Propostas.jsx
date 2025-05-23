/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import {
  PropostaCard,
  PropostasBody,
  PropostasContainer,
  PropostasHeader,
} from "./PropostasStyled";
import { getAllPropostas } from "../../services/propostaService";

export function Propostas() {
  const [propostas, setPropostas] = useState([]);
  const [todas, setTodas] = useState([]);
  const [aprovadas, setAprovadas] = useState([]);
  const [expiradas, setExpiradas] = useState([]);
  const [abertas, setAbertas] = useState([]);
  const [received, setReceived] = useState(false);

  async function getPropostas() {
    setReceived(false);
    const response = await getAllPropostas();
    setPropostas(response.data.todas);
    setAprovadas(response.data.aprovadas);
    setExpiradas(response.data.vencidas);
    setAbertas(response.data.restantes);
    setReceived(true);
  }

  function dateFormatter(date) {
    if (typeof date == "string") {
      date = new Date(date);
    }
    return `${date.getDate()}/${
      date.getMonth() + 1 < 10
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1
    }/${date.getFullYear()}`;
  }

  useEffect(() => {
    getPropostas();
  }, []);

  return (
    <PropostasContainer>
      <PropostasHeader>
        <div>
          <p>PROPOSTAS ABERTAS</p>
          <button
            onClick={() => setPropostas(abertas)}
            className={`btnabertas ${propostas === abertas ? "active" : null}`}
          >
            {abertas.length}
          </button>
        </div>
        <div>
          <p>PROPOSTAS APROVADAS</p>
          <button
            onClick={() => setPropostas(aprovadas)}
            className={`btnaprovadas ${
              propostas === aprovadas ? "active" : null
            }`}
          >
            {aprovadas.length}
          </button>
        </div>
        <div>
          <p>PROPOSTAS EXPIRADAS</p>
          <button
            onClick={() => setPropostas(expiradas)}
            className={`btnexpiradas ${
              propostas === expiradas ? "active" : null
            }`}
          >
            {expiradas.length}
          </button>
        </div>
      </PropostasHeader>
      <PropostasBody>
        <h3>Propostas</h3>
        {received
          ? propostas.map((proposta, index) => (
              <PropostaCard key={index}>
                <h4>
                  <strong>N.</strong> {proposta.sequentialNumber}
                </h4>
                <h2>{proposta.name}</h2>
                <div className="time">
                  <span>Criado</span>
                  <p>{dateFormatter(proposta.createdAt)}</p>
                </div>
                <div className="propostaBtns">
                  <button></button>
                  <button></button>
                  <button></button>
                </div>
              </PropostaCard>
            ))
          : null}
      </PropostasBody>
    </PropostasContainer>
  );
}
