/* eslint-disable no-unused-vars */
import axios from "axios";
import Cookies from "js-cookie";
import { baseURL } from "./choreService.js";

export function createPropostaService(data) {
  const response = axios.post(`${baseURL}/proposta/create`, data, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });
  return response;
}

export function findPropostaById(id) {
  const response = axios.get(`${baseURL}/proposta/${id}`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });
  return response;
}

export function answerProposta(id, data) {
  const response = axios.patch(`${baseURL}/proposta/answer/${id}`, data, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });
  return response;
}
