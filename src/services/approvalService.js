import { baseURL } from "./choreService";
import axios from "axios";
import Cookies from "js-cookie";

export async function getApprovalByClient(id) {
  const response = await axios.get(`${baseURL}/approval/byClientsId/${id}`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });
  return response;
}

export async function createApprovalService(id, data) {
  const response = await axios.post(`${baseURL}/approval/create/${id}`, data, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
}

export async function getApprovalById(id) {
  const response = await axios.get(`${baseURL}/approval/${id}`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });
  return response;
}

export async function answerApproval(id, data) {
  const response = await axios.patch(
    `${baseURL}/approval/answerapproval/${id}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    }
  );
  return response;
}
