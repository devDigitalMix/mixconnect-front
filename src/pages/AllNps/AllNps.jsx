import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getAllNps,
  getNpsByClient,
  getNpsByClientsName,
} from "../../services/npsService";
import { AllNpsContainer, NpsContent, NpsUnit } from "./AllNpsStyled";
import { Input } from "../../components/Input/Input";

export function AllNps() {
  const { id } = useParams();
  const [received, setReceived] = useState(false);
  const [nps, setNps] = useState([]);
  const [query, setQuery] = useState("");
  const debounceTimeout = useRef(null);
  const navigate = useNavigate();

  async function getNps() {
    setReceived(false);
    if (id) {
      const response = await getNpsByClient(id);
      setNps(response.data.results);
    } else {
      const response = await getAllNps();
      setNps(response.data.results);
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
      console.log(response);
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
        {received &&
          nps.map((aNps, index) => (
            <NpsUnit
              key={index}
              angle={angle}
              onClick={() => navigate("/home/viewnps/" + aNps.id)}
            >
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
          ))}
      </NpsContent>
    </AllNpsContainer>
  );
}
