import axios from "axios";

export const apiUrl = process.env.API_POKT || "";
export const authToken = process.env.TOKEN_POKT || "";

export const fetchData = async (query: string) => {
  const requestOptions = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: authToken,
      'Cache-Control': 'public, max-age=600',
    },
  };

  try {
    const response = await axios.post(apiUrl, { query }, requestOptions);
    return response.data.data;
  } catch (error) {
    console.error("There was a problem with your fetch operation:", error);
    throw error;
  }
};
