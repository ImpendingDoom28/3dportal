import axios from "axios";

import Cookies from "js-cookie";
import { ACCESS_TOKEN_COOKIE_NAME } from "../../constants";

export const API = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
	timeout: 5000,
	headers: {
		"Access-Control-Allow-Origin": "*",
		"Content-Type": "application/json",
	},
});
API.interceptors.request.use((config) => {
	const authHeaderValue = API.defaults.headers.common["Authorization"];
	const accessToken = Cookies.get(ACCESS_TOKEN_COOKIE_NAME);
	if (!authHeaderValue && accessToken && config.headers) {
		config.headers.Authorization = accessToken;
	}
	return config;
})
