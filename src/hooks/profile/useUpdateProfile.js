import { useMutation } from "@tanstack/react-query";
import { useMemo } from "react";
import Toast from "react-native-toast-message";

import { ProfileService } from "@/src/services/profile/profile.service";

export const useUpdateProfile = () => {
	const { mutateAsync: updateProfile, isLoading: isUpdateProfileLoading } =
		useMutation(
			["update-profile"],
			({ data, id }) => ProfileService.updateProfile(data, id),
			{
				onSuccess: async () => {
					Toast.show({
						type: "success",
						text1: "Обновление профиля",
						text2: "Профиль успешно обновлен"
					});
				}
			}
		);

	return useMemo(
		() => ({
			updateProfile,
			isUpdateProfileLoading
		}),
		[updateProfile, isUpdateProfileLoading]
	);
};
