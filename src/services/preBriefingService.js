import axios from "axios";
import { baseURL } from "./choreService.js";
import Cookies from "js-cookie";

export function preBriefingIA(data) {
  const response = axios.post(`${baseURL}/preBriefing/textoIA`, data, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });

  return response;
}

export function savePrebriefing(data) {
  const response = axios.post(`${baseURL}/preBriefing/create`, data, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });

  return response;
}

export function getPrebriefingService(id) {
  const response = axios.get(`${baseURL}/preBriefing/${id}`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });

  return response;
}
