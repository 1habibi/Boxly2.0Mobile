import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

import { ProfileService } from "@/src/services/profile/profile.service";

export const useProfile = () => {
	const {
		isLoading: isProfileLoading,
		data: profile,
		refetch
	} = useQuery(["current-profile"], () => ProfileService.getCurrentProfile());

	return useMemo(
		() => ({
			profile,
			isProfileLoading
		}),
		[profile, isProfileLoading]
	);
};
