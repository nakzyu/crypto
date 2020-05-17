import axios from "axios";

export const GET_COIN_BY_RANK = "GET_COIN_BY_RANK",
  GET_COIN_BY_ID = "GET_COIN_BY_ID",
  HANDLE_COIN_QTY = "HANDLE_COIN_QTY",
  REMOVE_SELECTED_COIN = "REMOVE_SELECTED_COIN",
  HANLDE_PORTFOLIO_TITLE = "HANLDE_PORTFOLIO_TITLE",
  RESET_PORTFOLIO_FORM = "RESET_PORTFOLIO_FORM",
  SET_MY_PORTFOLIO = "SET_MY_PORTFOLIO",
  SET_LATEST = "SET_LATEST",
  GET_PRICE_BY_ID = "GET_PRICE_BY_ID",
  DELETE_MY_PORTFOLIO = "DELETE_MY_PORTFOLIO",
  RESET_MY_P = "RESET_MY_P",
  RESET_LATEST_P = "RESET_LATEST_P";

export const getCoinByRank = (limit) => {
  return (dispatch) => {
    return axios
      .get(`https://api.coincap.io/v2/assets?limit=${limit}`)
      .then((res) => {
        dispatch({ type: "GET_COIN_BY_RANK", payload: res.data });
      });
  };
};

export const getCoinById = (coin) => {
  console.log(coin);
  return (dispatch) => {
    return axios.get(`https://api.coincap.io/v2/assets/${coin}`).then((res) => {
      dispatch({ type: "GET_COIN_BY_ID", payload: res.data.data });
    });
  };
};
export const getPriceById = (coin) => {
  return (dispatch) => {
    return axios.get(`https://api.coincap.io/v2/assets/${coin}`).then((res) => {
      dispatch({
        type: "GET_PRICE_BY_ID",
        payload: [coin, res.data.data.priceUsd],
      });
    });
  };
};

export const hanldeCoinQty = (qty, name) => {
  return { type: "HANDLE_COIN_QTY", payload: { qty, name } };
};

export const removeSelectedCoin = (name) => {
  return { type: "REMOVE_SELECTED_COIN", payload: name };
};

export const hanldePortfolioTitle = (title) => {
  return { type: "HANLDE_PORTFOLIO_TITLE", payload: title };
};

export const resetPortfolioForm = () => {
  return { type: "RESET_PORTFOLIO_FORM" };
};
export const setMyPortfolio = (portfolios) => {
  return { type: "SET_MY_PORTFOLIO", payload: portfolios };
};

export const setLatestP = (myP) => {
  return (dispatch) => {
    const latestPrice = {};

    myP.forEach((portfolio) => {
      portfolio.selected.forEach((coin) => (latestPrice[coin.id] = null));
    });

    dispatch({ type: "SET_LATEST", payload: latestPrice });
  };
};

export const deleteMyPortfolio = (selectedP) => {
  return { type: "DELETE_MY_PORTFOLIO", payload: selectedP };
};

export const resetMyP = () => {
  return { type: "RESET_MY_P" };
};

export const resetLatestP = () => {
  return { type: "RESET_LATEST_P" };
};
