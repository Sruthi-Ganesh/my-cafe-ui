import { CREATE_EMPLOYEE, GET_ALL_EMPLOYEES } from "./constants/urls";

const getURL = (page: number, page_size: number) => {
  const {server_pagination} = process.env;
  let url: string;
  if (server_pagination === "true") {
    url = GET_ALL_EMPLOYEES + `?page=${page}&&page_size=${page_size}`;
  } else {
    url = GET_ALL_EMPLOYEES;
  }

  return url;
};

export const getAllEmployees = async (
  page: number,
  page_size: number,
  cafeId: string | null
) => {
  var url: string = getURL(page, page_size);
  if (cafeId != null && cafeId != '' && cafeId != 'null') {
    url = url + `&&cafe=${cafeId}`;
  }
  const response = await fetch(url);
  return await response.json();
};


export const createEmployee = async (data: any) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  return fetch(CREATE_EMPLOYEE, requestOptions)
    .then((res) => res.json())
}

export const updateEmployee = async (data: any) => {
  const {empId} = data;
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  return fetch(CREATE_EMPLOYEE + empId + "/", requestOptions)
    .then((res) => res.json())
}

export const deleteEmployee = async (data: any) => {
  const {empId} = data;
  const requestOptions = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  };
  return fetch(CREATE_EMPLOYEE + empId + "/", requestOptions);
}