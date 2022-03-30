import axios from "axios";

import Cookies from "js-cookie";
import { ACCESS_TOKEN_COOKIE_NAME } from "../../constants";

const createAxiosHeaders = () => {

	const headers: Record<string, string> = {
		"Access-Control-Allow-Origin": "*",
		"Content-Type": "application/json",
	}

	const accessToken = Cookies.get(ACCESS_TOKEN_COOKIE_NAME);
	if (accessToken) {
		headers["Authorization"] = accessToken;
	}

	return headers;
}

export const API = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
	timeout: 5000,
	headers: createAxiosHeaders()
})