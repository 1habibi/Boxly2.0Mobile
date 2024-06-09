import { Redirect, Stack } from "expo-router";

import { useAuth } from "@/src/hooks/useAuth";

export default function MyOrdersLayout() {
	return (
		<Stack>
			<Stack.Screen
				name="index"
				options={{ title: "Я - Курьер", headerShown: false }}
			/>
		</Stack>
	);
}
