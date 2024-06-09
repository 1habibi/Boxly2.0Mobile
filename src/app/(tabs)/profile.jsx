import { Button, Icon } from "@rneui/themed";
import { useRouter } from "expo-router";
import React from "react";
import { View, Text } from "react-native";

import Loader from "@/src/components/Loader";
import ProfileForm from "@/src/components/profile-form/ProfileForm";
import { useProfile } from "@/src/hooks/profile/useProfile";
import { useAuth } from "@/src/hooks/useAuth";
import { AuthService } from "@/src/services/auth/auth.service";

const Profile = () => {
	const { setUser } = useAuth();
	const router = useRouter();
	const { profile, isProfileLoading, refetch } = useProfile();

	if (isProfileLoading) return <Loader />;

	return (
		<View className="mt-10 mb-2 mx-2 h-full flex-1 justify-between">
			<Text className="text-5xl font-bold">
				Мой {"\n"}
				<Text className="text-primary">профиль</Text>{" "}
			</Text>
			{profile ? (
				<ProfileForm refetch={refetch} mode="update" profile={profile} />
			) : (
				<ProfileForm refetch={refetch} mode="create" />
			)}
			<View className="w-5/12">
				<Button
					onPress={() => {
						AuthService.logout().then(() => {
							setUser(null);
							router.replace("/sign-in");
						});
					}}
					containerStyle={{ borderRadius: 10 }}
				>
					Выйти
					<Icon
						iconStyle={{ marginLeft: 10 }}
						color="#FFF"
						name="exit-outline"
						type="ionicon"
					/>
				</Button>
			</View>
		</View>
	);
};

export default Profile;
