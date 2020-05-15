import { SET_MY_PORTFOLIO } from "../actions/Coin";

export default function (state = {}, action) {
  switch (action.type) {
    case SET_MY_PORTFOLIO:
      return action.payload;
    default:
      return state;
  }
}
