/* eslint-disable no-unused-vars */
import axios from "axios";
import Cookies from "js-cookie";

const baseURL = "http://localhost:3000";
// const baseURL = "https://mixconnect-back.onrender.com";

export async function getChoreById(id) {
  const response = await axios.get(`${baseURL}/chore/${id}`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });
  return response;
}

export async function createTaskService(id, data) {
  await axios.patch(`${baseURL}/chore/${id}/createTask`, data, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });
}

export async function updateTaskService(choreId, taskId, data) {
  await axios.patch(
    `${baseURL}/chore/update/${choreId}/taskId/${taskId}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    }
  );
}

export async function changeTaskService(choreId, taskId, task2Id, data) {
  const response = await axios.patch(
    `${baseURL}/chore/change/${choreId}/taskId/${taskId}/task2Id/${task2Id}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    }
  );
  return response;
}

export async function deleteTaskService(choreId, taskId) {
  const response = await axios.patch(
    `${baseURL}/chore/delete/${choreId}/taskId/${taskId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    }
  );
}

export async function updateChoreTitleService(id, data) {
  const response = await axios.patch(`${baseURL}/chore/update/${id}`, data, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });
  return response;
}
