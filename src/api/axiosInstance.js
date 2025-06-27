import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api.freeapi.app/api/v1/public",
  headers: {
    Accept: "application/json",
  },
});

export default axiosInstance;
