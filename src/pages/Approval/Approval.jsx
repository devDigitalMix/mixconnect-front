import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ApprovalHeader, ApprovalStyled } from "./ApprovalStyled";
import { getApprovalById } from "../../services/approvalService";

export function Approval() {
  const { id } = useParams();
  const [approval, setApproval] = useState({});
  const [received, setReceived] = useState(false);
  const navigate = useNavigate();

  async function findApproval() {
    setReceived(false);
    const response = await getApprovalById(id);
    // response.data.approved = false;
    // response.data.denied = false;
    setApproval(response.data);
    setReceived(true);
  }

  useEffect(() => {
    findApproval();
  }, []);

  return (
    received && (
      <ApprovalStyled>
        {(approval.approved || approval.denied) && (
          <h4 className={approval.approved ? "approved" : "denied"}>
            {approval.approved ? "Aprovado" : "Rejeitado"}
          </h4>
        )}
        <ApprovalHeader>
          <img
            src="/voltar.svg"
            alt="voltar"
            title="Voltar"
            className="img-effect"
            id="voltar"
            onClick={() => navigate(-1)}
          />
          <h2>{approval.name}</h2>
          {!approval.approved && !approval.denied && (
            <button
              id="linkCliente"
              onClick={() => window.open(`/sendapproval/${id}`, "_blank")}
            >
              Link
            </button>
          )}
        </ApprovalHeader>

        <div className="images">
          {approval.item.map((imagem, index) => (
            <img key={index} src={imagem} alt="" />
          ))}
        </div>
        {approval.feedback && <p id="feedback">{approval.feedback}</p>}
      </ApprovalStyled>
    )
  );
}
