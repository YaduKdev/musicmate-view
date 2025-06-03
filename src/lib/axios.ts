import axios from "axios";

export const apiCaller = axios.create({
  baseURL: "http://localhost:5000/api",
});
