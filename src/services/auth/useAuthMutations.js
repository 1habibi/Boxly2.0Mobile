import { useMutation } from "@tanstack/react-query";
import { isLoading } from "expo-font";
import { useMemo } from "react";
import Toast from "react-native-toast-message";

import { AuthService } from "./auth.service";
import { useAuth } from "../../hooks/useAuth";

export const useAuthMutations = reset => {
	const { setUser } = useAuth();
	const { mutate: loginSync, isLoading: isLoginLoading } = useMutation(
		["login-mobile"],
		data => {
			return AuthService.main("login", data.email, data.password);
		},
		{
			onSuccess(data) {
				reset();
				Toast.show({
					type: "success",
					text1: "Успешный вход",
					text2: ""
				});
				setUser(data.user);
			}
		}
	);

	const { mutate: registerSync, isLoading: isRegisterLoading } = useMutation(
		["register"],
		data => {
			return AuthService.main("reg", data.email, data.password);
		},
		{
			onSuccess(data) {
				reset();
			}
		}
	);

	return useMemo(
		() => ({
			loginSync,
			registerSync,
			isLoading: isLoginLoading || isRegisterLoading
		}),
		[isLoginLoading, isRegisterLoading]
	);
};
