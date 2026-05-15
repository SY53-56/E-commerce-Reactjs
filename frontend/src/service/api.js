
import axios from "axios";

const API = axios.create({
  baseURL: "https://e-commerce-reactjs-qvoc.onrender.com",
  withCredentials: true,
});

export default API;
