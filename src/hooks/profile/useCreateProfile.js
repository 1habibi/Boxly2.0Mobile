import { useMutation } from "@tanstack/react-query";
import { useMemo } from "react";
import Toast from "react-native-toast-message";

import { ProfileService } from "@/src/services/profile/profile.service";

export const useCreateProfile = () => {
	const { mutateAsync: createProfile, isLoading: isCreateProfileLoading } =
		useMutation(
			["create-profile"],
			data => ProfileService.createProfile(data),
			{
				onSuccess: async () => {
					Toast.show({
						type: "success",
						text1: "Создание профиля",
						text2: "Профиль успешно создан"
					});
				}
			}
		);

	return useMemo(
		() => ({
			createProfile,
			isCreateProfileLoading
		}),
		[createProfile, isCreateProfileLoading]
	);
};
