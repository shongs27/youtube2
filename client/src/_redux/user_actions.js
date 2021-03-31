import Axios from "axios";
import { USER_SERVER } from "../components/config";
import { REGISTER_USER } from "./type";

export function registerUser(data) {
  const request = Axios.post(`${USER_SERVER}/register`, data).then(
    (res) => res.data
  );
  return {
    type: REGISTER_USER,
    payload: request,
  };
}
