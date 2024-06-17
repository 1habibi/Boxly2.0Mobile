import { Stack } from "expo-router";

export default function MyOrdersLayout() {
	return (
		<Stack>
			<Stack.Screen
				name="index"
				options={{ title: "Мои заказы", headerShown: false }}
			/>
			<Stack.Screen
				name="[id]"
				options={{ title: "Подробности заказа", headerShown: false }}
			/>
			<Stack.Screen
				name="new"
				options={{ title: "Новый заказ", headerShown: false }}
			/>
			<Stack.Screen
				name="newQR"
				options={{ title: "Загрузка штрих-кода", headerShown: false }}
			/>
		</Stack>
	);
}
