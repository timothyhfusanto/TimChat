import axios from "axios";

export const axiosInstance = axios.create({
	baseURL: import.meta.env.MODE === "development" ? "https://timchat-oejh.onrender.com/api/" : "/api",
	withCredentials: true,
})