/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Input } from "../../components/Input/Input";
import {
  answerProposta,
  createPropostaService,
  findPropostaById,
} from "../../services/propostaService";
import { SendPropostaContainer } from "./SendPropostaStyled";
import { useParams } from "react-router-dom";
import { createClientService } from "../../services/clientService";

export function SendProposta() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [proposta, setProposta] = useState({});

  async function getPropostaById() {
    const response = await findPropostaById(id);
    setProposta(response.data);
    console.log(response.data);
  }

  async function handleCreateProposta(event) {
    setLoading(true);
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
    const response = await createPropostaService(data);
    console.log(response.data);
    setLoading(false);
  }

  async function answer(op) {
    const answer = { answer: op };
    const propostaAtt = await answerProposta(id, answer);
    // if (op) {
    //   const data = {};
    //   data.name = proposta.name;
    // data.status = "Start";
    // data.plan = proposta.plan;
    // data.posts = proposta.posts;
    // data.value = 1000;
    // data.startValue = 1000;
    // vencimento,
    // formaPagamento,
    // proposta,
    // plataformasTrafego,
    // tempoContrato,
    // nVideos,
    // nVisitas,
    // tempoCap,

    //   // const response = await createClientService(proposta);
    //   console.log(response.data);
    // }
  }

  useEffect(() => {
    getPropostaById();
  }, []);

  return (
    <SendPropostaContainer onSubmit={handleCreateProposta}>
      <h3>Geral</h3>
      <div>
        <h4>{proposta.name}</h4>
        <h4>{proposta.plan}</h4>
      </div>
      <h3>Sites</h3>
      <div>
        <h4>Sites: {proposta.site}</h4>
        <h4>Mixtrees: {proposta.mixtree}</h4>
        <h4>Catálogo: {proposta.catalogo}</h4>
        <h4>Smart: {proposta.smart}</h4>
        <h4>LP: {proposta.lp}</h4>
      </div>
      <h3>Tráfego</h3>
      <div>
        <h4>TikTok: R${proposta.tikTok}</h4>
        <h4>Google: R${proposta.google}</h4>
        <h4>Linkedin: R${proposta.linkedin}</h4>
        <h4>Meta: R${proposta.meta}</h4>
      </div>
      <h3>Sociais</h3>
      <div>
        <h4>GMB: {proposta.gmb}</h4>
        <h4>Criativos: {proposta.posts}</h4>
        <h4>Tempo de Captação: {proposta.tempoCap}h</h4>
        <h4>Número de Videos: {proposta.nVideos}</h4>
        <h4>Número de Visitas: {proposta.nVisitas}</h4>
      </div>
      <h3>Detalhes</h3>
      <div>
        <h4>Reunião: {proposta.report}</h4>
        <h4>Grupo: {proposta.gpPremium ? "Sim" : "Não"}</h4>
        <h4>Tempo de Contrato: {proposta.tempoContrato}</h4>
      </div>

      <div className="button-container">
        <button className="btn-approve" onClick={() => answer(true)}>
          Aprovar
        </button>
        <button className="btn-reject" onClick={() => answer(false)}>
          Rejeitar
        </button>
      </div>
    </SendPropostaContainer>
  );
}
