import axios from "axios";
import Cookies from "js-cookie";

// const baseURL = "http://localhost:3000";
const baseURL = "https://mixconnect-back.onrender.com";

export async function getAllClients(limit, offset) {
  const response = await axios.get(
    `${baseURL}/client/?limit=${limit}&offset=${offset}`,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    }
  );
  return response;
}

export async function createClientService(data) {
  const response = await axios.post(`${baseURL}/client/create`, data, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });
  return response;
}

export async function getClientById(id) {
  const response = await axios.get(`${baseURL}/client/${id}`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });
  return response;
}

export async function UpdateClientAvatar(formData, id) {
  const response = await axios.patch(
    `${baseURL}/client/upload/${id}`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response;
}

export async function updateClientService(formData, id) {
  const response = await axios.patch(
    `${baseURL}/client/update/${id}`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    }
  );
  return response;
}
export async function getClientsByName(name) {
  const response = await axios.get(`${baseURL}/client/search?name=${name}`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });
  return response;
}

export async function findClients(data) {
  const response = await axios.get(`${baseURL}/client/find`, {
    params: data,
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });
  return response;
}

export async function deleteClient(id) {
  const response = await axios.delete(`${baseURL}/client/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });
  return response;
}
