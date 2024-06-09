import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

import { OrderService } from "@/src/services/order/order.service";

export const useOrder = (userId = null, orderId = null) => {
	const {
		isLoading: isOrdersLoading,
		data: orders,
		refetch: refetchOrders
	} = useQuery(["user-orders"], () => OrderService.getUserOrders(userId), {
		enabled: !!userId // Запрос выполняется только если userId задан
	});

	const {
		isLoading: isOrderLoading,
		data: order,
		refetch: refetchOrder
	} = useQuery(["order-by-id"], () => OrderService.getOrderById(orderId), {
		enabled: !!orderId // Запрос выполняется только если orderId задан
	});

	return useMemo(
		() => ({
			isOrdersLoading,
			orders,
			isOrderLoading,
			order,
			refetchOrder,
			refetchOrders
		}),
		[
			isOrdersLoading,
			orders,
			isOrderLoading,
			order,
			refetchOrder,
			refetchOrders
		]
	);
};
