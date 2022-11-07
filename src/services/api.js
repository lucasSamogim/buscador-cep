import axios from "axios";

// baseURL: https://viacep.com.br/ws/
// ROTA: 01310930/json/

const api = axios.create({
  baseURL: "https://viacep.com.br/ws/",
});

export default api;