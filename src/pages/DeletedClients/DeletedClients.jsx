/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import {
  AClientDeleted,
  ClientDeletedContent,
  ClientDeletedHead,
  DeletedClientsBody,
  DeletedClientsHeader,
  DeletedClientsStyled,
} from "./DeletedClientsStyled";
import { userLogged } from "../../services/employeeService";
import { UserContext } from "../../Context/UserContent";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { getDeletedClientsService } from "../../services/deletedClientsService";
import { ClientSkeleton } from "../../components/ClientSkeleton/ClientSkeleton";

export default function DeletedClients() {
  const { user, setUser } = useContext(UserContext);
  const [deletedClients, setDeletedClients] = useState([]);
  const [received, setReceived] = useState(false);
  const navigate = useNavigate();

  async function getDeletedClients() {
    setReceived(false);
    const response = await getDeletedClientsService();
    setDeletedClients(response.data.results);
    setReceived(true);
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
    getDeletedClients();
  }, []);

  return (
    <DeletedClientsStyled>
      <DeletedClientsHeader>
        <Link to="/home/clients">
          <img src="/voltar.svg" alt="voltar" title="Voltar" />
        </Link>
      </DeletedClientsHeader>
      <DeletedClientsBody>
        {received ? (
          deletedClients.map((client, index) => (
            <Link to={"/home/deletedClient/" + client.clientId} key={index}>
              <AClientDeleted>
                <ClientDeletedContent>
                  <ClientDeletedHead>
                    {!client.logo ? (
                      <img
                        src="/avatar-default.png"
                        className="clientLogo"
                        alt="logo"
                      />
                    ) : (
                      <img
                        src={client.logo}
                        className="clientLogo"
                        alt="logo"
                      />
                    )}
                    <div>
                      <h2>{client.name}</h2>
                      <p>{client.plan}</p>
                    </div>
                  </ClientDeletedHead>
                  <p>Gestor: {client.gestor}</p>
                  <p>CS: {client.cs}</p>
                  <p>Valor Contrato: R$ {client.value}</p>
                  <p>Motivo Saída: {client.motive}</p>
                </ClientDeletedContent>
              </AClientDeleted>
            </Link>
          ))
        ) : (
          <ClientSkeleton cards={12}></ClientSkeleton>
        )}
      </DeletedClientsBody>
    </DeletedClientsStyled>
  );
}
