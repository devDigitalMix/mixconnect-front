/* eslint-disable no-unused-vars */
import axios from "axios";
import Cookies from "js-cookie";
import { baseURL } from "./choreService.js";

export function getLoginsService() {
  const response = axios.get(`${baseURL}/clientLogin/`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });
  return response;
}

export async function getLoginById(id) {
  const response = await axios.get(`${baseURL}/clientLogin/${id}`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });
  return response;
}

export async function searchLogins(data) {
  const response = await axios.get(
    `${baseURL}/clientLogin/search?client=${data}`,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    }
  );
  return response;
}

export function createLogin(data) {
  const response = axios.post(`${baseURL}/clientLogin/create/`, data, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });
  return response;
}

export function updateLogin(data, id) {
  const response = axios.patch(`${baseURL}/clientLogin/update/${id}`, data, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });
  return response;
}

export function deleteLoginService(id) {
  const response = axios.delete(`${baseURL}/clientLogin/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });
  return response;
}
