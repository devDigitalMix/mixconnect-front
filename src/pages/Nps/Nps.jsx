import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { NpsContainer, NpsItem } from "./NpsStyled";
import { findNpsById } from "../../services/npsService";

export default function Nps() {
  const { id } = useParams();
  const [nps, setNps] = useState();
  const [received, setReceived] = useState(false);
  const navigate = useNavigate();

  function formatDate(data) {
    var date = new Date(data);
    date.setHours(date.getHours() + 3);
    const dia = String(date.getDate()).padStart(2, "0");
    const mes = String(date.getMonth() + 1).padStart(2, "0");
    const ano = date.getFullYear();
    const dataAtt = `${dia}/${mes}/${ano}`;
    return dataAtt;
  }
  async function getNps() {
    setReceived(false);
    const response = await findNpsById(id);
    setNps(response.data);
    console.log(response.data);
    setReceived(true);
  }

  useEffect(() => {
    getNps();
  }, []);

  return (
    <NpsContainer>
      <button onClick={() => navigate(-1)}>
        <img
          src="/voltar.svg"
          alt="Voltar"
          title="Voltar"
          className="img-effect"
        />
      </button>
      {received && (
        <NpsItem>
          <div>
            <h2>{nps.clientName}</h2>
            <h3>{nps.name}</h3>
          </div>
          {nps.ratings.length > 0 &&
            nps.ratings.map((rating, index) => (
              <div key={index}>
                <h5>{rating.desc}</h5>
                {nps.ok ? (
                  <p className="nota">
                    Nota:{" "}
                    <strong
                      style={{
                        color:
                          rating.value >= 9
                            ? "#58FCAD"
                            : rating.value >= 7
                            ? "#FFC83D "
                            : "#FF3939",
                      }}
                    >
                      {rating.value}
                    </strong>
                  </p>
                ) : (
                  <p>Não Respondido</p>
                )}
              </div>
            ))}
          {nps.feedBack != "" && (
            <div>
              <h5>FeedBack:</h5>
              <p>{nps.feedback}</p>
            </div>
          )}
          <span id="createdDate">Criado: {formatDate(nps.createdDate)}</span>
          {nps.answerDate && (
            <span id="answerDate">
              Respondido: {formatDate(nps.answerDate)}
            </span>
          )}
        </NpsItem>
      )}
    </NpsContainer>
  );
}
