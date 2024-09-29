import { GET_ALL_CAFE_FILTER, GET_ALL_CAFES } from "./constants/urls";

export const getAllCafes = async (
  page: number,
  page_size: number,
  location: string | null
) => {
  var url: string = GET_ALL_CAFES + `?page=${page}&&page_size=${page_size}`;
  if (location != null && location != "" && location != "null") {
    url = url + `&&location=${location}`;
  }
  const response = await fetch(url);
  return await response.json();
};

export const getAllCafeFilter = async () => {
  const response = await fetch(GET_ALL_CAFE_FILTER);
  return await response.json();
};
