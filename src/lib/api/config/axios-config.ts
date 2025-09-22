import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();
export interface ApiConfig {
	baseURL: string;
	timeout: number;
	// withCredentials: boolean;
}

export const defaultApiConfig: ApiConfig = {
	baseURL:
		publicRuntimeConfig.NEXT_PUBLIC_API_URL_V2 ||
		"https://obac-api-dev.ekawit.ac.th/api/",
	timeout: 30000,
	// withCredentials: true,
};

export function createAxiosInstance(
	config: Partial<ApiConfig> = {}
): AxiosInstance {
	const finalConfig = { ...defaultApiConfig, ...config };

	const instance = axios.create({
		baseURL: finalConfig.baseURL,
		timeout: finalConfig.timeout,
		// withCredentials: finalConfig.withCredentials,
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
		},
	});

	return instance;
}

export const apiClient = createAxiosInstance();
