import { REGISTER_USER } from "./type";

export default function Reducer(state = {}, action) {
  switch (action.type) {
    case REGISTER_USER:
      return { ...state, register: action.payload };
    default:
      return state;
  }
}
