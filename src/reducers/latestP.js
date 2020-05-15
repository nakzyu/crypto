import { SET_LATEST, GET_PRICE_BY_ID } from "../actions/Coin";

export default function (state = {}, action) {
  switch (action.type) {
    case SET_LATEST:
      return action.payload;

    case GET_PRICE_BY_ID:
      const temp = state;
      const name = action.payload[0];
      const priceUsd = action.payload[1];

      return { ...temp, [name]: priceUsd };

    default:
      return state;
  }
}
