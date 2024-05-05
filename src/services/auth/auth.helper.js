import AsyncStorage from "@react-native-async-storage/async-storage";
import { deleteItemAsync, getItemAsync, setItemAsync } from "expo-secure-store";

export const getAccessToken = async () => {
	const accessToken = await getItemAsync("access_token");
	return accessToken || null;
};

export const saveTokensStorage = async tokens => {
	await setItemAsync("access_token", tokens.accessToken);
	await setItemAsync("refresh_token", tokens.refreshToken);
};

export const deleteTokensStorage = async () => {
	await deleteItemAsync("access_token");
	await deleteItemAsync("refresh_token");
};

export const getUserFromStorage = async () => {
	try {
		return JSON.parse((await AsyncStorage.getItem("user")) || "{}");
	} catch (e) {
		return null;
	}
};

export const saveToStorage = async data => {
	await saveTokensStorage(data);
	try {
		return AsyncStorage.setItem("user", JSON.stringify(data.user));
	} catch {}
};
