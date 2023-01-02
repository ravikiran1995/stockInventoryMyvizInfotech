import { API_ENDPOINT } from "../dataService/dataService";

const BASE_URL = API_ENDPOINT;
console.log(BASE_URL);
const API = {
  manufacture: `${BASE_URL}/manufacture`,
  suplliers: `${BASE_URL}/suppliers`,
};

export { API };
