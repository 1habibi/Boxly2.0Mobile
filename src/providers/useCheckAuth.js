import { getItemAsync } from "expo-secure-store";
import { useEffect } from "react";

import { useAuth } from "../hooks/useAuth";
import { errorCatch } from "../services/api/error.api";
import { getNewTokens } from "../services/api/helper.auth";
import { getAccessToken } from "../services/auth/auth.helper";
import { AuthService } from "../services/auth/auth.service";

export const useCheckAuth = routeName => {
	const userData = useAuth();

	useEffect(() => {
		const checkAccessToken = async () => {
			const accessToken = await getAccessToken();
			if (accessToken) {
				try {
					await getNewTokens();
				} catch (e) {
					if (errorCatch(e) === "jwt expired") {
						await AuthService.logout();
						userData.setUser(null);
					}
				}
			}
		};

		checkAccessToken();
	}, []);

	useEffect(() => {
		const checkRefreshToken = async () => {
			const refreshToken = await getItemAsync("refresh_token");
			if (!refreshToken && userData.user) {
				await AuthService.logout();
				userData.setUser(null);
			}
		};

		checkRefreshToken();
	}, [routeName]);
};
