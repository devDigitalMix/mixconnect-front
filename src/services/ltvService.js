import axios from "axios";
import { baseURL } from "./choreService.js";
// import Cookies from "js-cookie";

export async function getLtvService() {
  const response = await axios.get(`${baseURL}/ltv/ltv`);
  return response;
}

export async function getCellService(range) {
  const response = await axios.get(`${baseURL}/ltv/range/${range}`);
  return response;
}

export async function getInfosService() {
  const response = await axios.get(`${baseURL}/ltv/info`);
  return response;
}
