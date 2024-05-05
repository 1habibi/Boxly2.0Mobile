import { Redirect, Stack } from "expo-router";

import { useAuth } from "@/src/hooks/useAuth";

export default function AuthLayout() {
	const { user } = useAuth();

	if (user) {
		return <Redirect href="/" />;
	}

	return (
		<Stack>
			<Stack.Screen
				name="sign-in"
				options={{ title: "Вход", headerShown: false }}
			/>
			<Stack.Screen
				name="sign-up"
				options={{ title: "Регистрация", headerShown: false }}
			/>
		</Stack>
	);
}
