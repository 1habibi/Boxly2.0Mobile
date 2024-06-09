import { AntDesign } from "@expo/vector-icons";
import { Icon } from "@rneui/themed";
import { Tabs } from "expo-router";
import React from "react";

import { useAuth } from "@/src/hooks/useAuth";

export default function TabLayout() {
	const userData = useAuth();
	console.log(userData);
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
				name="orders"
				options={{
					tabBarLabel: "Мои заказы",
					headerTitle: "Мои заказы",
					tabBarIcon: ({ color }) => (
						<AntDesign name="shoppingcart" size={24} color={color} />
					),
					href: userData.user ? "/orders" : null
				}}
			/>
			<Tabs.Screen
				name="courier-menu"
				options={{
					tabBarLabel: "Я - Курьер",
					headerTitle: "Я - Курьер",
					tabBarIcon: ({ color }) => (
						<Icon
							name="delivery-dining"
							type="material"
							size={24}
							color={color}
						/>
					),
					href: userData.user?.roles.includes("COURIER")
						? "/courier-menu"
						: null
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
					headerTitle: "Профиль",
					tabBarIcon: ({ color }) => (
						<AntDesign name="user" size={24} color={color} />
					),
					href: userData.user ? "/profile" : null
				}}
			/>
		</Tabs>
	);
}
