import AsyncStorage from "@react-native-async-storage/async-storage";

import { request } from "../api/request.api";
import { deleteTokensStorage, saveToStorage } from "./auth.helper";

export const AuthService = {
	async main(variant, email, password) {
		const response = await request({
			url: `/auth/${variant === "reg" ? "register" : "login-mobile"}`,
			method: "POST",
			data: { email, password }
		});
		if (response.accessToken) await saveToStorage(response);
		return response;
	},
	async logout() {
		await deleteTokensStorage();
		await AsyncStorage.removeItem("user");
	}
};
