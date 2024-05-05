import * as SplashScreen from "expo-splash-screen";
import React, { createContext, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

import {
	getAccessToken,
	getUserFromStorage
} from "../services/auth/auth.helper";

export const AuthContext = createContext({});
SplashScreen.preventAutoHideAsync();

const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);

	useEffect(() => {
		let isMounted = true;
		const checkAccessToken = async () => {
			try {
				const accessToken = await getAccessToken();
				if (accessToken) {
					const user = await getUserFromStorage();
					if (isMounted) {
						console.log("User from AuthProvider", user);
						setUser(user);
					}
				}
			} catch (e) {
			} finally {
				await SplashScreen.hideAsync();
			}
		};
		checkAccessToken();
		return () => {
			isMounted = false;
		};
	}, []);

	return (
		<AuthContext.Provider value={{ user, setUser }}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
