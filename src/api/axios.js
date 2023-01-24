import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_HOST,
});

instance.interceptors.response.use((response) => {
  if (response.status >= 400) console.error("요청 에러입니다.");
});

export default instance;
