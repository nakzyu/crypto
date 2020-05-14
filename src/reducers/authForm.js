import {
  SET_AUTH_FORM_EMAIL,
  SET_AUTH_FORM_NAME,
  SET_AUTH_FORM_PASSWORD,
} from "../actions/Auth";

export default function (
  state = {
    name: null,
    password: null,
    email: null,
  },
  action
) {
  switch (action.type) {
    case SET_AUTH_FORM_NAME:
      return { ...state, name: action.payload };

    case SET_AUTH_FORM_PASSWORD:
      return { ...state, password: action.payload };
    case SET_AUTH_FORM_EMAIL:
      return { ...state, email: action.payload };
    default:
      return state;
  }
}
