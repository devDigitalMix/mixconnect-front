/* eslint-disable no-unused-vars */
import axios from "axios";
import Cookies from "js-cookie";

const baseURL = "http://localhost:3000";

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

export function getAllEmployees() {
  const response = axios.get(`${baseURL}/employee`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });
  return response;
}

export function CreateEmployeeService(data) {
  const response = axios.post(`${baseURL}/employee/create`, data);
  return response;
}

export function UpdateEmployeeService(formData, id) {
  const response = axios.patch(`${baseURL}/employee/update/${id}`, formData, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });
  console.log(response);
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
