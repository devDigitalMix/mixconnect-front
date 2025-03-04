/* eslint-disable no-unused-vars */
import axios from "axios";
import Cookies from "js-cookie";
import { baseURL } from "./choreService.js";

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
