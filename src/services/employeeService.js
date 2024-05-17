/* eslint-disable no-unused-vars */
import axios from "axios";

const baseURL = "http://localhost:3000";

export function getAllEmployees() {
  const response = axios.get(`${baseURL}/employee`);
  return response;
}

export function CreateEmployeeService(data) {
  const response = axios.post(`${baseURL}/employee/create`, data);
  return response;
}

export function UpdateEmployeeService(formData, id) {
  const response = axios.patch(`${baseURL}/employee/update/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
}

export function deleteEmployee(id) {
  const response = axios.delete(`${baseURL}/employee/delete/${id}`);
  return response;
}
