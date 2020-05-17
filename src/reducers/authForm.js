import {
  SET_AUTH_FORM_EMAIL,
  SET_AUTH_FORM_NAME,
  SET_AUTH_FORM_PASSWORD,
  RESET_AUTH_FORM,
} from "../actions/Auth";

const initial = {
  name: null,
  password: null,
  email: null,
};

export default function (state = initial, action) {
  switch (action.type) {
    case SET_AUTH_FORM_NAME:
      return { ...state, name: action.payload };

    case SET_AUTH_FORM_PASSWORD:
      return { ...state, password: action.payload };
    case SET_AUTH_FORM_EMAIL:
      return { ...state, email: action.payload };

    case RESET_AUTH_FORM:
      return initial;
    default:
      return state;
  }
}
