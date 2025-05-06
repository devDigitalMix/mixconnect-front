/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Input } from "../../components/Input/Input";
import { createPropostaService } from "../../services/propostaService";
import { PropostaContainer } from "./PropostaCreateStyled";
import { useNavigate } from "react-router-dom";
import { getPlansService } from "../../services/planService";

export function PropostaCreate() {
  const [loading, setLoading] = useState(false);
  const [plans, setPlans] = useState([]);
  const [site, setSite] = useState(0);
  const [mixtree, setMixtree] = useState(0);
  const [catalogo, setCatalogo] = useState(0);
  const [smart, setSmart] = useState(0);
  const [lp, setLp] = useState(0);
  const [tikTok, setTikTok] = useState(0);
  const [google, setGoogle] = useState(0);
  const [linkedin, setLinkedin] = useState(0);
  const [meta, setMeta] = useState(0);
  const [gmb, setGmb] = useState(0);
  const [posts, setPosts] = useState(0);
  const [tempoCap, setTempoCap] = useState(0);
  const [nVideos, setNVideos] = useState(0);
  const [nVisitas, setNVisitas] = useState(0);
  const [report, setReport] = useState("");
  const [gpPremium, setGpPremium] = useState(false);
  const [tempoContrato, setTempoContrato] = useState("");
  const [selectedPlan, setSelectedPlan] = useState(null);
  const navigate = useNavigate();

  async function handleCreateProposta(event) {
    setLoading(true);
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    data.plan = selectedPlan;
    console.log(data);
    const response = await createPropostaService(data);
    console.log(response.data);
    navigate("/sendproposta/" + response.data._id);
    setLoading(false);
  }

  async function getPlans() {
    const response = await getPlansService();
    setPlans(response.data.results);
  }

  useEffect(() => {
    getPlans();
  }, []);

  return (
    <PropostaContainer onSubmit={handleCreateProposta}>
      <h3>Geral</h3>
      <div className="formSection">
        <Input type="text" placeholder="Nome" name="name" />
        <select name="plan" onChange={(e) => setSelectedPlan(e.target.value)}>
          <option value="">Selecione um plano</option>
          {plans.map((plan, index) => (
            <option value={plan.name} key={index}>
              {plan.name}
            </option>
          ))}
        </select>
      </div>
      <h3>Sites</h3>
      <div className="formSection">
        <div className="guardaInput">
          <input
            type="number"
            className="inputQuant"
            placeholder="Site"
            name="site"
            value={site}
            onChange={(e) =>
              setSite(e.target.value == "" ? "" : Number(e.target.value))
            }
          />
          <img src="/mais.svg" onClick={() => setSite(site + 1)} />
        </div>
        <div className="guardaInput">
          <input
            type="number"
            className="inputQuant"
            placeholder="Mixtree"
            name="mixtree"
            value={mixtree}
            onChange={(e) =>
              setMixtree(e.target.value == "" ? "" : Number(e.target.value))
            }
          />
          <img src="/mais.svg" onClick={() => setMixtree(mixtree + 1)} />
        </div>
        <input
          type="number"
          className="inputQuant"
          placeholder="Catalogo"
          name="catalogo"
        />
        <input
          type="number"
          className="inputQuant"
          placeholder="Smart"
          name="smart"
        />
        <input
          type="number"
          className="inputQuant"
          placeholder="LP"
          name="lp"
        />
      </div>
      <h3>Tráfego</h3>
      <div className="formSection">
        <Input
          type="number"
          placeholder="TikTok"
          name="tikTok"
          value={tikTok}
        />
        <Input type="number" placeholder="Google" name="google" />
        <Input type="number" placeholder="Linkedin" name="linkedin" />
        <Input type="number" placeholder="Meta" name="meta" />
        <Input type="number" placeholder="GMB" name="gmb" />
      </div>
      <h3>Sociais</h3>
      <div className="formSection">
        <Input type="number" placeholder="Criativos" name="posts" />
        <Input type="number" placeholder="Tempo de Captação" name="tempoCap" />
        <Input type="number" placeholder="Número de Videos" name="nVideos" />
        <Input type="number" placeholder="Número de Visitas" name="nVisitas" />
      </div>
      <h3>Detalhes</h3>
      <div className="formSection">
        <Input type="text" placeholder="Reunião" name="report" />
        <div className="guardaGrupo">
          <h3>Grupo?</h3>
          <div>
            <Input
              type="radio"
              placeholder="Grupo Premium"
              name="gpPremium"
              value={false}
            />
            <label htmlFor="gpPremium">Não</label>
          </div>
          <div>
            <Input
              type="radio"
              placeholder="Grupo Premium"
              name="gpPremium"
              value={true}
            />
            <label htmlFor="gpPremium">Sim</label>
          </div>
        </div>
        <Input
          type="text"
          placeholder="Tempo de Contrato"
          name="tempoContrato"
        />
      </div>
      {!loading ? (
        <button type="submit" className="btn">
          Criar
        </button>
      ) : (
        <p className="btn">Enviando...</p>
      )}
    </PropostaContainer>
  );
}
