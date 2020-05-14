export const SET_AUTH_FORM_PASSWORD = "SET_AUTH_FORM_PASSWORD",
  SET_AUTH_FORM_NAME = "SET_AUTH_FORM_NAME",
  SET_AUTH_FORM_EMAIL = "SET_AUTH_FORM_EMAIL",
  SET_AUTH_USER_ID = "SET_AUTH_USER_ID",
  SET_AUTH_TOKEN = "SET_AUTH_TOKEN",
  SET_AUTH_TOKEN_EXP_DATE = "SET_AUTH_TOKEN_EXP_DATE";

export const setName = (name) => {
  return { type: "SET_AUTH_FORM_NAME", payload: name };
};

export const setPassword = (password) => {
  return { type: "SET_AUTH_FORM_PASSWORD", payload: password };
};

export const setEmail = (email) => {
  return { type: "SET_AUTH_FORM_EMAIL", payload: email };
};
export const setUserId = (email) => {
  return { type: "SET_AUTH_USER_ID", payload: email };
};
export const setToken = (email) => {
  return { type: "SET_AUTH_TOKEN", payload: email };
};
export const setTokenExpirationDate = (email) => {
  return { type: "SET_AUTH_TOKEN_EXP_DATE", payload: email };
};
