/* eslint-disable no-unused-vars */
import { useParams } from "react-router-dom";
import { SendNpsContainer, SendNpsContent } from "./SendNpsStyled";
import { useEffect, useState } from "react";
import { findNpsById, updateNps } from "../../services/npsService";
import { Input } from "../../components/Input/Input";
import { Label } from "../../components/Label/Label";

export function SendNps() {
  const { id } = useParams();
  const [nps, setNps] = useState();
  const [received, setReceived] = useState(false);

  async function getNpsById() {
    setReceived(false);
    const response = await findNpsById(id);
    setNps(response.data);
    setReceived(true);
  }

  async function handleNps(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    const ratingsEntries = [...formData.entries()]
      .filter(([key]) => key.startsWith("rating_"))
      .map(([_, value]) => Number(value.slice(1)));

    const updatedRatings = nps.ratings.map((rating, index) => ({
      desc: rating.desc,
      value: ratingsEntries[index] || null,
    }));

    const feedback = formData.get("feedback") || "";

    const data = {
      ratings: updatedRatings,
      feedback,
    };

    const response = await updateNps(id, data);
    if (response.data) {
      console.log(response.data);
      getNpsById();
    }
    // console.log(data);
  }

  useEffect(() => {
    getNpsById();
  }, []);

  return (
    <SendNpsContainer>
      {received ? (
        nps.ok ? (
          <div>
            <h2>Obrigado por responder!</h2>
          </div>
        ) : (
          <SendNpsContent onSubmit={handleNps}>
            <h2>{nps.clientName}</h2>
            <h3>{nps.name}</h3>
            {nps.ratings.map((rating, index) => (
              <div key={index} className="guarda-rating">
                <label htmlFor={"pontuacao" + index}>{rating.desc}</label>
                <div className="pontuacao">
                  {[...Array(10)].map((_, num) => {
                    const value = `${index}${num + 1}`;
                    return (
                      <div className="uma-pontuacao" key={value}>
                        <div>
                          {num + 1}
                          <input
                            type="radio"
                            name={`rating_${index}`}
                            value={value}
                            id={value}
                          />
                          <div className="custom-radio"></div>
                        </div>
                        <label htmlFor={value}>
                          <img
                            src={`/${num + 1}.png`}
                            draggable="false"
                            alt={value}
                          />
                        </label>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
            <div>
              <Label htmlFor="feedback" text="FeedBack" />
              <textarea name="feedback" id="feedback"></textarea>
            </div>

            <button type="submit" className="btn">
              Enviar
            </button>
          </SendNpsContent>
        )
      ) : null}
    </SendNpsContainer>
  );
}
