import { GET_ALL_EMPLOYEES } from "./constants/urls";

export const getAllEmployees = async (
  page: number,
  page_size: number,
  cafeId: string | null
) => {
  var url: string = GET_ALL_EMPLOYEES + `?page=${page}&&page_size=${page_size}`;
  if (cafeId != null && cafeId != '' && cafeId != 'null') {
    url = url + `&&cafe=${cafeId}`;
  }
  const response = await fetch(url);
  return await response.json();
};
