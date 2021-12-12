import axios from "axios";

export const API = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
	timeout: 5000,
	headers: {
		"Access-Control-Allow-Origin": "*",
		"Content-Type": "application/json",
	},
})