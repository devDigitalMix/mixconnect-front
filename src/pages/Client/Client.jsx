/* eslint-disable no-useless-escape */
/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  changeStatusService,
  deleteClient,
  deletePlataformasClient,
  deleteSitesCLient,
  getClientById,
  UpdateClientAvatar,
  updateClientContatos,
  updateClientService,
  updatePlataformasClient,
  updateSitesCLient,
} from "../../services/clientService";
// import { ClientStyled, ClientStyledContent } from "./ClientStyled";
import {
  ClientButtons,
  ProfileAvatar,
  ProfileBody,
  ProfileBottom,
  ProfileContainer,
  ProfileData,
  ProfileStyled,
  ProfileUpdate,
  TopProfile,
  UploadAvatar,
} from "../Profile/ProfileStyled";
import Cookies from "js-cookie";
import { Input } from "../../components/Input/Input";
import { TopButtons } from "../Employee/EmployeeStyled";
import {
  ClientBody,
  ClientContainer,
  ClientSection,
  ClientSectionForm,
  ClientStyled,
  ContatosModal,
  CreateNpsContainer,
  DeleteClientStyled,
  DeleteSiteModal,
  DominioModal,
  Drive,
} from "./ClientStyled";
import { userLogged } from "../../services/employeeService";
import { UserContext } from "../../Context/UserContent";
import Skeleton from "react-loading-skeleton";
import { getPlansService } from "../../services/planService";
import { Label } from "../../components/Label/Label";
import { createNpsService } from "../../services/npsService";

