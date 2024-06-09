import { useMutation } from "@tanstack/react-query";
import { useMemo } from "react";

import { OrderService } from "@/src/services/order/order.service";

export const useDeleteOrder = () => {
	const { mutateAsync: deleteOrder, isLoading: isDeleteOrderLoading } =
		useMutation(["delete-order"], ({ id }) => OrderService.deleteOrder(id));

	return useMemo(
		() => ({
			deleteOrder,
			isDeleteOrderLoading
		}),
		[deleteOrder, isDeleteOrderLoading]
	);
};
