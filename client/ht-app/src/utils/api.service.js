import axios from "axios";
import { SERVER_URL } from "./environment";

const api = axios.create({
  baseURL: SERVER_URL,
  timeout: 5000,
});

export const getData = async (path) => {
  const res = await api.get(path);

  return res.data;
};

export const putData = async (path, data = {}) => {
  const res = await api.put(path, data);

  return res.data;
};
