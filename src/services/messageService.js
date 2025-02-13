/* eslint-disable no-unused-vars */
import axios from "axios";
import Cookies from "js-cookie";

const baseURL = "http://localhost:3000";
// const baseURL = "https://mixconnect-back.onrender.com";

export function getMessageService() {
  const response = axios.get(`${baseURL}/message/`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });
  return response;
}

export function createMessageService(data) {
  const response = axios.post(`${baseURL}/message/create`, data, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });
  return response;
}
