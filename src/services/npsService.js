import axios from "axios";
import { baseURL } from "./choreService.js";
import Cookies from "js-cookie";

export function createNpsService(data) {
  const response = axios.post(`${baseURL}/nps/create`, data, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });

  return response;
}

export function findNpsById(id) {
  const response = axios.get(`${baseURL}/nps/${id}`);
  return response;
}

export async function updateNps(id, data) {
  const response = await axios.patch(`${baseURL}/nps/update/${id}`, data);
  return response;
}

export async function getNpsByClient(id) {
  const response = await axios.get(`${baseURL}/nps/getNps?id=${id}`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });
  return response;
}
export async function getAllNps(limit, offset) {
  const response = await axios.get(
    `${baseURL}/nps/?limit=${limit}&offset=${offset}`,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    }
  );
  return response;
}

export async function getNpsByClientsName(name) {
  const response = await axios.get(`${baseURL}/nps/byClientsName/${name}`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });
  return response;
}
