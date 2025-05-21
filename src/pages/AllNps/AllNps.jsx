/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getAllNps,
  getNpsByClient,
  getNpsByClientsName,
} from "../../services/npsService";
import { AllNpsContainer, NpsContent, NpsUnit } from "./AllNpsStyled";
import { Input } from "../../components/Input/Input";
import { getClientsByIdList } from "../../services/clientService";
import { NpsItemSkeleton } from "../../components/NpsItemSkeleton/NpsItemSkeleton";
import { PageButtons } from "../Clients/ClientsStyled";

export function AllNps() {
  const { id } = useParams();
  const [received, setReceived] = useState(false);
  const [nps, setNps] = useState([]);
  const [clients, setClients] = useState([]);
  const [query, setQuery] = useState("");
  const debounceTimeout = useRef(null);
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [totalNps, setTotalNps] = useState(0);
  const [lista, setLista] = useState([]);
  const limit = 24;

  async function getNps(limit = 24, offset = 0) {
    setReceived(false);
    try {
      let response;
      if (id) {
        response = await getNpsByClient(id, limit, offset);
      } else {
        response = await getAllNps(limit, offset);
      }
      const npsResults = response.data.results;
      setNps(npsResults);
      setTotalNps(response.data.total || npsResults.length);

      // Extrai os clientId únicos dos NPS
      const clientIds = [
        ...new Set(npsResults.map((npsItem) => npsItem.clientId)),
      ];
      const responseClients = await getClientsByIdList(clientIds);
      const clientsInvolved = responseClients.data.results.filter((client) =>
        clientIds.includes(client.id)
      );
      setClients(clientsInvolved);

      // Atualiza lista de páginas
      let c = 0;
      let tempList = [];
      while (c <= (response.data.total || npsResults.length) / limit) {
        tempList.push(c);
        c++;
      }
      setLista(tempList);
    } catch (error) {
      console.error("Error fetching NPS data:", error);
    }
    setReceived(true);
  }

  const onInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      if (value.trim() === "") {
        getNps();
      } else {
        handleSearch(value.trim());
      }
    }, 300);
  };

  const handleSearch = (name) => {
    setReceived(false);

    getNpsByClientsName(name).then(async (response) => {
      setNps(response.data.results);
      setReceived(true);
    });
  };

  const [angle, setAngle] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAngle((prevAngle) => (prevAngle + 2) % 360);
    }, 20);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    getNps(limit, page * limit);
  }, [page]);

  useEffect(() => {
    getNps();
  }, []);

  return (
    <AllNpsContainer>
      {received && nps.length > 0 && id && <h2>{nps[0].clientName}</h2>}
      <button onClick={() => navigate(-1)}>
        <img
          src="/voltar.svg"
          alt="Voltar"
          title="Voltar"
          className="img-effect"
        />
      </button>
      {!id && (
        <Input
          id="npsInputClient"
          placeholder="Nome do Cliente"
          value={query}
          onChange={onInputChange}
        />
      )}
      <NpsContent>
        {received ? (
          nps.map((aNps, index) => {
            const client = clients.find(
              (client) => client.id === aNps.clientId
            );

            // Corrigido: só acessa logo se client existir
            const logo =
              client && client.logo ? client.logo : "/avatar-default.png";

            return (
              <NpsUnit
                key={index}
                angle={angle}
                onClick={() => navigate("/home/viewnps/" + aNps.id)}
              >
                <img src={logo} alt="Logo do Cliente" className="client-logo" />
                <div className="npsBackGround">
                  {!id && <h3>{aNps.clientName}</h3>}
                  <h3>{aNps.name}</h3>
                  {aNps.ok ? (
                    <p className="respondido">Respondido</p>
                  ) : (
                    <p className="aberto">Aberto</p>
                  )}
                </div>
              </NpsUnit>
            );
          })
        ) : (
          <NpsItemSkeleton cards={12} />
        )}
      </NpsContent>
      {!query && lista.length > 1 && (
        <PageButtons>
          {lista
            .filter(
              (n, _, arr) =>
                n === 0 ||
                n === arr[arr.length - 1] ||
                (n >= page - 2 && n <= page + 2)
            )
            .reduce((acc, n, index, filtered) => {
              const prev = filtered[index - 1];
              if (prev !== undefined && n - prev > 1) {
                acc.push("...");
              }
              acc.push(n);
              return acc;
            }, [])
            .map((n, index) =>
              n === "..." ? (
                <span key={`ellipsis-${index}`} style={{ margin: "0 5px" }}>
                  ...
                </span>
              ) : (
                <p
                  key={n}
                  style={{
                    color: page === n ? "#6d6d6d" : "var(--light)",
                  }}
                  onClick={() => setPage(n)}
                >
                  {n + 1}
                </p>
              )
            )}
        </PageButtons>
      )}
    </AllNpsContainer>
  );
}
