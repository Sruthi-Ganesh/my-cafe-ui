import {
  CREATE_CAFE,
  GET_ALL_CAFE_FILTER,
  GET_ALL_CAFES,
  UPDATE_LOGO,
} from "./constants/urls";

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

export const createCafe = async (data: any) => {
  const { file, ...rest } = data;
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(rest),
  };
  return fetch(CREATE_CAFE, requestOptions)
    .then((res) => res.json())
    .then((data) => {
      if (file != null || file != undefined) {
        let formData = new FormData();
        formData.append("logo", file);
        formData.append("id", data.id);

        const putOptions = {
          method: "PUT",
          body: formData,
        };
        return fetch(UPDATE_LOGO + data.id + "/", putOptions)
          .then((resp) => resp.json())
          .then((resp) => {
            return { ...data, logo: resp.logo };
          });
      } else {
        return data;
      }
    });
};

export const updateCafe = async (data: any) => {
  const { file, cafeId, ...rest } = data;
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(rest),
  };
  return fetch(CREATE_CAFE + cafeId + "/", requestOptions)
    .then((res) => res.json())
    .then((data) => {
      if (file != null || file != undefined) {
        let formData = new FormData();
        formData.append("logo", file);
        formData.append("id", data.id);

        const putOptions = {
          method: "PUT",
          body: formData,
        };
        return fetch(UPDATE_LOGO + data.id + "/", putOptions)
          .then((resp) => resp.json())
          .then((resp) => {
            return { ...data, logo: resp.logo };
          });
      } else {
        return data;
      }
    });
};

export const deleteCafe = async (data: any) => {
  const { cafeId } = data;
  const requestOptions = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  };
  return fetch(CREATE_CAFE + cafeId + "/", requestOptions);
};
