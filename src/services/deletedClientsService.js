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
