import { combineReducers } from "redux";
import coin from "./coin";
import portfolioForm from "./portfolioForm";
import authForm from "./authForm";
import auth from "./auth";

const rootReducer = combineReducers({
  coin,
  portfolioForm,
  authForm,
  auth,
});

export default rootReducer;
