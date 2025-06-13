/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { Input } from "../../components/Input/Input";
import {
  createPropostaService,
  findPropostaById,
  updatePropostaService,
} from "../../services/propostaService";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { getPlansService } from "../../services/planService";
import { userLogged } from "../../services/employeeService";
import { UserContext } from "../../Context/UserContent";
import { PropostaContainer } from "../PropostaCreate/PropostaCreateStyled";
import { createClientService } from "../../services/clientService";
import { PreBriefingContainer } from "./CreatePreBriefingStyled";

export function CreateClient() {
  const [received, setReceived] = useState(false);
  const [proposta, setProposta] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  async function handleCreatePreBriefing(event) {}

  async function getProposta() {
    const response = await findPropostaById(id);

    setProposta(response.data);
    setReceived(true);
  }

  useEffect(() => {
    getProposta();
  }, []);

  return received ? (
    <PreBriefingContainer onSubmit={handleCreatePreBriefing}>
      <input type="text" value={proposta.name} />
      <input type="text" />
    </PreBriefingContainer>
  ) : null;
}
