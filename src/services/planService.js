/* eslint-disable no-unused-vars */
import axios from "axios";
import Cookies from "js-cookie";
import { baseURL } from "./choreService.js";

export function getPlansService() {
  const response = axios.get(`${baseURL}/plan/`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });
  return response;
}

export function getPlanById(id) {
  const response = axios.get(`${baseURL}/plan/${id}`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });
  return response;
}

export function updatePlanService(id, data) {
  const response = axios.patch(`${baseURL}/plan/update/${id}`, data, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });
  return response;
}

export function createPlanService(data) {
  const response = axios.post(`${baseURL}/plan/create`, data, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });
  return response;
}

export function excludePlanService(id) {
  const response = axios.delete(`${baseURL}/plan/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });
  return response;
}
