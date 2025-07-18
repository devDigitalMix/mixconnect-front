/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import {
  PropostaCard,
  PropostasBody,
  PropostasContainer,
  PropostasHeader,
} from "./PropostasStyled";
import { getAllPropostas } from "../../services/propostaService";
import { Link, useNavigate } from "react-router-dom";

export function Propostas() {
  const [propostas, setPropostas] = useState([]);
  const [todas, setTodas] = useState([]);
  const [aprovadas, setAprovadas] = useState([]);
  const [expiradas, setExpiradas] = useState([]);
  const [copied, setCopied] = useState("");
  const [abertas, setAbertas] = useState([]);
  const [received, setReceived] = useState(false);
  const navigate = useNavigate();

  async function getPropostas() {
    setReceived(false);
    const response = await getAllPropostas();
    setPropostas(response.data.todas);
    setAprovadas(response.data.aprovadas);
    setExpiradas(response.data.vencidas);
    setAbertas(response.data.restantes);
    setReceived(true);
  }

  async function copyLink(id) {
    await navigator.clipboard.writeText(
      `https://mixconnect.tech/sendproposta/${id}`
    );
    setCopied(id);
    setTimeout(() => {
      setCopied("");
    }, 2000);
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
        <Link to="/home/criarProposta">
          <img
            src="/mais.svg"
            alt="mais"
            title="Criar novo"
            className="img-effect"
          />
        </Link>
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
                  <button onClick={() => copyLink(proposta._id)}>
                    {copied === proposta._id ? (
                      <img src="/check.svg" alt="link" title="link" />
                    ) : (
                      <img src="/link.svg" alt="link" title="link" />
                    )}
                  </button>
                  <Link to={`/home/criarProposta/${proposta._id}`}>
                    <img src="/consultar.svg" alt="consulta" title="consulta" />
                  </Link>
                  {proposta.approved && (
                    <Link to={`/home/createClient/${proposta._id}`}>
                      <img
                        src="/exportar.svg"
                        alt="exportar"
                        title="exportar"
                      />
                    </Link>
                  )}
                  {proposta.approved && proposta.clientId && (
                    <Link to={`/home/createBriefing/${proposta._id}`}>
                      <img
                        src="/prebriefing.svg"
                        alt="Pré Briefing"
                        title="Pré Briefing"
                      />
                    </Link>
                  )}
                </div>
              </PropostaCard>
            ))
          : null}
      </PropostasBody>
    </PropostasContainer>
  );
}
