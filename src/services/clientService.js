import axios from "axios";
import Cookies from "js-cookie";

const baseURL = "http://localhost:3000";

export async function getAllClients() {
  const response = await axios.get(`${baseURL}/client/`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });
  return response;
}
