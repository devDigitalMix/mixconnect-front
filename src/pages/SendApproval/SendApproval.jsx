import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  ApprovalForm,
  ApprovalRespondido,
  SendApprovalHeader,
  SendApprovalStyled,
} from "./SendApprovalStyled";
import {
  answerApproval,
  getApprovalById,
} from "../../services/approvalService";

export function SendApproval() {
  const { id } = useParams();
  const [approval, setApproval] = useState({});
  const [received, setReceived] = useState(false);
  const [denied, setDenied] = useState(false);
  const [approved, setApproved] = useState(false);

  async function findApproval() {
    setReceived(false);
    const response = await getApprovalById(id);
    setApproval(response.data);
    setReceived(true);
  }

  async function handleForm(event) {
    event.preventDefault();
    const formdata = new FormData(event.target);
    const data = Object.fromEntries(formdata.entries());
    if (denied && data.feedback.trim() == "") {
      alert("Preencha o motivo da rejeição.");
      return;
    }
    if (denied && data.feedback.trim() !== "" && data.feedback.length <= 10) {
      alert("Escreva um motivo válido. ex: Não gostei da foto!");
      return;
    }
    data.denied = denied;
    data.approved = approved;
    try {
      const response = await answerApproval(id, data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    findApproval();
  }, []);

  return (
    received &&
    (!approval.answerDate ? (
      <SendApprovalStyled>
        <SendApprovalHeader>
          <h2>{approval.name}</h2>
        </SendApprovalHeader>
        <div className="images">
          {approval.item.map((imagem, index) => (
            <img key={index} src={imagem} alt="" />
          ))}
        </div>
        <ApprovalForm onSubmit={handleForm}>
          <textarea
            name="feedback"
            id="feedback"
            placeholder="FeedBack"
          ></textarea>
          <div className="approvalBtns">
            <button
              type="submit"
              onClick={() => {
                setDenied(true);
                setApproved(false);
              }}
              className="btn danger"
            >
              Rejeitar
            </button>
            <button
              type="submit"
              onClick={() => {
                setApproved(true);
                setDenied(false);
              }}
              className="btn"
            >
              Aprovar
            </button>
          </div>
        </ApprovalForm>
      </SendApprovalStyled>
    ) : (
      <ApprovalRespondido>
        <p id="respondido">Obrigado por responder!</p>
      </ApprovalRespondido>
    ))
  );
}
