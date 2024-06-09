import { request } from "../api/request.api";

export const ProfileService = {
	async getAllProfiles() {
		const response = await request({
			url: "/profile",
			method: "GET"
		});
		return response;
	},
	async getCurrentProfile() {
		const response = await request({
			url: `/profile/current`,
			method: "GET"
		});
		return response;
	},
	async getProfileById(id) {
		const response = await request({
			url: `/profile/${id}`,
			method: "GET"
		});
		return response;
	},
	async updateProfile(data, id) {
		const response = await request({
			url: `/profile/${id}`,
			method: "PATCH",
			data
		});
		return response;
	},
	async createProfile(data) {
		const response = await request({
			url: `/profile`,
			method: "POST",
			data
		});
		return response;
	}
};
