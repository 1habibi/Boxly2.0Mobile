import { useMutation, useQuery } from "@tanstack/react-query";
import { Button } from "@ui-kitten/components";
import { useRouter } from "expo-router";
import { deleteItemAsync, getItemAsync } from "expo-secure-store";
import React from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";

import Loader from "@/src/components/Loader";
import { useGetCurrentProfile } from "@/src/hooks/profile/useGetCurrentProfile";
import { useAuth } from "@/src/hooks/useAuth";
import { AuthService } from "@/src/services/auth/auth.service";
import { ProfileService } from "@/src/services/profile/profile.service";

const Profile = () => {
	const { setUser } = useAuth();
	const router = useRouter();
	const { data, isLoading } = useGetCurrentProfile();
	console.log("profile", data);
	if (isLoading) return <Loader />;
	return (
		<View>
			{/* <Pressable onPress={() => deleteItemAsync("access_token")}>
				<Text className="text-white">Clear accessToken</Text>
			</Pressable>
			<Pressable onPress={() => deleteItemAsync("refresh_token")}>
				<Text className="text-white">Clear refreshToken</Text>
			</Pressable>
			<Pressable
				onPress={() =>
					getItemAsync("access_token").then(data => console.log(data))
				}
			>
				<Text className="text-white">Show accessToken</Text>
			</Pressable>
			<Pressable
				onPress={() =>
					getItemAsync("refresh_token").then(data => console.log(data))
				}
			>
				<Text className="text-white">Show refreshToken</Text>
			</Pressable> */}
			<View>
				<Text>{JSON.stringify(data)}</Text>
				<Button>BUTTON</Button>
			</View>
			<Pressable
				onPress={() => {
					AuthService.logout().then(() => {
						setUser(null);
						router.replace("/sign-in");
					});
				}}
			>
				<Text className="top-6 text-xl">Выйти</Text>
			</Pressable>
		</View>
	);
};

export default Profile;
