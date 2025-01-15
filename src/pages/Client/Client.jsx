/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  deleteClient,
  getClientById,
  UpdateClientAvatar,
  updateClientService,
} from "../../services/clientService";
// import { ClientStyled, ClientStyledContent } from "./ClientStyled";
import {
  ProfileAvatar,
  ProfileBody,
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
import { DeleteClientStyled, Drive } from "./ClientStyled";
import { userLogged } from "../../services/employeeService";
import { UserContext } from "../../Context/UserContent";
import Skeleton from "react-loading-skeleton";
import { getPlansService } from "../../services/planService";
import { Label } from "../../components/Label/Label";

export default function Client() {
  const { id } = useParams();
  const { user, setUser, loading } = useContext(UserContext);
  const [client, setClient] = useState({});
  const [update, setUpdate] = useState(false);
  const [updateAvatar, setUpdateAvatar] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [socialMedia, setSocialMedia] = useState(client.socialMedia || []);
  const [page, setPage] = useState(client.pages || []);
  const [gmb, setGmb] = useState(client.gmb || []);
  const [plans, setPlans] = useState([]);
  const [deleteClick, setDeleteClick] = useState(false);
  const [received, setReceived] = useState(false);
  const navigate = useNavigate();

  async function getPlans() {}

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
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    const allowedFormats = [
      "image/png",
      "image/jpeg",
      "image/jpg",
      "image/webp",
      "image/svg+xml",
    ];
    if (!allowedFormats.includes(data.logo.type)) {
      alert("Formato de arquivo não permitido.");
      return;
    }

    try {
      await UpdateClientAvatar(data, client._id);
      setUpdateAvatar(!updateAvatar);
      getClient();
    } catch (error) {
      console.log(error);
    }
  }

  function updateAvatarClick(e) {
    if (update && e.target == document.getElementById("cancelaAvatar")) {
      setUpdateAvatar(!updateAvatar);
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

  function updateForm() {
    setUpdate(!update);
    setSocialMedia(client.socialMedia || []);
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
    data.pages = page.filter((item) => item.trim() !== "");
    data.gmb = gmb.filter((item) => item.trim() !== "");
    if (!data.dateStart) {
      data.dateStart = client.dateStart;
    }
    try {
      await updateClientService(data, client._id);
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
      setSocialMedia(response.data.socialMedia || []);
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

  useEffect(() => {
    if (Cookies.get("token")) findUserLogged();
    else navigate("/");
    getClient();
  }, [id]);

  return (
    <>
      <ProfileContainer $isactive={true}>
        <img src="/grande-bottom.png" id="grande-bottom" />
        <img src="/grande-top.png" id="grande-top" />
        <ProfileStyled>
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
            user.role == "Comercial") && (
            <TopButtons>
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
              {received && client.logo ? (
                <a target="_blank" href={client.logo ? client.logo : undefined}>
                  <img
                    src={client.logo}
                    alt="avatar"
                    id="avatarImg"
                    draggable="false"
                  />
                </a>
              ) : (
                <a>
                  <img
                    src={"/avatar-default.png"}
                    alt="avatar"
                    id="avatarImg"
                    draggable="false"
                  />
                </a>
              )}
              {(user.level == "Líder" || user.level == "Admin") && (
                <UploadAvatar
                  onSubmit={handleUpdateAvatar}
                  encType="multipart/form-data"
                >
                  <label htmlFor="logo" onClick={updateAvatarClick}>
                    <img
                      src="/upload-avatar.svg"
                      alt="Upload"
                      draggable="false"
                      style={updateAvatar ? { opacity: 0 } : {}}
                    />
                  </label>
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
            </ProfileAvatar>
            <ProfileData>
              <div>
                <h2>{client.name || <Skeleton width="200px" />}</h2>
                <h4>{plans[0] || <Skeleton width="200px" />}</h4>
              </div>
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
            </ProfileData>
            {client.drive && (
              <Drive target="_blank" href={client.drive}>
                Link para o drive
              </Drive>
            )}
          </TopProfile>
          {update ? (
            <>
              <ProfileUpdate onSubmit={handleUpdate}>
                <div>
                  <label htmlFor="name">Nome:</label>
                  <Input type="text" name="name" defaultValue={client.name} />
                </div>
                <div>
                  <label htmlFor="plan">Plano:</label>
                  <select name="plan">
                    {plans.map((plano) => (
                      <option key={plano} value={plano}>
                        {plano}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="desc">Descrição:</label>
                  <textarea
                    type="text"
                    name="desc"
                    defaultValue={client.desc}
                  ></textarea>
                </div>
                <div>
                  <label htmlFor="value">Valor Contrato:</label>
                  <Input type="text" name="value" defaultValue={client.value} />
                </div>
                <div>
                  <label htmlFor="cnpj">CNPJ:</label>
                  <Input type="text" name="cnpj" defaultValue={client.cnpj} />
                </div>
                <div>
                  <label htmlFor="adsValue">Valor ADS:</label>
                  <Input
                    type="text"
                    name="adsValue"
                    defaultValue={client.adsValue}
                  />
                </div>
                <div>
                  <label htmlFor="acompanhamentoAds">Acompanhamento ADS:</label>
                  <select name="acompanhamentoAds">
                    {client.acompanhamentoAds != "Nenhum" ? (
                      <option value={client.acompanhamentoAds}>
                        {client.acompanhamentoAds}
                      </option>
                    ) : null}
                    <option value="Nenhum">Nenhum</option>
                    {client.acompanhamentoAds != "Leve" ? (
                      <option value="Leve">Leve</option>
                    ) : null}
                    {client.acompanhamentoAds != "Moderado" ? (
                      <option value="Moderado">Moderado</option>
                    ) : null}
                    {client.acompanhamentoAds != "Agressivo" ? (
                      <option value="Agressivo">Agressivo</option>
                    ) : null}
                  </select>
                </div>
                <div>
                  <label htmlFor="gestor">Gestor:</label>
                  <Input
                    type="text"
                    name="gestor"
                    defaultValue={client.gestor}
                  />
                </div>
                <div>
                  <label htmlFor="cs">CS:</label>
                  <Input type="text" name="cs" defaultValue={client.cs} />
                </div>
                <div>
                  <label htmlFor="posts">Criativos:</label>
                  <Input type="text" name="posts" defaultValue={client.posts} />
                </div>
                <div>
                  <label htmlFor="acompanhamentoRedes">
                    Acompanhamento Redes:
                  </label>
                  <select name="acompanhamentoRedes">
                    {client.acompanhamentoRedes != "Nenhum" ? (
                      <option value={client.acompanhamentoRedes}>
                        {client.acompanhamentoRedes}
                      </option>
                    ) : null}
                    <option value="Nenhum">Nenhum</option>
                    {client.acompanhamentoRedes != "Leve" ? (
                      <option value="Leve">Leve</option>
                    ) : null}
                    {client.acompanhamentoRedes != "Moderado" ? (
                      <option value="Moderado">Moderado</option>
                    ) : null}
                    {client.acompanhamentoRedes != "Agressivo" ? (
                      <option value="Agressivo">Agressivo</option>
                    ) : null}
                  </select>
                </div>
                <div>
                  <label htmlFor="email">E-mail:</label>
                  <Input type="text" name="email" defaultValue={client.email} />
                </div>
                <div>
                  <label htmlFor="whatsapp">Whatsapp:</label>
                  <Input
                    type="text"
                    name="whatsapp"
                    defaultValue={client.whatsapp}
                  />
                </div>
                <div>
                  <label htmlFor="dateStart">Data Início:</label>
                  <Input
                    type="date"
                    name="dateStart"
                    defaultValue={client.dateStart}
                  />
                </div>
                <div>
                  <label htmlFor="drive">Link Drive:</label>
                  <Input type="text" name="drive" defaultValue={client.drive} />
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
                  ></button>
                </div>
                <div>
                  <label htmlFor="pages">Pages:</label>
                  {page.map((item, index) => (
                    <div
                      key={index}
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <Input
                        type="text"
                        name={`page-${index}`}
                        value={item}
                        onChange={(e) => handlePageChange(index, e)}
                      />
                    </div>
                  ))}
                  <button
                    type="button"
                    className="addInput"
                    onClick={handleAddPage}
                  ></button>
                </div>
                <div>
                  <label htmlFor="gmb">GMB:</label>
                  {gmb.map((item, index) => (
                    <div
                      key={index}
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <Input
                        type="text"
                        name={`gmb-${index}`}
                        value={item}
                        onChange={(e) => handleGmbChange(index, e)}
                      />
                    </div>
                  ))}
                  <button
                    type="button"
                    className="addInput"
                    onClick={handleAddGmb}
                  ></button>
                </div>

                {!isLoading ? (
                  <button type="submit" className="btn">
                    Salvar
                  </button>
                ) : (
                  <div className="custom-loader"></div>
                )}
              </ProfileUpdate>
            </>
          ) : (
            <>
              <ProfileBody>
                <div>
                  <h4>Descrição:</h4>
                  <p>{client.desc || "Descrição"}</p>
                </div>
                <div>
                  <h4>Valor Contrato:</h4>
                  <p>R$ {client.value || <Skeleton width="200px" />}</p>
                </div>
                <div>
                  <h4>CNPJ:</h4>
                  <p>{client.cnpj || <Skeleton width="200px" />}</p>
                </div>
                <div>
                  <h4>Valor ADS:</h4>
                  <p>
                    {client.adsValue >= 0 ? (
                      client.adsValue
                    ) : (
                      <Skeleton width="200px" />
                    )}
                  </p>
                </div>
                {client.acompanhamentoAds ? (
                  <div>
                    <h4>Acompanhamento Ads:</h4>
                    <p>
                      {client.acompanhamentoAds ? (
                        client.acompanhamentoAds
                      ) : (
                        <Skeleton width="200px" />
                      )}
                    </p>
                  </div>
                ) : null}
                <div>
                  <h4>Gestor:</h4>
                  <p>{client.gestor || <Skeleton width="200px" />}</p>
                </div>
                <div>
                  <h4>CS:</h4>
                  <p>{client.cs || <Skeleton width="200px" />}</p>
                </div>
                <div>
                  <h4>Criativos:</h4>
                  <p>
                    {client.posts >= 0 ? (
                      client.posts
                    ) : (
                      <Skeleton width="200px" />
                    )}
                  </p>
                </div>
                {client.acompanhamentoRedes ? (
                  <div>
                    <h4>Acompanhamento Redes:</h4>
                    <p>
                      {client.acompanhamentoRedes ? (
                        client.acompanhamentoRedes
                      ) : (
                        <Skeleton width="200px" />
                      )}
                    </p>
                  </div>
                ) : null}
                <div>
                  <h4>E-mail:</h4>
                  <p>{client.email || "email@gmail.com"}</p>
                </div>
                <div>
                  <h4>Data Início:</h4>
                  <p>
                    {formatDate(client.dateStart) || <Skeleton width="200px" />}
                  </p>
                </div>
                {client.socialMedia && client.socialMedia != "" && (
                  <div>
                    <h4>Redes Sociais:</h4>
                    {client.socialMedia.map((item, index) => {
                      const displayText = removeTexts(item, textsToRemove);
                      return (
                        <a target="_blank" href={item} key={index}>
                          {displayText}
                        </a>
                      );
                    })}
                  </div>
                )}

                {client.gmb && client.gmb != "" && (
                  <div>
                    <h4>GMB:</h4>
                    {client.gmb
                      ? client.gmb.map((item, index) => (
                          <p key={index}>{item}</p>
                        ))
                      : null}
                  </div>
                )}
                {client.pages && client.pages != "" && (
                  <div>
                    <h4>Pages:</h4>
                    {client.pages
                      ? client.pages.map((item, index) => (
                          <p key={index}>{item}</p>
                        ))
                      : null}
                  </div>
                )}
              </ProfileBody>
            </>
          )}
        </ProfileStyled>
      </ProfileContainer>
    </>
  );
}
