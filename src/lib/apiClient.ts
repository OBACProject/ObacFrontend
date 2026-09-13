import axios, { AxiosInstance } from "axios";
import Cookies from "js-cookie";

const API_BASE_URL =
	process.env.NEXT_PUBLIC_API_URL_V2 || "https://obac-api-dev.ekawit.ac.th/api";
const apiClient: AxiosInstance = axios.create({
	baseURL: API_BASE_URL,
	timeout: 10000,
});

// This interceptor used to be commented out, so every "use server"-less
// route file under src/api/**/route.ts that relies on this client (instead
// of manually attaching a token) sent requests with no Authorization header
// at all and silently failed auth on the backend.
apiClient.interceptors.request.use((config) => {
	const token = Cookies.get("token");
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

export default apiClient;
