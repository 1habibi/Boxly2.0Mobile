import axios from "axios";
import { getItemAsync } from "expo-secure-store";

import { saveToStorage } from "../auth/auth.helper";

export const getNewTokens = async () => {
	try {
		const refreshToken = await getItemAsync("refresh_token");
		const response = await axios.post(
			process.env.EXPO_PUBLIC_BACKEND_BASE_URL + "/auth/refresh-tokens-mobile",
			{ refreshToken },
			{
				headers: {
					"Content-Type": "application/json"
				}
			}
		);
		console.log(response);
		if (response.data.accessToken) await saveToStorage(response.data);

		return response;
	} catch (e) {
		throw e;
	}
};
