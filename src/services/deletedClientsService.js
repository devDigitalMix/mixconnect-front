import axios from "axios";
import Cookies from "js-cookie";

// const baseURL = "http://localhost:3000";
const baseURL = "https://mixconnect-back.onrender.com";

export async function getDeletedClientsService() {
  const response = await axios.get(`${baseURL}/deletedClient/`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });
  return response;
}

export async function getDeletedClientById(id) {
  const response = await axios.get(`${baseURL}/deletedClient/${id}`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });
  return response;
}

export async function recoverDeletedClient(id) {
  const response = await axios.post(
    `${baseURL}/deletedClient/recover/${id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    }
  );
  return response;
}
export async function deleteDeletedClient(id) {
  const response = await axios.delete(`${baseURL}/deletedClient/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });
  return response;
}
