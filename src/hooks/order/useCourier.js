import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

import { OrderService } from "@/src/services/order/order.service";

export const useCourier = courierId => {
	const {
		isLoading: isOrdersLoading,
		data: orders,
		refetch
	} = useQuery(["courier-orders"], () =>
		OrderService.getCourierOrders(courierId)
	);

	return useMemo(
		() => ({ isOrdersLoading, orders, refetch }),
		[isOrdersLoading, orders, refetch]
	);
};
