import { useMutation } from "@tanstack/react-query";
import { useMemo } from "react";

import { OrderService } from "@/src/services/order/order.service";

export const useEditOrder = () => {
	const { mutateAsync: editOrder, isLoading: isEditOrderLoading } = useMutation(
		["edit-order"],
		({ orderData, id }) => OrderService.editOrder(orderData, id)
	);

	return useMemo(
		() => ({
			editOrder,
			isEditOrderLoading
		}),
		[editOrder, isEditOrderLoading]
	);
};
