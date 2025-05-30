/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { Input } from "../../components/Input/Input";
import {
  createPropostaService,
  findPropostaById,
  updatePropostaService,
} from "../../services/propostaService";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { getPlansService } from "../../services/planService";
import { userLogged } from "../../services/employeeService";
import { UserContext } from "../../Context/UserContent";
import { PropostaContainer } from "../PropostaCreate/PropostaCreateStyled";
import { createClientService } from "../../services/clientService";

export function CreateClient() {
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
  const [value, setValue] = useState(0);
  const [report, setReport] = useState("");
  const [gpPremium, setGpPremium] = useState(false);
  const [received, setReceived] = useState(false);
  const [tempoContrato, setTempoContrato] = useState("");
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [findingUser, setFindingUser] = useState(true);
  const [proposta, setProposta] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  async function handleCreateClient(event) {
    setLoading(true);
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    // Procurar o plano pelo nome e pegar o id
    const planoSelecionado = plans.find((plan) => plan.name === selectedPlan);
    data.plan = planoSelecionado ? planoSelecionado.id : null;
    data.post = posts;
    data.tempoContrato = tempoContrato;
    data.nVisitas = nVisitas;
    data.nVideos = nVideos;
    data.tempoCap = tempoCap;
    data.tempoContrato = tempoContrato;
    data.tikTok = tikTok;
    data.google = google;
    data.linkedin = linkedin;
    data.meta = meta;
    data.value = value;
    data.proposta = `https://mixconnect.tech/sendproposta/${id}`;
    data.report = report;
    if (data.vencimento) {
      const vencimentoDate = new Date(data.vencimento);
      vencimentoDate.setHours(vencimentoDate.getHours() + 3); // Zera horas, minutos, segundos e milissegundos
      data.vencimento = vencimentoDate.getDate();
    }
    if (data.dateStart) {
      const startDate = new Date(data.dateStart);
      startDate.setHours(startDate.getHours() + 3); // Zera horas, minutos, segundos e milissegundos
      data.dateStart = startDate;
    }
    const response = await createClientService(data);
    console.log(response.data);
    setLoading(false);
  }

  async function getPlans() {
    const response = await getPlansService();
    setPlans(response.data.results);
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
          setValue(data.value || 0);
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
    <PropostaContainer onSubmit={handleCreateClient}>
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
            value={proposta.name}
            className="invalidInput"
            readOnly
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
            value={proposta.whatsapp}
            className="invalidInput"
            readOnly
          />
        </div>
        <div>
          <label htmlFor="whatsapp" className="mainLabel">
            Plano<span>*</span>
          </label>
          <Input
            type="text"
            placeholder="Plano"
            name="plan"
            value={proposta.plan}
            className="invalidInput"
            readOnly
          />
        </div>
        <div>
          <label htmlFor="consultor" className="mainLabel">
            CONSULTOR(A)
          </label>
          <Input
            type="text"
            value={user.name}
            name="consultor"
            className="invalidInput"
            readOnly
          />
        </div>
        <div>
          <label htmlFor="email" className="mainLabel">
            E-MAIL
          </label>
          <Input
            type="text"
            name="email"
            placeholder="emailcliente@gmail.com"
          />
        </div>
      </div>

      <h3>Mais informações</h3>

      <div className="formSection">
        <div>
          <label htmlFor="cnpj" className="mainLabel">
            CPF/CNPJ
          </label>
          <Input type="text" name="cnpj" placeholder="XX.XXX.XXX.XXXX/XX" />
        </div>
        <div>
          <label htmlFor="dateStart" className="mainLabel">
            PAGAMENTO START
          </label>
          <Input type="date" name="dateStart" />
        </div>
        <div>
          <label htmlFor="vencimento" className="mainLabel">
            Dia de Vencimento
          </label>
          <Input
            type="date"
            name="vencimento"
            placeholder="XX.XXX.XXX.XXXX/XX"
          />
        </div>
      </div>

      {!loading ? (
        <button type="submit" className="btn">
          Criar cliente
        </button>
      ) : (
        <p className="btn">Enviando...</p>
      )}
    </PropostaContainer>
  ) : null;
}
