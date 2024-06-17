import { Stack } from "expo-router";

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
