import Axios from "axios";
import { USER_SERVER } from "../components/config";
import { LOGIN_USER, REGISTER_USER, AUTH_USER } from "./type";

export function registerUser(data) {
  const request = Axios.post(`${USER_SERVER}/register`, data).then(
    (res) => res.data
  );
  return {
    type: REGISTER_USER,
    payload: request,
  };
}

export function loginUser(data) {
  const request = Axios.post(`${USER_SERVER}/login`, data).then(
    (res) => res.data
  );

  return {
    type: LOGIN_USER,
    payload: request,
  };
}

export function auth() {
  const request = Axios.get(`${USER_SERVER}/auth`).then((res) => res.data);

  return {
    type: AUTH_USER,
    payload: request,
  };
}
