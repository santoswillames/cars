import axios from "axios";
import { AppErrors } from "../utils/AppErrors";

// Função para criar instância do axios com base na URL dinâmica
const createApi = (login = false) => {
  const baseURL = login
    ? "https://test-api-y04b.onrender.com"
    : "https://parallelum.com.br/fipe/api/v1/carros";

  return axios.create({
    baseURL,
  });
};

const apiBrands = createApi();
const apiLogin = createApi(true);

apiLogin.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response && error.response.data) {
      return Promise.reject(new AppErrors(error.response.data.message));
    } else {
      return Promise.reject(error);
    }
  }
);

apiBrands.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response && error.response.data) {
      return Promise.reject(new AppErrors(error.response.data.message));
    } else {
      return Promise.reject(
        new AppErrors("Erro no servidor. Tente novamente mais tarde.")
      );
    }
  }
);

export { apiBrands, apiLogin };
