import axios from "axios";

import { errorCatch } from "./error.api";
import { getNewTokens } from "./helper.auth";
import { deleteTokensStorage, getAccessToken } from "../auth/auth.helper";

const instance = axios.create({
	baseURL: process.env.EXPO_PUBLIC_BACKEND_BASE_URL,
	headers: {
		"Content-Type": "application/json"
	},
	withCredentials: true
});

instance.interceptors.request.use(async config => {
	const accessToken = await getAccessToken();
	console.log("AccessToken form request", accessToken);
	if (config && accessToken) {
		config.headers.Authorization = accessToken;
	}
	return config;
});

instance.interceptors.request.use(
	config => config,
	async error => {
		const originalRequest = error.config;
		if (
			(error.response.status === 401 ||
				errorCatch(error) === "jwt expired" ||
				errorCatch(error) === "jwt must be provided") &&
			error.config &&
			!error.config._isRetry
		) {
			originalRequest._isRetry = true;
			try {
				await getNewTokens();
				return instance.request(originalRequest);
			} catch (e) {
				if (errorCatch(e) === "jwt expired") await deleteTokensStorage();
			}
		}
		throw error;
	}
);

export default instance;
