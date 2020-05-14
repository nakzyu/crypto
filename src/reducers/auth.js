import {
  SET_AUTH_TOKEN,
  SET_AUTH_TOKEN_EXP_DATE,
  SET_AUTH_USER_ID,
} from "../actions/Auth";

export default function (
  state = {
    userId: null,
    token: null,
    tokenExpirationDate: null,
  },
  action
) {
  switch (action.type) {
    case SET_AUTH_TOKEN:
      return { ...state, token: action.payload };

    case SET_AUTH_TOKEN_EXP_DATE:
      return { ...state, tokenExpirationDate: action.payload };
    case SET_AUTH_USER_ID:
      return { ...state, userId: action.payload };
    default:
      return state;
  }
}
