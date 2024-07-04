/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { getAllClients } from "../../services/clientService";
import {
  AClient,
  ClientBody,
  ClientContent,
  ClientHeader,
  ClientsStyled,
} from "./ClientsStyled";
import { Input } from "../../components/Input/Input";

export function Clients() {
  const [clients, setClients] = useState([]);

  async function getClients() {
    const response = await getAllClients();
    setClients(response.data.results);
  }

  useEffect(() => {
    getClients();
  }, []);

  return (
    <ClientsStyled>
      <ClientHeader>
        <img
          src="/mais.svg"
          className="img-effect"
          alt="novo cliente"
          title="Novo Cliente"
        />
        <div>
          <Input />
          <img
            src="/filters.svg"
            className="img-effect"
            alt="filtros"
            title="Filtros"
          />
        </div>
      </ClientHeader>
      <ClientBody>
        {clients
          ? clients.map((client) => (
              <AClient key={client.id}>
                <ClientContent>
                  {!client.logo ? (
                    <img src="/avatar-default.png" alt="logo" />
                  ) : (
                    <img src={client.logo} alt="logo" />
                  )}
                  <p>{client.name}</p>
                </ClientContent>
              </AClient>
            ))
          : null}
      </ClientBody>
    </ClientsStyled>
  );
}
