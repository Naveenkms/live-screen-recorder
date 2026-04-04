import { getAccessToken } from "./server-functions";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const fetchApi = async (endpoint: string, options: RequestInit = {}) => {
  const { token } = await getAccessToken();

  const config = {
    ...options,
    headers: {
      ...options.headers,
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": "application/json",
    },
  };

  return fetch(`${BASE_URL}${endpoint}`, config);
};

export default fetchApi;
