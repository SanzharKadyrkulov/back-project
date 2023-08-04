import axios from "axios";
import { BASE_URL } from "./consts";

const $axios = axios.create();

$axios.interceptors.request.use(
	async (config) => {
		const tokens = JSON.parse(localStorage.getItem("tokens"));
		if (tokens) {
			config.headers = {
				...config.headers,
				Authorization: `Bearer ${tokens.access}`,
			};
		}
		return config;
	},
	(error) => Promise.reject(error)
);

$axios.interceptors.response.use(
	(response) => response,
	async (error) => {
		const config = error.config;

		if (error.response) {
			if (error.response.status === 401 && !config._retry) {
				config._retry = true;
				const access = await refreshAccessToken();
				axios.defaults.headers.common["Authorization"] = `Bearer ${access}`;
				return $axios(config);
			}
		}

		return Promise.reject(error);
	}
);

async function refreshAccessToken() {
	try {
		const tokens = JSON.parse(localStorage.getItem("tokens"));

		if (tokens) {
			const { data } = await axios.post(`${BASE_URL}/account/refresh/`, {
				refresh: tokens.refresh,
			});
			localStorage.setItem(
				"tokens",
				JSON.stringify({
					access: data.access,
					refresh: tokens.refresh,
				})
			);
			return data.access;
		}
	} catch (error) {
		localStorage.removeItem("tokens");
	}
}

export default $axios;
