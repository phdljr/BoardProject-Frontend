import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_SERVER_HOST,
});

instance.interceptors.response.use(
  (response) => response,
  (response) => {
    if (response.status >= 400) console.error("요청 에러입니다.");
    if (response.status >= 500) console.error("서버 에러입니다.");
  }
);

export default instance;