export default function Client() {
  const { id } = useParams();
  const { user, setUser, loading } = useContext(UserContext);
  const [client, setClient] = useState({});
  const [update, setUpdate] = useState(false);
  const [updateAvatar, setUpdateAvatar] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isStatusLoading, setIsStatusLoading] = useState(false);
  const [isNpsLoading, setIsNpsLoading] = useState(false);
  const [socialMedia, setSocialMedia] = useState(client.socialMedia || []);
  const [canaisContato, setCanaisContato] = useState([]);
  const [page, setPage] = useState(client.pages || []);
  const [gmb, setGmb] = useState(client.gmb || []);
  const [plans, setPlans] = useState([]);
  const [deleteClick, setDeleteClick] = useState(false);
  const [received, setReceived] = useState(false);
  const [createNps, setCreateNps] = useState(false);
  const [copiado, setCopiado] = useState(false);
  const [deleteSiteModal, setDeleteSiteModal] = useState(false);
  const [newSiteModal, setNewSiteModal] = useState(false);
  const [showContatosModal, setShowContatosModal] = useState(false);
  const [cat, setCat] = useState("Comercial");
  const [selectedFile, setSelectedFile] = useState();
  const [file, setFile] = useState();
  const [chosenDomain, setChosenDomain] = useState({});
  const [chosenPlatform, setChosenPlatform] = useState({});
  const [preview, setPreview] = useState("/avatar-default.png");
  const navigate = useNavigate();

  async function getPlans() {}

  async function changeStatus() {
    if (isStatusLoading) return;

    setIsStatusLoading(true);

    try {
      if (client.status === "Start") {
        await changeStatusService(id, "Ativo");
        getClient();
      } else if (client.status === "Ativo") {
        await changeStatusService(id, "Start");
        getClient();
      } else {
        alert("Status Não Disponível");
      }
    } finally {
      setTimeout(() => setIsStatusLoading(false), 1000);
    }
  }

  async function createNpsFunction(name) {
    setIsNpsLoading(true);
    let response;
    var data = {
      name: name,
      clientId: id,
      clientName: client.name,
    };
    try {
      response = await createNpsService(data);
      await navigator.clipboard.writeText(
        `https://mixconnect.tech/sendnps/${response.data._id}`
      );
      setTimeout(() => setCreateNps(false), 3000);
    } catch (error) {
      console.log(error);
    } finally {
      // console.log(response);
    }
    setTimeout(() => setIsNpsLoading(false), 3000);
  }

  const motivos = [
    "",
    "Baixo Poder de Investimento",
    "Desacordo Comercial",
    "Inadimplência",
    "Internalizando Marketing",
    "Resultados",
    "Fim de Contrato",
    "Desalinhamento de Expectativa",
    "Empresa Desativada",
  ];
  const categorias = [
    "Pós Briefing",
    "Fim de Projeto",
    "45 Dias Tráfego",
    "100 Dias Tráfego",
    "45 Dias Social",
    "100 Dias Social",
    "Sugestões",
    "Satisfação",
    "Período 30/45",
  ];

  const textsToRemove = [
    "https://www.instagram.com/",
    "https://www.facebook.com/",
    "/",
  ];

  function removeTexts(url, texts) {
    let result = url;
    texts.forEach((text) => {
      result = result.replace(text, "");
    });
    return result;
  }

  async function handleUpdateAvatar(event) {
    setIsLoading(true);
    event.preventDefault();
    const allowedFormats = [
      "image/png",
      "image/jpeg",
      "image/jpg",
      "image/webp",
      "image/svg+xml",
    ];
    if (!allowedFormats.includes(file.type)) {
      alert("Formato de arquivo não permitido.");
      return;
    }

    const logo = { logo: file };

    try {
      await UpdateClientAvatar(logo, client._id);
      setUpdateAvatar(!updateAvatar);
      getClient();
    } catch (error) {
      console.log(error);
    }
  }

  function updateAvatarClick(e) {
    if (updateAvatar && e.target == document.getElementById("cancelaAvatar")) {
      if (client.logo) {
        setPreview(client.logo);
      } else {
        setPreview("/avatar-default.png");
      }
    }
    setUpdateAvatar(!updateAvatar);
  }

  const handleAddGmb = () => {
    setGmb([...gmb, ""]);
  };

  const handleGmbChange = (index, event) => {
    const newGmb = [...gmb];
    newGmb[index] = event.target.value;
    setGmb(newGmb);
  };

  const handleAddPage = () => {
    setPage([...page, ""]);
  };

  const handlePageChange = (index, event) => {
    const newPage = [...page];
    newPage[index] = event.target.value;
    setPage(newPage);
  };

  const handleAddSocialMedia = () => {
    setSocialMedia([...socialMedia, ""]);
  };

  const handleSocialMediaChange = (index, event) => {
    const newSocialMedia = [...socialMedia];
    newSocialMedia[index] = event.target.value;
    setSocialMedia(newSocialMedia);
  };

  const handleAddCanaisContato = () => {
    setCanaisContato([...canaisContato, ""]);
  };

  const handleCanaisContatoChange = (index, event) => {
    const newCanaisContato = [...canaisContato];
    newCanaisContato[index] = event.target.value;
    setCanaisContato(newCanaisContato);
  };

  function updateForm() {
    setUpdate(!update);
    setSocialMedia(client.socialMedia || []);
    setCanaisContato(client.canaisContato || []);
  }

  function handleDeleteClick() {
    setDeleteClick(!deleteClick);
  }

  async function handleDelete(event) {
    setIsLoading(true);
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    try {
      if (data.text == `excluir-${client.name}`) {
        if (data.motive.trim() == "") {
          alert("Insira o Motivo");
          setIsLoading(false);
        } else {
          await deleteClient(client._id, data.motive);
          navigate("/home/clients");
        }
      } else {
        console.log(
          data.text == `excluir-${client.name}`,
          data.text,
          `excluir-${client.name}`
        );
        alert("Insira o nome correto");
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function handleUpdate(event) {
    setIsLoading(true);
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    data.socialMedia = socialMedia.filter((item) => item.trim() !== "");
    data.canaisContato = canaisContato.filter((item) => item.trim() !== "");
    data.pages = page.filter((item) => item.trim() !== "");
    data.gmb = gmb.filter((item) => item.trim() !== "");
    if (!data.dateStart) {
      data.dateStart = client.dateStart;
    }
    if (event.target.files) {
      const file = event.target.files[0];
      const fileReader = new FileReader();
      fileReader.onloadend = function () {
        setSelectedFile(fileReader.result);
      };
      fileReader.readAsDataURL(file);
      console.log(file);
    }
    // data.contrato = { contrato: file };
    try {
      console.log(data);
      const response = await updateClientService(data, client._id);
      console.log(response.data);
      setUpdate(!update);
      getClient();
    } catch (error) {
      console.log(error);
    }
  }

  function formatDate(data) {
    var date = new Date(data);
    date.setHours(date.getHours() + 3);
    const dia = String(date.getDate()).padStart(2, "0");
    const mes = String(date.getMonth() + 1).padStart(2, "0");
    const ano = date.getFullYear();
    const dataAtt = `${dia}/${mes}/${ano}`;
    return dataAtt;
  }

  function formatWhats(numero) {
    let numeroLimpo = numero.toString().replace(/[()\-\s]/g, "");

    return numeroLimpo;
  }

  async function getClient() {
    setReceived(false);
    try {
      const response = await getClientById(id);
      setClient(response.data);
      setPreview(
        response.data.logo ? response.data.logo : "/avatar-default.png"
      );
      setSocialMedia(response.data.socialMedia || []);
      setCanaisContato(response.data.canaisContato || []);
      setPage(response.data.pages || []);
      setGmb(response.data.gmb || []);
      const responsePlans = await getPlansService();
      const lista = [];
      let planName = "";
      responsePlans.data.results.forEach((plano) => {
        if (response.data.plan == plano.id) {
          planName = plano.name;
        } else {
          lista.push(plano.name);
        }
      });
      setReceived(true);
      lista.reverse();
      lista.push(planName);
      lista.reverse();
      setPlans(lista);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }

  async function findUserLogged() {
    try {
      const response = await userLogged();
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  function baixarImg() {
    if (!client.logo) {
      alert("Nenhuma imagem disponível para download.");
      return;
    }

    const link = document.createElement("a");
    link.href = client.logo;
    link.download = "logo-cliente.png";
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function getVigenciaFinal(dateStart, tempoContrato) {
    if (!dateStart || !tempoContrato) return "";
    const match = tempoContrato.match(/(\d+)/);
    if (!match) return "";
    const meses = parseInt(match[1], 10);
    const data = new Date(dateStart);
    data.setMonth(data.getMonth() + meses);
    const dia = String(data.getDate()).padStart(2, "0");
    const mes = String(data.getMonth() + 1).padStart(2, "0");
    const ano = data.getFullYear();
    return `${dia}/${mes}/${ano}`;
  }

  async function handleUpdateContatos(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
    const response = await updateClientContatos(id, data);
    setShowContatosModal(false);
    getClient();
  }

  function newPlataforma() {
    setNewSiteModal(true);
    setChosenPlatform({});
  }

  function updatePlataforma(plataforma) {
    setChosenPlatform(plataforma);
    setNewSiteModal(true);
  }

  async function handleNewPlatform(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    if (chosenPlatform._id) {
      data._id = chosenPlatform._id;
    }
    console.log(data);
    await updatePlataformasClient(id, data);
    setNewSiteModal(false);
    setChosenPlatform({});
    getClient();
  }

  async function handleDeletePlataforma() {
    if (!chosenPlatform._id) {
      alert("Selecione uma plataforma para excluir.");
      setNewSiteModal(false);
      setDeleteSiteModal(false);
    }
    await deletePlataformasClient(id, chosenPlatform._id);
    setNewSiteModal(false);
    setDeleteSiteModal(false);
  }

  function newSite() {
    setNewSiteModal(true);
    setChosenDomain({});
  }

  function updateSite(dominio) {
    setChosenDomain(dominio);
    setNewSiteModal(true);
  }

  async function handleDeleteSite() {
    if (!chosenDomain._id) {
      alert("Selecione um site para excluir.");
      setNewSiteModal(false);
      setDeleteSiteModal(false);
    }
    await deleteSitesCLient(id, chosenDomain._id);
    setNewSiteModal(false);
    setDeleteSiteModal(false);
  }

  async function handleNewSite(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    if (chosenDomain._id) {
      data._id = chosenDomain._id;
    }
    if (data.dataVencimento == null || data.dataVencimento == "") {
      data.dataVencimento = chosenDomain.dataVencimento || "";
    }
    await updateSitesCLient(id, data);
    setNewSiteModal(false);
    setChosenDomain({});
    getClient();
  }

  useEffect(() => {
    function onEnter(a) {
      a.classList.add("active");
    }
    function onLeave(a) {
      a.classList.remove("active");
    }
    const aLabel = document.querySelector(".image-label");
    aLabel.addEventListener("dragenter", () => onEnter(aLabel));
    aLabel.addEventListener("drop", () => onLeave(aLabel));
    aLabel.addEventListener("dragend", () => onLeave(aLabel));
    aLabel.addEventListener("dragleave", () => onLeave(aLabel));
    const input = document.getElementById("imageName");
    const dropfile = document.getElementById("drop-file");
    input.addEventListener("change", (event) => {
      if (input.files.length > 0) {
        const type = input.files[0].type;
        const formats = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
        if (!formats.includes(type)) {
          alert("Esse formato não é permitido!");
          return;
        }

        const file = event.target.files[0];
        setFile(file);
        const fileReader = new FileReader();
        fileReader.onloadend = function () {
          setPreview(fileReader.result);
        };
        fileReader.readAsDataURL(file);
        setUpdateAvatar(true);
      }
    });
  }, []);

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
    getClient();
  }, [id]);
  return (
    <>
      <ClientContainer $isactive={true}>
        <img src="/grande-bottom.png" id="grande-bottom" />
        <img src="/grande-top.png" id="grande-top" />
        <ClientStyled>
          <div className="catButtons">
            <button
              className={cat == "Comercial" ? "active" : undefined}
              onClick={() => setCat("Comercial")}
            >
              Comercial
            </button>
            <button
              className={cat == "Financeiro" ? "active" : undefined}
              onClick={() => setCat("Financeiro")}
            >
              Financeiro
            </button>
            <button
              className={cat == "Social" ? "active" : undefined}
              onClick={() => setCat("Social")}
            >
              Social
            </button>
            <button
              className={cat == "Dev" ? "active" : undefined}
              onClick={() => setCat("Dev")}
            >
              Dev
            </button>
            <button
              className={cat == "Tráfego" ? "active" : undefined}
              onClick={() => setCat("Tráfego")}
            >
              Tráfego
            </button>
            <button
              className={cat == "A&V" ? "active" : undefined}
              onClick={() => setCat("A&V")}
            >
              A&V
            </button>
          </div>
          {createNps && (
            <CreateNpsContainer>
              {isNpsLoading ? (
                <p>Copiado!</p>
              ) : (
                <>
                  <img
                    src="/cancel.svg"
                    alt="cancelar"
                    id="fechaNps"
                    className="img-effect"
                    onClick={() => setCreateNps(!createNps)}
                  />
                  {categorias.map((c, index) => (
                    <h3 key={index} onClick={() => createNpsFunction(c)}>
                      {c}
                    </h3>
                  ))}
                </>
              )}
            </CreateNpsContainer>
          )}
          {deleteClick && (
            <DeleteClientStyled onSubmit={handleDelete}>
              <img
                src="/cancel.svg"
                alt="cancelar"
                onClick={handleDeleteClick}
              />
              <h2>
                Tem certeza que deseja excluir <strong>{client.name}</strong>?
              </h2>
              <div>
                <h3>
                  Se sim, digite <i>excluir-{client.name}</i>
                </h3>
                <Input type="text" name="text" placeholder="Nome" />
              </div>
              <div>
                <Label htmlFor="motive" text="Motivo:" />
                <select name="motive">
                  {motivos.map((motive, index) => (
                    <option key={index} value={motive}>
                      {motive}
                    </option>
                  ))}
                </select>
              </div>
              {!isLoading ? (
                <div className="deleteBtns">
                  <button type="submit" className="btn neutral">
                    Cancelar
                  </button>
                  <button type="submit" className="btn danger">
                    Excluir
                  </button>
                </div>
              ) : (
                <div className="custom-loader"></div>
              )}
            </DeleteClientStyled>
          )}

          {(user.level == "Líder" ||
            user.level == "Admin" ||
            user.role == "Desenvolvedor" ||
            user.role == "Comercial") && (
            <TopButtons>
              <Link to={"approval"}>Aprovações</Link>
              <img
                src="/exclude.svg"
                alt="excluir"
                className="img-effect"
                onClick={handleDeleteClick}
              />
              {!update ? (
                <img
                  src="/update-profile.svg"
                  alt="update"
                  draggable="false"
                  className="img-effect"
                  onClick={updateForm}
                />
              ) : (
                <img
                  src="/cancel.svg"
                  alt="cancel"
                  draggable="false"
                  className="img-effect"
                  onClick={updateForm}
                />
              )}
              {!update && (
                <Link to={"/home/clients"}>
                  <img
                    src="/cancel.svg"
                    alt="voltar"
                    className="voltar img-effect"
                  />
                </Link>
              )}
            </TopButtons>
          )}
          <TopProfile>
            <ProfileAvatar>
              <label
                htmlFor="bannerName"
                style={{
                  background: `url(${preview}) center center / cover no-repeat `,
                }}
                className="image-label"
              >
                <div id="drop-file"></div>
                <input type="file" name="bannerName" id="imageName" />
              </label>
              {(user.level == "Líder" ||
                user.level == "Admin" ||
                user.role == "Desenvolvedor") && (
                <UploadAvatar
                  onSubmit={handleUpdateAvatar}
                  encType="multipart/form-data"
                >
                  {updateAvatar && (
                    <>
                      <button type="submit"></button>
                      <button
                        id="cancelaAvatar"
                        onClick={updateAvatarClick}
                      ></button>
                    </>
                  )}
                  <input type="file" name="logo" id="logo" />
                </UploadAvatar>
              )}
              <button onClick={baixarImg}>
                <img src="/open.svg" />
              </button>
            </ProfileAvatar>
            <ProfileData>
              <div>
                <h2>{client.name || <Skeleton width="200px" />}</h2>
                {client.whatsapp ? (
                  <a
                  // target="_blank"
                  // href={
                  //   "https://api.whatsapp.com/send?phone=55" +
                  //   formatWhats(client.whatsapp)
                  // }
                  >
                    <img src="/tel.svg" alt="whatsapp" />
                    {client.whatsapp}
                  </a>
                ) : (
                  <Skeleton width="150px" />
                )}
              </div>
              <div>
                <h4>{plans[0] || <Skeleton width="200px" />}</h4>
                <h3
                  onClick={changeStatus}
                  style={{ opacity: isStatusLoading ? 0.5 : 1 }}
                >
                  {client.status || <Skeleton width="80px" />}{" "}
                  <img src="/change.svg" />
                </h3>
              </div>
            </ProfileData>
            {client.drive && (
              <Drive target="_blank" href={client.drive}>
                Link para o drive
              </Drive>
            )}
          </TopProfile>
          {received && user.level != "Base" && (
            <ClientButtons>
              <button
                className="btn-nps"
                onClick={() => setCreateNps(!createNps)}
              >
                Criar NPS
              </button>
              <button
                className="btn-nps"
                onClick={() => navigate(`/home/client/${id}/nps`)}
              >
                ver nps
              </button>
              {received && client.status == "Start" && (
                <Link
                  to={`/home/client/${id}/journey/${
                    client.chores ? client.chores[0] : null
                  }`}
                >
                  <button className="btn">JORNADA</button>
                </Link>
              )}
            </ClientButtons>
          )}
          <ClientBody>
            {cat == "Comercial" &&
              (!update ? (
                <ClientSection>
                  {!received ? (
                    <div className="campo">
                      <h2>Observação</h2>
                      <button>
                        <Skeleton width="200px" />
                      </button>
                    </div>
                  ) : client.observacaoComercial ? (
                    <div className="campo">
                      <h2>Observação</h2>
                      <button>{client.observacaoComercial}</button>
                    </div>
                  ) : null}
                  {!received ? (
                    <div className="campo">
                      <h2>Contrato</h2>
                      <button>
                        <Skeleton width="200px" />
                      </button>
                    </div>
                  ) : client.contrato ? (
                    <div className="campo">
                      <h2>Contrato</h2>
                      <button>Ver Contrato</button>
                    </div>
                  ) : null}
                  {!received ? (
                    <div className="campo">
                      <h2>Proposta</h2>
                      <button>
                        <Skeleton width="200px" />
                      </button>
                    </div>
                  ) : client.proposta ? (
                    <div className="campo">
                      <h2>Proposta</h2>
                      <Link to={client.proposta} target="_blank">
                        <button>Ver Proposta</button>
                      </Link>
                    </div>
                  ) : null}
                  {!received ? (
                    <div className="campo">
                      <h2>Tempo de Contrato</h2>
                      <button>
                        <Skeleton width="200px" />
                      </button>
                    </div>
                  ) : client.tempoContrato ? (
                    <div className="campo">
                      <h2>Tempo de Contrato</h2>
                      <button>{client.tempoContrato}</button>
                    </div>
                  ) : null}
                  {!received ? (
                    <div className="campo">
                      <h2>Valor da Mensalidade</h2>
                      <button>
                        <Skeleton width="200px" />
                      </button>
                    </div>
                  ) : client.value ? (
                    <div className="campo">
                      <h2>Valor da Mensalidade</h2>
                      <button>{client.value}</button>
                    </div>
                  ) : null}
                  {!received ? (
                    <div className="campo">
                      <h2>CPF/CNPJ</h2>
                      <button>
                        <Skeleton width="200px" />
                      </button>
                    </div>
                  ) : client.cnpj ? (
                    <div className="campo">
                      <h2>CPF/CNPJ</h2>
                      <button>{client.cnpj}</button>
                    </div>
                  ) : null}
                  {!received ? (
                    <div className="campo">
                      <h2>Consultor</h2>
                      <button>
                        <Skeleton width="200px" />
                      </button>
                    </div>
                  ) : client.consultor ? (
                    <div className="campo">
                      <h2>Consultor</h2>
                      <button>{client.consultor}</button>
                    </div>
                  ) : null}
                  {!received ? (
                    <div className="campo">
                      <h2>Dia do Start</h2>
                      <button>
                        <Skeleton width="200px" />
                      </button>
                    </div>
                  ) : client.dateStart ? (
                    <div className="campo">
                      <h2>Dia do Start</h2>
                      <button>{formatDate(client.dateStart)}</button>
                    </div>
                  ) : null}
                  <div className="campo">
                    <h2>Dia da vigência do contrato</h2>
                    <button>
                      {client.dateStart && client.tempoContrato
                        ? getVigenciaFinal(
                            client.dateStart,
                            client.tempoContrato
                          )
                        : ""}
                    </button>
                  </div>
                  <div className="campo">
                    <button onClick={() => setShowContatosModal(true)}>
                      Contatos
                    </button>
                  </div>
                  {showContatosModal && (
                    <ContatosModal onSubmit={handleUpdateContatos}>
                      <span onClick={() => setShowContatosModal(false)}>
                        <img src="/cancel.svg" alt="Fechar" />
                      </span>
                      {canaisContato &&
                        canaisContato.map((contato, index) => (
                          <div key={index} className="guardaContato">
                            <div>
                              <label htmlFor="">Nome</label>
                              <Input
                                name={"nome-" + index}
                                defaultValue={contato.nome}
                              />
                            </div>
                            <div>
                              <label htmlFor="">Contato</label>
                              <Input
                                name={"contato-" + index}
                                defaultValue={contato.contato}
                              />
                            </div>
                          </div>
                        ))}
                      <img
                        src="/mais.svg"
                        onClick={() => {
                          setCanaisContato([
                            ...(canaisContato || []),
                            { nome: "nome", contato: "contato" },
                          ]);
                          console.log(canaisContato);
                        }}
                        alt="adicionar contato"
                      />
                      <button type="submit" className="btn">
                        Enviar
                      </button>
                    </ContatosModal>
                  )}
                </ClientSection>
              ) : (
                <ClientSectionForm onSubmit={handleUpdate}>
                  <div className="campo">
                    <h2>Contrato</h2>
                    <Input type="file" name="contrato" />
                  </div>
                  <div className="campo">
                    <h2>Tempo de Contrato</h2>
                    <Input
                      type="text"
                      name="tempoContrato"
                      defaultValue={client.tempoContrato}
                    />
                  </div>
                  <div className="campo">
                    <h2>Valor da Mensalidade</h2>
                    <Input
                      type="number"
                      name="value"
                      defaultValue={client.value}
                    />
                  </div>
                  <div className="campo">
                    <h2>CPF/CNPJ</h2>
                    <Input type="text" name="cnpj" defaultValue={client.cnpj} />
                  </div>
                  <div className="campo">
                    <h2>Consultor</h2>
                    <Input
                      type="text"
                      name="consultor"
                      defaultValue={client.consultor}
                    />
                  </div>
                  <div className="campo">
                    <h2>Dia do Start</h2>
                    <Input
                      type="date"
                      name="dateStart"
                      defaultValue={client.dateStart}
                    />
                  </div>
                  <div className="campo">
                    <h2>Dia da vigência do contrato</h2>
                    <Input
                      type="date"
                      name="dateStart"
                      defaultValue={
                        client.dateStart && client.tempoContrato
                          ? getVigenciaFinal(
                              client.dateStart,
                              client.tempoContrato
                            )
                          : ""
                      }
                    />
                  </div>
                  <button type="submit" className="btn">
                    Enviar
                  </button>
                </ClientSectionForm>
              ))}
            {cat == "Financeiro" &&
              (!update ? (
                <ClientSection>
                  {!received ? (
                    <div className="campo">
                      <h2>Valor para Pagamento</h2>
                      <button>
                        <Skeleton width="200px" />
                      </button>
                    </div>
                  ) : client.value ? (
                    <div className="campo">
                      <h2>Valor para Pagamento</h2>
                      <button>{client.value}</button>
                    </div>
                  ) : null}
                  {!received ? (
                    <div className="campo">
                      <h2>Data de Pagamento</h2>
                      <button>
                        <Skeleton width="200px" />
                      </button>
                    </div>
                  ) : client.value ? (
                    <div className="campo">
                      <h2>Data de Pagamento</h2>
                      <button>
                        {client.vencimento.slice(
                          client.vencimento.length - 2,
                          client.vencimento.length
                        )}
                      </button>
                    </div>
                  ) : null}
                  {!received ? (
                    <div className="campo">
                      <h2>Método de Pagamento</h2>
                      <button>
                        <Skeleton width="200px" />
                      </button>
                    </div>
                  ) : client.formaPagamento ? (
                    <div className="campo">
                      <h2>Método de Pagamento</h2>
                      <button>{client.formaPagamento}</button>
                    </div>
                  ) : null}
                  {!received ? (
                    <div className="campo">
                      <h2>Valor da Mensalidade</h2>
                      <button>
                        <Skeleton width="200px" />
                      </button>
                    </div>
                  ) : client.value ? (
                    <div className="campo">
                      <h2>Valor da Mensalidade</h2>
                      <button>{client.value}</button>
                    </div>
                  ) : null}
                  {!received ? (
                    <div className="campo">
                      <h2>CPF/CNPJ</h2>
                      <button>
                        <Skeleton width="200px" />
                      </button>
                    </div>
                  ) : client.cnpj ? (
                    <div className="campo">
                      <h2>CPF/CNPJ</h2>
                      <button>{client.cnpj}</button>
                    </div>
                  ) : null}
                  {!received ? (
                    <div className="campo">
                      <h2>Gere NF</h2>
                      <button>
                        <Skeleton width="200px" />
                      </button>
                    </div>
                  ) : client.gereNF !== undefined ? (
                    <div className="campo">
                      <h2>Gere NF</h2>
                      <button>{client.gereNF === true ? "Sim" : "Não"}</button>
                    </div>
                  ) : null}
                  {!received ? (
                    <div className="campo">
                      <h2>Observação</h2>
                      <button>
                        <Skeleton width="200px" />
                      </button>
                    </div>
                  ) : client.observacaoFinanceiro ? (
                    <div className="campo">
                      <h2>Observação</h2>
                      <button>{client.observacaoFinanceiro}</button>
                    </div>
                  ) : null}
                </ClientSection>
              ) : (
                <ClientSectionForm onSubmit={handleUpdate}>
                  <div className="campo">
                    <h2>Valor para Pagamento</h2>
                    <Input
                      type="number"
                      name="value"
                      defaultValue={client.value}
                    />
                  </div>
                  <div className="campo">
                    <h2>Valor da Mensalidade</h2>
                    <Input
                      type="number"
                      name="value"
                      defaultValue={client.value}
                    />
                  </div>
                  <div className="campo">
                    <h2>Data de Pagamento</h2>
                    <Input
                      type="date"
                      name="vencimento"
                      defaultValue={client.vencimento}
                    />
                  </div>
                  <div className="campo">
                    <h2>Método de Pagamento</h2>
                    <Input
                      type="text"
                      name="formaPagamento"
                      defaultValue={client.formaPagamento}
                    />
                  </div>
                  <div className="campo">
                    <h2>Gere NF</h2>
                    <div
                      style={{
                        display: "flex",
                        gap: "1rem",
                        alignItems: "center",
                      }}
                    >
                      <label>
                        <input
                          type="radio"
                          name="gereNF"
                          value="true"
                          defaultChecked={client.gereNF === true}
                        />{" "}
                        Sim
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="gereNF"
                          value="false"
                          defaultChecked={client.gereNF === false}
                        />{" "}
                        Não
                      </label>
                    </div>
                  </div>
                  <div className="campo">
                    <h2>CPF/CNPJ</h2>
                    <Input type="text" name="cnpj" defaultValue={client.cnpj} />
                  </div>
                  <div className="campo">
                    <h2>Observação</h2>
                    <Input
                      type="text"
                      name="observacaoFinanceiro"
                      defaultValue={client.observacaoFinanceiro}
                    />
                  </div>
                  <button type="submit" className="btn">
                    Enviar
                  </button>
                </ClientSectionForm>
              ))}
            {cat == "Social" &&
              (!update ? (
                <ClientSection>
                  {!received ? (
                    <div className="campo">
                      <h2>Quantidade de Criativos</h2>
                      <button>
                        <Skeleton width="200px" />
                      </button>
                    </div>
                  ) : client.posts ? (
                    <div className="campo">
                      <h2>Quantidade de Criativos</h2>
                      <button>{client.posts}</button>
                    </div>
                  ) : null}
                  {!received ? (
                    <div className="campo">
                      <h2>Formato dos Criativos</h2>
                      <button>
                        <Skeleton width="200px" />
                      </button>
                    </div>
                  ) : client.formatoCriativos ? (
                    <div className="campo">
                      <h2>Formato dos Criativos</h2>
                      <button>{client.formatoCriativos}</button>
                    </div>
                  ) : null}
                  {!received ? (
                    <div className="campo">
                      <h2>Nível de Acompanhamento</h2>
                      <button>
                        <Skeleton width="200px" />
                      </button>
                    </div>
                  ) : client.acompanhamentoRedes ? (
                    <div className="campo">
                      <h2>Nível de Acompanhamento</h2>
                      <button>{client.acompanhamentoRedes}</button>
                    </div>
                  ) : null}
                  {!received ? (
                    <div className="campo">
                      <h2>Briefing</h2>
                      <button>
                        <Skeleton width="200px" />
                      </button>
                    </div>
                  ) : client.briefingCriativo ? (
                    <div className="campo">
                      <h2>Briefing</h2>
                      <button>{client.briefingCriativo}</button>
                    </div>
                  ) : null}
                  {!received ? (
                    <div className="campo">
                      <h2>Observação</h2>
                      <button>
                        <Skeleton width="200px" />
                      </button>
                    </div>
                  ) : client.observacaoSocial ? (
                    <div className="campo">
                      <h2>Observação</h2>
                      <button>{client.observacaoSocial}</button>
                    </div>
                  ) : null}
                  {!received ? (
                    <div className="campo">
                      <h2>Redes Sociais:</h2>
                      <button>
                        <Skeleton width="200px" />
                      </button>
                    </div>
                  ) : client.socialMedia.length > 0 ? (
                    <div className="campo">
                      <h2>Redes Sociais:</h2>
                      {client.socialMedia.map((item, index) => {
                        if (!item) return null;
                        let label = "";
                        let url = item;
                        const lower = item.toLowerCase();
                        if (lower.includes("instagram")) label = "Instagram";
                        else if (lower.includes("facebook")) label = "Facebook";
                        else if (lower.includes("youtube")) label = "YouTube";
                        else if (lower.includes("tiktok")) label = "TikTok";
                        else if (lower.includes("linkedin")) label = "LinkedIn";
                        else {
                          const match = lower.match(
                            /\/\/(?:www\.)?([^\.]+)\.com/
                          );
                          label = match
                            ? match[1].charAt(0).toUpperCase() +
                              match[1].slice(1)
                            : item;
                        }
                        return (
                          <a
                            key={index}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ textDecoration: "none" }}
                          >
                            <button type="button">{label}</button>
                          </a>
                        );
                      })}
                    </div>
                  ) : null}
                </ClientSection>
              ) : (
                <ClientSectionForm onSubmit={handleUpdate}>
                  <div className="campo">
                    <h2>Observação</h2>
                    <Input
                      type="text"
                      name="observacaoSocial"
                      defaultValue={client.observacaoSocial}
                    />
                  </div>

                  <div className="campo">
                    <h2>Quantidade de Criativos</h2>
                    <Input
                      type="text"
                      name="posts"
                      defaultValue={client.posts}
                    />
                  </div>
                  <div className="campo">
                    <h2>Formato dos Criativos</h2>
                    <Input
                      type="text"
                      name="formatoCriativos"
                      defaultValue={client.formatoCriativos}
                    />
                  </div>
                  <div className="campo">
                    <h2>Nível de Acompanhamento</h2>
                    <Input
                      type="text"
                      name="acompanhamentoRedes"
                      defaultValue={client.acompanhamentoRedes}
                    />
                  </div>
                  <div className="campo">
                    <h2>Briefing</h2>
                    <Input
                      type="text"
                      name="briefingCriativo"
                      defaultValue={client.briefingCriativo}
                    />
                  </div>
                  <div>
                    <label htmlFor="socialMedia">Redes Sociais:</label>
                    {socialMedia.map((item, index) => (
                      <div
                        key={index}
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <Input
                          type="text"
                          name={`socialMedia-${index}`}
                          value={item}
                          onChange={(e) => handleSocialMediaChange(index, e)}
                        />
                      </div>
                    ))}
                    <button
                      type="button"
                      className="addInput"
                      onClick={handleAddSocialMedia}
                    >
                      <img src="/mais.svg" alt="" />
                    </button>
                  </div>
                  <button type="submit" className="btn">
                    Enviar
                  </button>
                </ClientSectionForm>
              ))}
            {cat == "Dev" &&
              (!update ? (
                <ClientSection>
                  {newSiteModal && (
                    <DominioModal onSubmit={() => handleNewSite(event)}>
                      {deleteSiteModal && (
                        <DeleteSiteModal>
                          <h2>Tem certeza?</h2>
                          <div className="btns">
                            <button
                              className="btn danger"
                              onClick={handleDeleteSite}
                            >
                              Excluir
                            </button>
                            <button
                              className="btn"
                              onClick={() => setDeleteSiteModal(false)}
                            >
                              Cancelar
                            </button>
                          </div>
                        </DeleteSiteModal>
                      )}
                      <span
                        id="exclude"
                        onClick={() => setDeleteSiteModal(true)}
                      >
                        <img src="/exclude.svg" alt="" />
                      </span>
                      <span id="cancel" onClick={() => setNewSiteModal(false)}>
                        <img src="/cancel.svg" alt="" />
                      </span>
                      <div>
                        <label htmlFor="">Nome</label>
                        <Input
                          type="text"
                          name="name"
                          defaultValue={chosenDomain.name || ""}
                          placeholder="Name"
                        />
                      </div>
                      <div>
                        <label htmlFor="">Link</label>
                        <Input
                          type="text"
                          name="link"
                          defaultValue={chosenDomain.link || ""}
                          placeholder="Link"
                        />
                      </div>
                      <div>
                        <label htmlFor="">Data de Vencimento</label>
                        <input
                          type="date"
                          name="dataVencimento"
                          defaultValue={chosenDomain.dataVencimento || ""}
                          placeholder="Data de Vencimento"
                        />
                      </div>
                      <div>
                        <label htmlFor="">Figma</label>
                        <Input
                          type="text"
                          name="localFigma"
                          defaultValue={chosenDomain.localFigma || ""}
                          placeholder="Local Figma"
                        />
                      </div>
                      <div>
                        <label htmlFor="">Domínio</label>
                        <Input
                          type="text"
                          name="localDominio"
                          defaultValue={chosenDomain.localDominio || ""}
                          placeholder="Local Domínio"
                        />
                      </div>
                      <div>
                        <label htmlFor="">Local de Hospedagem</label>
                        <Input
                          type="text"
                          name="localHospedagem"
                          defaultValue={chosenDomain.localHospedagem || ""}
                          placeholder="Local Hospedagem"
                        />
                      </div>
                      <div>
                        <label htmlFor="">Login do Domínio</label>
                        <Input
                          type="text"
                          name="loginDominio"
                          defaultValue={chosenDomain.loginDominio || ""}
                          placeholder="Login Domínio"
                        />
                      </div>
                      <div>
                        <label htmlFor="">Senha do Domínio</label>
                        <Input
                          type="text"
                          name="senhaDominio"
                          defaultValue={chosenDomain.senhaDominio || ""}
                          placeholder="Senha Domínio"
                        />
                      </div>
                      <div>
                        <label htmlFor="">Login da Hospedagem</label>
                        <Input
                          type="text"
                          name="loginHospedagem"
                          defaultValue={chosenDomain.loginHospedagem || ""}
                          placeholder="Login Hospedagem"
                        />
                      </div>
                      <div>
                        <label htmlFor="">Senha da Hospedagem</label>
                        <Input
                          type="text"
                          name="senhaHospedagem"
                          defaultValue={chosenDomain.senhaHospedagem || ""}
                          placeholder="Senha Hospedagem"
                        />
                      </div>
                      <button type="submit" className="btn">
                        Salvar
                      </button>
                    </DominioModal>
                  )}
                  {!received ? (
                    <div className="campo">
                      <h2>Observação</h2>
                      <button>
                        <Skeleton width="200px" />
                      </button>
                    </div>
                  ) : client.observacaoDev ? (
                    <div className="campo">
                      <h2>Observação</h2>
                      <button>{client.observacaoDev}</button>
                    </div>
                  ) : null}
                  {client.dominio.map((dominio, index) => (
                    <div key={index} className="campo">
                      <h2>Site</h2>
                      <button onClick={() => updateSite(dominio)}>
                        {dominio.name}
                      </button>
                    </div>
                  ))}
                  <button onClick={newSite}>
                    <img src="/mais.svg" alt="mais" title="Novo Site" />
                  </button>
                </ClientSection>
              ) : (
                <ClientSectionForm onSubmit={handleUpdate}>
                  <div className="campo">
                    <h2>Observação</h2>
                    <Input
                      type="text"
                      name="observacaoDev"
                      defaultValue={client.observacaoDev}
                    />
                  </div>
                  <button type="submit" className="btn">
                    Enviar
                  </button>
                </ClientSectionForm>
              ))}
            {cat == "Tráfego" &&
              (!update ? (
                <ClientSection>
                  {newSiteModal && (
                    <DominioModal onSubmit={() => handleNewPlatform(event)}>
                      {deleteSiteModal && (
                        <DeleteSiteModal>
                          <h2>Tem certeza?</h2>
                          <div className="btns">
                            <button
                              className="btn danger"
                              onClick={handleDeletePlataforma}
                            >
                              Excluir
                            </button>
                            <button
                              className="btn"
                              onClick={() => setDeleteSiteModal(false)}
                            >
                              Cancelar
                            </button>
                          </div>
                        </DeleteSiteModal>
                      )}
                      <span
                        id="exclude"
                        onClick={() => setDeleteSiteModal(true)}
                      >
                        <img src="/exclude.svg" alt="" />
                      </span>
                      <span id="cancel" onClick={() => setNewSiteModal(false)}>
                        <img src="/cancel.svg" alt="" />
                      </span>
                      <div>
                        <label htmlFor="">Plataforma</label>
                        <Input
                          type="text"
                          name="plataforma"
                          defaultValue={chosenPlatform.plataforma || ""}
                          placeholder="Plataforma"
                        />
                      </div>
                      <div>
                        <label htmlFor="">Método Pagamento</label>
                        <Input
                          type="text"
                          name="metodoPag"
                          defaultValue={chosenPlatform.metodoPag || ""}
                          placeholder="Método Pagamento"
                        />
                      </div>
                      <div>
                        <label htmlFor="">Data dos Relatórios</label>
                        <Input
                          type="text"
                          name="dataRelatorios"
                          defaultValue={chosenPlatform.dataRelatorios || ""}
                          placeholder="Data dos Relatórios"
                        />
                      </div>
                      <div>
                        <label htmlFor="">Situação</label>
                        <Input
                          type="text"
                          name="situacao"
                          defaultValue={chosenPlatform.situacao || ""}
                          placeholder="Situação"
                        />
                      </div>
                      <div>
                        <label htmlFor="">Teto</label>
                        <Input
                          type="text"
                          name="teto"
                          defaultValue={chosenPlatform.teto || ""}
                          placeholder="Teto"
                        />
                      </div>
                      <div>
                        <label htmlFor="">Pontos</label>
                        <Input
                          type="text"
                          name="pontos"
                          defaultValue={chosenPlatform.pontos || ""}
                          placeholder="Pontos"
                        />
                      </div>
                      <button type="submit" className="btn">
                        Salvar
                      </button>
                    </DominioModal>
                  )}
                  {!received ? (
                    <div className="campo">
                      <h2>Observação</h2>
                      <button>
                        <Skeleton width="200px" />
                      </button>
                    </div>
                  ) : client.observacaoTrafego ? (
                    <div className="campo">
                      <h2>Observação</h2>
                      <button>{client.observacaoTrafego}</button>
                    </div>
                  ) : null}
                  {!received ? (
                    <div className="campo">
                      <h2>DashBoard</h2>
                      <button>
                        <Skeleton width="200px" />
                      </button>
                    </div>
                  ) : client.linkDashboard ? (
                    <div className="campo">
                      <h2>DashBoard</h2>
                      <button>{client.linkDashboard}</button>
                    </div>
                  ) : null}
                  {!received ? (
                    <div className="campo">
                      <h2>Meta ADS</h2>
                      <button>
                        <Skeleton width="200px" />
                      </button>
                    </div>
                  ) : client.linkMetaAds ? (
                    <div className="campo">
                      <h2>Meta ADS</h2>
                      <button>{client.linkMetaAds}</button>
                    </div>
                  ) : null}
                  {!received ? (
                    <div className="campo">
                      <h2>Operand</h2>
                      <button>
                        <Skeleton width="200px" />
                      </button>
                    </div>
                  ) : client.linkOperand ? (
                    <div className="campo">
                      <h2>Operand</h2>
                      <button>{client.linkOperand}</button>
                    </div>
                  ) : null}
                  {!received ? (
                    <div className="campo">
                      <h2>Google ADS</h2>
                      <button>
                        <Skeleton width="200px" />
                      </button>
                    </div>
                  ) : client.linkGoogleAds ? (
                    <div className="campo">
                      <h2>Google ADS</h2>
                      <button>{client.linkGoogleAds}</button>
                    </div>
                  ) : null}
                  {client.plataformasTrafego.map((plataforma, index) => (
                    <div key={index} className="campo">
                      <h2>Plataforma</h2>
                      <button onClick={() => updatePlataforma(plataforma)}>
                        {plataforma.plataforma}
                      </button>
                    </div>
                  ))}
                  <button onClick={newPlataforma}>
                    <img src="/mais.svg" alt="mais" title="Novo Site" />
                  </button>
                </ClientSection>
              ) : (
                <ClientSectionForm onSubmit={handleUpdate}>
                  <div className="campo">
                    <h2>Observação</h2>
                    <Input
                      type="text"
                      name="observacaoTrafego"
                      defaultValue={client.observacaoTrafego}
                    />
                  </div>
                  <div className="campo">
                    <h2>DashBoard</h2>
                    <Input
                      type="text"
                      name="linkDashboard"
                      defaultValue={client.linkDashboard}
                    />
                  </div>
                  <div className="campo">
                    <h2>Meta ADS</h2>
                    <Input
                      type="text"
                      name="linkMetaAds"
                      defaultValue={client.linkMetaAds}
                    />
                  </div>
                  <div className="campo">
                    <h2>Operand</h2>
                    <Input
                      type="text"
                      name="linkOperand"
                      defaultValue={client.linkOperand}
                    />
                  </div>
                  <div className="campo">
                    <h2>Google ADS</h2>
                    <Input
                      type="text"
                      name="linkGoogleAds"
                      defaultValue={client.linkGoogleAds}
                    />
                  </div>
                  <button type="submit" className="btn">
                    Enviar
                  </button>
                </ClientSectionForm>
              ))}
            {cat == "A&V" &&
              (!update ? (
                <ClientSection>
                  {!received ? (
                    <div className="campo">
                      <h2>Observação</h2>
                      <button>
                        <Skeleton width="200px" />
                      </button>
                    </div>
                  ) : client.observacaoAV ? (
                    <div className="campo">
                      <h2>Observação</h2>
                      <button>{client.observacaoAV}</button>
                    </div>
                  ) : null}
                  {!received ? (
                    <div className="campo">
                      <h2>Quantidade de Vídeos</h2>
                      <button>
                        <Skeleton width="200px" />
                      </button>
                    </div>
                  ) : client.nVideos ? (
                    <div className="campo">
                      <h2>Quantidade de Vídeos</h2>
                      <button>{client.nVideos}</button>
                    </div>
                  ) : null}
                  {!received ? (
                    <div className="campo">
                      <h2>Quantidade de Captações Mensal</h2>
                      <button>
                        <Skeleton width="200px" />
                      </button>
                    </div>
                  ) : client.nVisitas ? (
                    <div className="campo">
                      <h2>Quantidade de Captações Mensal</h2>
                      <button>{client.nVisitas}</button>
                    </div>
                  ) : null}
                  {!received ? (
                    <div className="campo">
                      <h2>Tempo de Captação</h2>
                      <button>
                        <Skeleton width="200px" />
                      </button>
                    </div>
                  ) : client.tempoCap ? (
                    <div className="campo">
                      <h2>Tempo de Captação</h2>
                      <button>{client.tempoCap}</button>
                    </div>
                  ) : null}
                  {!received ? (
                    <div className="campo">
                      <h2>Briefing Vídeo</h2>
                      <button>
                        <Skeleton width="200px" />
                      </button>
                    </div>
                  ) : client.briefingVideo ? (
                    <div className="campo">
                      <h2>Briefing Vídeo</h2>
                      <button>{client.briefingVideo}</button>
                    </div>
                  ) : null}
                  {!received ? (
                    <div className="campo">
                      <h2>Formato dos Vídeos</h2>
                      <button>
                        <Skeleton width="200px" />
                      </button>
                    </div>
                  ) : client.formatoVideos ? (
                    <div className="campo">
                      <h2>Formato dos Vídeos</h2>
                      <button>{client.formatoVideos}</button>
                    </div>
                  ) : null}
                  {!received ? (
                    <div className="campo">
                      <h2>Redes Sociais:</h2>
                      <button>
                        <Skeleton width="200px" />
                      </button>
                    </div>
                  ) : client.socialMedia.length > 0 ? (
                    <div className="campo">
                      <h2>Redes Sociais:</h2>
                      {client.socialMedia.map((item, index) => {
                        if (!item) return null;
                        let label = "";
                        let url = item;
                        const lower = item.toLowerCase();
                        if (lower.includes("instagram")) label = "Instagram";
                        else if (lower.includes("facebook")) label = "Facebook";
                        else if (lower.includes("youtube")) label = "YouTube";
                        else if (lower.includes("tiktok")) label = "TikTok";
                        else if (lower.includes("linkedin")) label = "LinkedIn";
                        else {
                          // Tenta extrair o texto antes do .com
                          const match = lower.match(
                            /\/\/(?:www\.)?([^\.]+)\.com/
                          );
                          label = match
                            ? match[1].charAt(0).toUpperCase() +
                              match[1].slice(1)
                            : item;
                        }
                        return (
                          <a
                            key={index}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ textDecoration: "none" }}
                          >
                            <button type="button">{label}</button>
                          </a>
                        );
                      })}
                    </div>
                  ) : null}
                </ClientSection>
              ) : (
                <ClientSectionForm onSubmit={handleUpdate}>
                  <div className="campo">
                    <h2>Observação</h2>
                    <Input
                      type="text"
                      name="observacaoAV"
                      defaultValue={client.observacaoAV}
                    />
                  </div>
                  <div className="campo">
                    <h2>Quantidade de Vídeos</h2>
                    <Input
                      type="number"
                      name="nVideos"
                      defaultValue={client.nVideos}
                    />
                  </div>
                  <div className="campo">
                    <h2>Quantidade de Captações Mensal</h2>
                    <Input
                      type="number"
                      name="nVisitas"
                      defaultValue={client.nVisitas}
                    />
                  </div>
                  <div className="campo">
                    <h2>Tempo de Captação</h2>
                    <Input
                      type="number"
                      name="tempoCap"
                      defaultValue={client.tempoCap}
                    />
                  </div>
                  <div className="campo">
                    <h2>Briefing Vídeo</h2>
                    <Input
                      type="text"
                      name="briefingVideo"
                      defaultValue={client.briefingVideo}
                    />
                  </div>
                  <div className="campo">
                    <h2>Formato dos Vídeos</h2>
                    <Input
                      type="text"
                      name="formatoVideos"
                      defaultValue={client.formatoVideos}
                    />
                  </div>
                  <div>
                    <label htmlFor="socialMedia">Redes Sociais:</label>
                    {socialMedia.map((item, index) => (
                      <div
                        key={index}
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <Input
                          type="text"
                          name={`socialMedia-${index}`}
                          value={item}
                          onChange={(e) => handleSocialMediaChange(index, e)}
                        />
                      </div>
                    ))}
                    <button
                      type="button"
                      className="addInput"
                      onClick={handleAddSocialMedia}
                    >
                      <img src="/mais.svg" alt="" />
                    </button>
                  </div>
                  <button type="submit" className="btn">
                    Enviar
                  </button>
                </ClientSectionForm>
              ))}
          </ClientBody>
        </ClientStyled>
      </ClientContainer>
    </>
  );
}
