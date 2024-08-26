/* eslint-disable no-unused-vars */
import axios from "axios";
import Cookies from "js-cookie";

// const baseURL = "http://localhost:3000";
const baseURL = "https://mixconnect-back.onrender.com";

export function getLoginsService() {
  const response = axios.get(`${baseURL}/clientLogin/`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });
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
