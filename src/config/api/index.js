import { API_ENDPOINT } from "../dataService/dataService";

const BASE_URL = API_ENDPOINT;
console.log(BASE_URL);
const API = {
  manufacture: `${BASE_URL}/manufacture`,
  suplliers: `${BASE_URL}/suppliers`,
  stocks:`${BASE_URL}/stocks`,
  common:`${BASE_URL}/common`,
  contacts:`${BASE_URL}/contacts`,

};

export { API };
