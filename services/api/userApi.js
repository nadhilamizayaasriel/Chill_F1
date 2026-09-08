import axios from "axios";

const API_URL = import.meta.env.VITE_API_USERS;

export async function getUsers() {
  const response = await axios.get(API_URL);
  return response.data;
}

export async function addUser(userData) {
  const response = await axios.post(API_URL, userData);
  return response.data;
}

export async function updateUser(id, userData) {
  const response = await axios.put(
    `${API_URL}/${id}`,
    userData,
  );
  return response.data;
}

export async function deleteUser(id) {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
}