import { GET_COIN_BY_RANK } from "../actions/Coin";

export default function (state = {}, action) {
  switch (action.type) {
    case GET_COIN_BY_RANK:
      return action.payload;
    default:
      return state;
  }
}
