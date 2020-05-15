import { combineReducers } from "redux";
import coin from "./coin";
import portfolioForm from "./portfolioForm";
import authForm from "./authForm";
import auth from "./auth";
import latestP from "./latestP";
import myP from "./myP";

const rootReducer = combineReducers({
  coin,
  portfolioForm,
  authForm,
  auth,
  myP,
  latestP,
});

export default rootReducer;
