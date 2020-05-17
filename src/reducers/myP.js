import {
  SET_MY_PORTFOLIO,
  DELETE_MY_PORTFOLIO,
  RESET_MY_P,
} from "../actions/Coin";

export default function (state = {}, action) {
  switch (action.type) {
    case SET_MY_PORTFOLIO:
      return action.payload;

    case DELETE_MY_PORTFOLIO:
      const temp = state.filter((item) => item._id !== action.payload);
      return [...temp];

    case RESET_MY_P:
      return {};
    default:
      return state;
  }
}
