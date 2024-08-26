/* eslint-disable no-unused-vars */
import axios from "axios";
import Cookies from "js-cookie";

// const baseURL = "http://localhost:3000";
const baseURL = "https://mixconnect-back.onrender.com";

export function signin(data) {
  const response = axios.post(`${baseURL}/auth/login`, data);
  return response;
}

export function userLogged() {
  const response = axios.get(`${baseURL}/employee/findById`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });
  return response;
}

export function getEmployeeById(id) {
  const response = axios.get(`${baseURL}/employee/${id}`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });
  return response;
}

export function getAllEmployees() {
  const response = axios.get(`${baseURL}/employee`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });
  return response;
}

export function getEmployeesByName(name) {
  const response = axios.get(`${baseURL}/employee/search?name=${name}`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });
  return response;
}

export function createEmployeeService(data) {
  const response = axios.post(`${baseURL}/employee/create`, data);
  return response;
}

export function updateEmployeeService(formData, id) {
  const response = axios.patch(`${baseURL}/employee/update/${id}`, formData, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });
  return response;
}

export function UpdateEmployeeAvatar(formData, id) {
  const response = axios.patch(`${baseURL}/employee/upload/${id}`, formData, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
}

export function deleteEmployee(id) {
  const response = axios.delete(`${baseURL}/employee/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });
  return response;
}

export async function createchore(id, data) {
  console.log(data);
  const response = await axios.patch(
    `${baseURL}/employee/${id}/createChore/`,
    data,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    }
  );
  return response;
}

export async function excludeChore(userId, choreId) {
  const response = await axios.patch(
    `${baseURL}/employee/deleteChore/${userId}/choreId/${choreId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    }
  );
}
