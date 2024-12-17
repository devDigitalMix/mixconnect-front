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
  TopProfile,
} from "../Profile/ProfileStyled";
import Cookies from "js-cookie";
import { userLogged } from "../../services/employeeService";
import { UserContext } from "../../Context/UserContent";
import Skeleton from "react-loading-skeleton";
import { getPlansService } from "../../services/planService";
import { Drive } from "../Client/ClientStyled";
import {
  deleteDeletedClient,
  getDeletedClientById,
  recoverDeletedClient,
} from "../../services/deletedClientsService";
import { DeletedCLientBtns } from "./DeletedClientStyled";

export default function DeletedClient() {
  const { id } = useParams();
  const { user, setUser, loading } = useContext(UserContext);
  const [client, setClient] = useState({});
  const [plans, setPlans] = useState([]);
  const [received, setReceived] = useState(false);
  const navigate = useNavigate();

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

  function formatDate(data) {
    const date = new Date(data);
    const dia = String(date.getDate() + 1).padStart(2, "0");
    const mes = String(date.getMonth() + 1).padStart(2, "0");
    const ano = date.getFullYear();
    const dataAtt = `${dia}/${mes}/${ano}`;
    return dataAtt;
  }

  async function getClient() {
    setReceived(false);
    try {
      const response = await getDeletedClientById(id);
      setClient(response.data);
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
  }

  async function recover() {
    await recoverDeletedClient(client.clientId);
    navigate("/home/clients");
  }
  async function deleteDeleted() {
    await deleteDeletedClient(client.clientId);
    navigate("/home/deletedClients");
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
      <ProfileContainer>
        <ProfileStyled>
          <TopProfile>
            <Link to={"/home/deletedClients"}>
              <img
                src="/cancel.svg"
                alt="voltar"
                className="voltar img-effect"
              />
            </Link>
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
            <DeletedCLientBtns>
              <button onClick={recover}>Restaurar</button>
              <button onClick={deleteDeleted}>Excluir</button>
            </DeletedCLientBtns>
          </TopProfile>
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
                    ? client.gmb.map((item, index) => <p key={index}>{item}</p>)
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
        </ProfileStyled>
      </ProfileContainer>
    </>
  );
}
