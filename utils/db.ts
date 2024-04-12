import axios from "axios";

export const apiUrl = "https://api.poktscan.com/poktscan/api/graphql";
export const authToken = "461fc459-6254-443c-939a-a84da4f495fb";

export const fetchData = async (query: string) => {
  const requestOptions = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: authToken,
      "Cache-Control": "no-store",
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
