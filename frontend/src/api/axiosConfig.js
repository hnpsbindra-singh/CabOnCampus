import axios from "axios";

const api = axios.create({
  baseURL: "https://cab-on-campus-ioh3.vercel.app/", // your backend URL
});

export default api;

