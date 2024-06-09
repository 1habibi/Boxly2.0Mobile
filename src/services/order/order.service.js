import { request } from "../api/request.api";

export const OrderService = {
	async getUserOrders(id) {
		const response = await request({
			url: `/order/user/${id}`,
			method: "GET"
		});
		return response;
	},
	async getOrderById(id) {
		const response = await request({
			url: `/order/${id}/with-items`,
			method: "GET"
		});
		return response;
	},
	async createOrder(data) {
		const response = await request({
			url: `/order/create`,
			method: "POST",
			data
		});
		return response;
	},
	async editOrder(data, id) {
		const response = await request({
			url: `/order/${id}`,
			method: "PATCH",
			data
		});
		return response;
	},
	async deleteOrder(id) {
		const response = await request({
			url: `/order/${id}`,
			method: "DELETE"
		});
		return response;
	},
	async getCourierOrders(id) {
		const response = await request({
			url: `/order/courier/${id}`,
			method: "GET"
		});
		return response;
	}
};
