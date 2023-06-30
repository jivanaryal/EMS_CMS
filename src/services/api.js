import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/v1";

export const get = (url, params) => {
  return axios.get(API_BASE_URL + url, { params });
};

export const post = (url, data) => {
  return axios.post(API_BASE_URL + url, data);
};

export const getSingle = (url) => {
  return axios.get(API_BASE_URL + url);
};

export const remove = (url) => {
  return axios.delete(API_BASE_URL + url);
};

export const update = (url, data) => {
  return axios.patch(API_BASE_URL + url, data);
};
