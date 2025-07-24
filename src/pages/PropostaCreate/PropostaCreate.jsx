/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { Input } from "../../components/Input/Input";
import {
  createPropostaService,
  findPropostaById,
  updatePropostaService,
} from "../../services/propostaService";
import { PropostaContainer } from "./PropostaCreateStyled";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { getPlansService } from "../../services/planService";
import { userLogged } from "../../services/employeeService";
import { UserContext } from "../../Context/UserContent";

export function PropostaCreate() {
  const [loading, setLoading] = useState(false);
  const { user, setUser } = useContext(UserContext);
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
  const [drone, setDrone] = useState(false);
  const [received, setReceived] = useState(false);
  const [tempoContrato, setTempoContrato] = useState("");
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [findingUser, setFindingUser] = useState(true);
  const [proposta, setProposta] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  async function handleCreateProposta(event) {
    setLoading(true);
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    data.plan = selectedPlan;

    if (checarFormatoTelefone(data.whatsapp)) {
      if (id) {
        // UPDATE
        try {
          await updatePropostaService(id, data);
          alert("Proposta atualizada com sucesso!");
          navigate("/sendproposta/" + id);
        } catch (error) {
          alert("Erro ao atualizar proposta.");
        }
        setLoading(false);
      } else {
        // CREATE (original)
        try {
          const response = await createPropostaService(data);
          navigate("/sendproposta/" + response.data._id);
        } catch (error) {
          alert("Erro ao criar proposta.");
        }
        setLoading(false);
      }
    } else {
      setLoading(false);
      alert(
        "Preencha o Whatsapp no formato correto: 47999999999 ou (47) 99999-9999"
      );
    }
  }

  async function findUserLogged() {
    try {
      const response = await userLogged();
      setUser(response.data);
      setFindingUser(false);
    } catch (error) {
      console.log(error);
    }
  }

  async function getPlans() {
    const response = await getPlansService();
    setPlans(response.data.results);
  }

  function changePlan(e) {
    setSelectedPlan(e);
    plans.map((plan) => {
      if (plan.name == e) {
        console.log(plan);
      }
    });
  }

  function checarFormatoTelefone(numero) {
    const formato1 = /^[1-9]{2}[0-9]{8,9}$/;
    const formato2 = /^\(\d{2}\)\s?\d{4,5}-\d{4}$/;
    return formato1.test(numero) || formato2.test(numero);
  }

  useEffect(() => {
    if (Cookies.get("token")) {
      userLogged()
        .then((response) => {
          setUser(response.data);
        })
        .catch(() => {
          Cookies.remove("token");
          navigate("/");
        });
    } else {
      navigate("/");
    }
    getPlans();
  }, []);

  // Preencher formulário se houver id
  useEffect(() => {
    if (id) {
      (async () => {
        setLoading(true);
        try {
          const response = await findPropostaById(id);
          const data = response.data;
          setProposta(data);
          setSite(data.site || 0);
          setMixtree(data.mixtree || 0);
          setCatalogo(data.catalogo || 0);
          setSmart(data.smart || 0);
          setLp(data.lp || 0);
          setTikTok(data.tikTok || 0);
          setGoogle(data.google || 0);
          setLinkedin(data.linkedin || 0);
          setMeta(data.meta || 0);
          setGmb(data.gmb || 0);
          setPosts(data.posts || 0);
          setTempoCap(data.tempoCap || 0);
          setNVideos(data.nVideos || 0);
          setNVisitas(data.nVisitas || 0);
          setReport(data.report || "");
          setGpPremium(data.gpPremium || false);
          setTempoContrato(data.tempoContrato || "");
          setSelectedPlan(data.plan || null);
          setReceived(true);
        } catch (error) {
          alert("Erro ao buscar proposta.");
        }
        setLoading(false);
      })();
    } else {
      setReceived(true);
    }
  }, [id]);

  return received ? (
    <PropostaContainer onSubmit={handleCreateProposta}>
      <h3>Geral</h3>
      <div className="formSection">
        <div>
          <label htmlFor="name" className="mainLabel">
            Empresa<span>*</span>
          </label>
          <Input
            type="text"
            placeholder="Nome da Empresa"
            name="name"
            required
            defaultValue={proposta?.name || ""}
          />
        </div>
        <div>
          <label htmlFor="whatsapp" className="mainLabel">
            Whatsapp<span>*</span>
          </label>
          <Input
            type="text"
            placeholder="Número do Whatsapp"
            name="whatsapp"
            required
            defaultValue={proposta?.whatsapp || ""}
          />
        </div>
        <div>
          <label htmlFor="whatsapp" className="mainLabel">
            Plano<span>*</span>
          </label>
          <select
            name="plan"
            onChange={(e) => changePlan(e.target.value)}
            value={selectedPlan || ""}
          >
            <option value="">Selecione um plano</option>
            {plans.map((plan, index) => (
              <option value={plan.name} key={index}>
                {plan.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="consultor" className="mainLabel">
            CONSULTOR(A)
          </label>
          <Input
            type="text"
            className="invalidInput"
            value={user.name}
            name="consultor"
            readOnly
          />
        </div>
      </div>
      <h3>Páginas</h3>
      <div className="formSection">
        <div className="InputContainer">
          <label htmlFor="site">Site Completo</label>
          <div className="guardaInput">
            <input
              type="number"
              className="inputQuant"
              placeholder="Site"
              name="site"
              value={site}
              max={99}
              min={0}
              onChange={(e) =>
                setSite(
                  e.target.value === ""
                    ? ""
                    : Math.min(Number(e.target.value), 10)
                )
              }
            />
            <img src="/mais.svg" onClick={() => setSite(site + 1)} />
            {site > 0 && (
              <div className="dobras">
                <input
                  type="text"
                  placeholder="Dobras"
                  name="dobrasSite"
                  className="inputQuant"
                  maxLength={20}
                  defaultValue={proposta?.dobrasSite || ""}
                  onInput={(e) => {
                    if (e.target.value.length > 20) {
                      e.target.value = e.target.value.slice(0, 20);
                    }
                  }}
                />
                <input
                  type="text"
                  placeholder="Seções"
                  name="secoesSite"
                  className="inputQuant"
                  defaultValue={proposta?.secoesSite || ""}
                />
              </div>
            )}
          </div>
        </div>
        <div className="InputContainer">
          <label htmlFor="mixtree">Mixtree</label>
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
        </div>
        <div className="InputContainer">
          <label htmlFor="catalogo">Catálogo</label>
          <div className="guardaInput">
            <input
              type="number"
              className="inputQuant"
              placeholder="Catalogo"
              name="catalogo"
              value={catalogo}
              onChange={(e) =>
                setCatalogo(e.target.value == "" ? "" : Number(e.target.value))
              }
            />
            <img src="/mais.svg" onClick={() => setCatalogo(catalogo + 1)} />
            {catalogo > 0 && (
              <div className="dobras">
                <input
                  type="text"
                  placeholder="Dobras"
                  name="dobraCatalogo"
                  defaultValue={proposta?.dobraCatalogo || ""}
                  className="inputQuant"
                />
              </div>
            )}
          </div>
        </div>
        <div className="InputContainer">
          <label htmlFor="smart">Page Smart</label>
          <div className="guardaInput">
            <input
              type="number"
              className="inputQuant"
              placeholder="Smart"
              name="smart"
              value={smart}
              onChange={(e) =>
                setSmart(e.target.value == "" ? "" : Number(e.target.value))
              }
            />
            <img src="/mais.svg" onClick={() => setSmart(smart + 1)} />
            {smart > 0 && (
              <div className="dobras">
                <input
                  type="text"
                  placeholder="Seções"
                  name="secoesSmart"
                  defaultValue={proposta?.secoesSmart || ""}
                  className="inputQuant"
                />
              </div>
            )}
          </div>
        </div>
        <div className="InputContainer">
          <label htmlFor="lp">LP</label>
          <div className="guardaInput">
            <input
              type="number"
              className="inputQuant"
              placeholder="LP"
              name="lp"
              value={lp}
              onChange={(e) =>
                setLp(e.target.value == "" ? "" : Number(e.target.value))
              }
            />
            <img src="/mais.svg" onClick={() => setLp(lp + 1)} />
            {lp > 0 && (
              <div className="dobras">
                <input
                  type="text"
                  placeholder="Seções"
                  name="secoesLp"
                  defaultValue={proposta?.secoesLp || ""}
                  className="inputQuant"
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <h3>Tráfego</h3>
      <div className="formSection">
        <div>
          <label htmlFor="google">Google ADS</label>
          <Input
            type="number"
            placeholder="Google"
            name="google"
            value={google}
            onChange={(e) =>
              setGoogle(e.target.value == "" ? "" : Number(e.target.value))
            }
          />
        </div>
        <div>
          <label htmlFor="tikTok">Tik Tok ADS</label>
          <Input
            type="number"
            placeholder="TikTok"
            name="tikTok"
            value={tikTok}
            onChange={(e) =>
              setTikTok(e.target.value == "" ? "" : Number(e.target.value))
            }
          />
        </div>
        <div>
          <label htmlFor="linkedin">LinkedIn ADS</label>
          <Input
            type="number"
            placeholder="Linkedin"
            name="linkedin"
            value={linkedin}
            onChange={(e) =>
              setLinkedin(e.target.value == "" ? "" : Number(e.target.value))
            }
          />
        </div>
        <div>
          <label htmlFor="meta">Meta ADS</label>
          <Input
            type="number"
            placeholder="Meta"
            name="meta"
            value={meta}
            onChange={(e) =>
              setMeta(e.target.value == "" ? "" : Number(e.target.value))
            }
          />
        </div>
      </div>
      <div className="formSection redesSection">
        <div className="InputContainer">
          <h3>Google Meu Negócio</h3>
          <label htmlFor="gmb">Perfil(s)</label>
          <div className="guardaInput">
            <input
              type="number"
              className="inputQuant"
              placeholder="Gmb"
              name="gmb"
              value={gmb}
              max={99}
              min={0}
              onChange={(e) =>
                setGmb(
                  e.target.value === ""
                    ? ""
                    : Math.min(Number(e.target.value), 10)
                )
              }
            />
            <img src="/mais.svg" onClick={() => setGmb(gmb + 1)} />
          </div>
        </div>
        <div className="InputContainer">
          <h3>Social Media</h3>
          <label htmlFor="posts">Criativos</label>
          <div className="guardaInput">
            <input
              type="number"
              className="inputQuant"
              placeholder="Posts"
              name="posts"
              value={posts}
              max={999}
              min={0}
              onChange={(e) =>
                setPosts(
                  e.target.value === ""
                    ? ""
                    : Math.min(Number(e.target.value), 999)
                )
              }
            />
            <img src="/mais.svg" onClick={() => setPosts(posts + 1)} />
          </div>
        </div>
      </div>
      <h3>Áudio & Video</h3>
      <div className="formSection">
        <div className="InputContainer">
          <label htmlFor="nVisitas">Visitas ao Mês</label>
          <div className="guardaInput">
            <Input
              type="number"
              placeholder="Visitas ao Mês"
              name="nVisitas"
              value={nVisitas}
              max={99}
              min={0}
              onChange={(e) =>
                setNVisitas(
                  e.target.value === ""
                    ? ""
                    : Math.min(Number(e.target.value), 10)
                )
              }
            />
            <img src="/mais.svg" onClick={() => setNVisitas(nVisitas + 1)} />
          </div>
        </div>
        {nVisitas > 0 && (
          <>
            <Input
              type="number"
              placeholder="Tempo Captação em Horas"
              name="tempoCap"
              defaultValue={proposta?.tempoCap || ""}
              style={{ maxWidth: 260 + "px" }}
            />
            <Input
              type="number"
              placeholder="Nº Edições"
              name="nVideos"
              defaultValue={proposta?.nVideos || ""}
              style={{ maxWidth: 130 + "px" }}
            />
            <div>
              <label htmlFor="drone">Drone</label>
              <select name="drone">
                {proposta?.drone && (
                  <option value={proposta.drone}>
                    {proposta.drone == false ? "Não" : "Sim"}
                  </option>
                )}
                <option value={false}>Não</option>
                <option value={true}>Sim</option>
              </select>
            </div>
          </>
        )}
      </div>
      <h3>Outras informações</h3>
      <div className="formSection">
        <div>
          <label htmlFor="report">Reunião</label>
          <select name="report">
            {proposta?.report && (
              <option value={proposta.report}>{proposta.report}</option>
            )}
            <option value="Semanais">Semanais</option>
            <option value="Mensais">Mensais</option>
            <option value="Trimestrais">Trimestrais</option>
          </select>
        </div>
        <div>
          <label htmlFor="gpPremium">Grupo Premium</label>
          <select name="gpPremium">
            {proposta?.gpPremium && (
              <option value={proposta.gpPremium}>
                {proposta.gpPremium == false ? "Não" : "Sim"}
              </option>
            )}
            <option value={false}>Não</option>
            <option value={true}>Sim</option>
          </select>
        </div>
        <div>
          <label htmlFor="tempoContrato">Tempo de Contrato</label>
          <select name="tempoContrato">
            {proposta?.tempoContrato && (
              <option value={proposta.tempoContrato}>
                {proposta.tempoContrato}
              </option>
            )}
            <option value="Avulso">Avulso</option>
            <option value="3 Meses">3 Meses</option>
            <option value="6 Meses">6 Meses</option>
            <option value="12 Meses">12 Meses</option>
            <option value="24 Meses">24 Meses</option>
          </select>
        </div>
        <div>
          <label htmlFor="value" className="mainLabel">
            Valor Mensal<span>*</span>
          </label>
          <Input
            type="number"
            placeholder="Valor da Proposta"
            name="value"
            maxLength={6}
            defaultValue={proposta?.value || ""}
            onInput={(e) => {
              if (e.target.value.length > 6) {
                e.target.value = e.target.value.slice(0, 6);
              }
            }}
          />
        </div>
        <div>
          <label htmlFor="value" className="mainLabel">
            Valor Start<span>*</span>
          </label>
          <Input
            type="number"
            placeholder="Valor da Proposta"
            name="startValue"
            maxLength={6}
            defaultValue={proposta?.startValue || ""}
            onInput={(e) => {
              if (e.target.value.length > 6) {
                e.target.value = e.target.value.slice(0, 6);
              }
            }}
          />
        </div>
      </div>
      {!loading ? (
        <button type="submit" className="btn">
          {id ? "Atualizar" : "Criar"}
        </button>
      ) : (
        <p className="btn">Enviando...</p>
      )}
    </PropostaContainer>
  ) : null;
}
