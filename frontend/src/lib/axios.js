import axios from "axios";

const axiosInstance = axios.create({
	baseURL: import.meta.mode === "development"
		? "http://localhost:5000/api"
		: `${import.meta.env.VITE_API_BASE_URL}/api`,
	withCredentials: true, // send cookies to the server
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
	failedQueue.forEach(prom => {
		if (error) {
			prom.reject(error);
		} else {
			prom.resolve(token);
		}
	});
	failedQueue = [];
};

axiosInstance.interceptors.response.use(
	response => response,
	error => {
		const originalRequest = error.config;

		if (
			error.response?.status === 401 &&
			!originalRequest._retry &&
			!originalRequest.url.includes("/refreshToken")
		) {
			if (isRefreshing) {
				return new Promise(function (resolve, reject) {
					failedQueue.push({ resolve, reject });
				})
					.then(() => {
						return axiosInstance(originalRequest);
					})
					.catch(err => {
						return Promise.reject(err);
					});
			}

			originalRequest._retry = true;
			isRefreshing = true;

			return new Promise((resolve, reject) => {
				axiosInstance
					.post("/refreshToken")
					.then(() => {
						processQueue(null);
						resolve(axiosInstance(originalRequest));
					})
					.catch(err => {
						processQueue(err);
						reject(err);
					})
					.finally(() => {
						isRefreshing = false;
					});
			});
		}

		return Promise.reject(error);
	}
);

export default axiosInstance;
