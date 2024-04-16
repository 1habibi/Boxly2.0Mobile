import { AntDesign } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";

export default function TabLayout() {
	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: "#E56427",
				tabBarLabelStyle: { fontSize: 12, fontWeight: 600 },
				headerTitleAlign: "center",
				headerShadowVisible: false,
				headerStyle: {
					backgroundColor: "transparent"
				}
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					tabBarLabel: "Главная",
					headerTitle: "Главная",
					tabBarIcon: ({ color }) => (
						<AntDesign name="home" size={24} color={color} />
					)
				}}
			/>
			<Tabs.Screen
				name="auth"
				options={{
					tabBarLabel: "Профиль",
					headerTitle: "Авторизация",
					tabBarIcon: ({ color }) => (
						<AntDesign name="user" size={24} color={color} />
					)
				}}
			/>
		</Tabs>
	);
}
