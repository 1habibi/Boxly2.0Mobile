import { useMutation, useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

import { ProfileService } from "@/src/services/profile/profile.service";

export const useGetCurrentProfile = () => {
	const { isLoading, data } = useQuery(["current-profile"], () =>
		ProfileService.getCurrentProfile()
	);

	return { data, isLoading };
};
