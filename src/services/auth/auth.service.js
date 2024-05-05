import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";

import {
	deleteTokensStorage,
	saveTokensStorage,
	saveToStorage
} from "./auth.helper";
import { request } from "../api/request.api";

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
