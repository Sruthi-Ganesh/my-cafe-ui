import { GET_ALL_COUNTRIES } from "./constants/urls";

export const getAllCountries = async () => {
  const response = await fetch(GET_ALL_COUNTRIES);
  return await response.json();
};
