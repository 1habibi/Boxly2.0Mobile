import { AntDesign } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";

import { useAuth } from "@/src/hooks/useAuth";

export default function TabLayout() {
	const userData = useAuth();
	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: "#E56427",
				tabBarLabelStyle: { fontSize: 12, fontWeight: 600 },
				headerTitleAlign: "center",
				headerShown: false,
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
				name="(auth)"
				options={{
					tabBarLabel: "Вход",
					headerTitle: "Авторизация",
					tabBarIcon: ({ color }) => (
						<AntDesign name="user" size={24} color={color} />
					),
					href: userData.user ? null : "/sign-in"
				}}
			/>
			<Tabs.Screen
				name="profile"
				options={{
					tabBarLabel: "Профиль",
					headerTitle: "Главная",
					tabBarIcon: ({ color }) => (
						<AntDesign name="user" size={24} color={color} />
					),
					href: userData.user ? "/profile" : null
				}}
			/>
		</Tabs>
	);
}
