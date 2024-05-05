import Toast from "react-native-toast-message";

import { errorCatch } from "./error.api";
import instance from "./interceptors.api";

export const request = async config => {
	const onSuccess = res => {
		return res.data;
	};
	const onError = error => {
		Toast.show({
			type: "error",
			text1: "Ошибка запроса",
			text2: errorCatch(error)
		});
		return Promise.reject(error);
	};
	return instance(config).then(onSuccess).catch(onError);
};
