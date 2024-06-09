import { useMutation } from "@tanstack/react-query";
import { useMemo } from "react";

import { OrderService } from "@/src/services/order/order.service";

export const useCreateOrder = () => {
	const { mutateAsync: createOrder, isLoading: isCreateOrderLoading } =
		useMutation(["create-order"], data => OrderService.createOrder(data));

	return useMemo(
		() => ({
			createOrder,
			isCreateOrderLoading
		}),
		[createOrder, isCreateOrderLoading]
	);
};
