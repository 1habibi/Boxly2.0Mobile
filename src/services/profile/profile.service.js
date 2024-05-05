import { request } from "../api/request.api";

export const ProfileService = {
	async getAllProfiles() {
		const response = await request({
			url: "/profile",
			method: "GET"
		});
		console.log("response all profiles", response);
		return response;
	},
	async getCurrentProfile() {
		const response = await request({
			url: `/profile/current`,
			method: "GET"
		}).then(console.log("response get getCurrentProfile", response));
		return response;
	},
	async getProfileById(id) {
		const response = await request({
			url: `/profile/${id}`,
			method: "GET"
		});
		console.log("response get profile by user id", response);
		return response;
	},
	async updateProfile(data, id) {
		const response = await request({
			url: `/profile/${id}`,
			method: "PATCH",
			data
		});
		console.log("response updateProfile", response);
		return response;
	},
	async createProfile(data) {
		const response = await request({
			url: `/profile`,
			method: "POST",
			data
		});
		console.log("response createProfile", response);
		return response;
	}
};
