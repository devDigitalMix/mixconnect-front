import axios from "axios";
// import Cookies from "js-cookie";

// const baseURL = "http://localhost:3000";
const baseURL = "https://mixconnect-back.onrender.com";

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
