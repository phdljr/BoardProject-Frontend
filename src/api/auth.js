import axios from "./axios";

/**
 *
 * @param {{nickname: string, email: string, password: string}} user
 * @returns {{memberId: number, nickname: string, memberType: number}}
 */
const register = async (user) => {
  const { data } = await axios.post("/register", user);
  return data;
};

/**
 *
 * @param {{email:string, password:string}} user
 */
const login = async (user) => {
  const { data } = await axios.post("/login", user);
  return data;
};

/**
 *
 */
const logout = async () => {
  const { data } = await axios.post("/logout");
  return data;
};

export { register, login, logout };
