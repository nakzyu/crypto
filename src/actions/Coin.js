import axios from "axios";

export const GET_COIN_BY_RANK = "GET_COIN_BY_RANK";

export const getCoinByRank = (limit) => {
  console.log("dsasd");
  return (dispatch) => {
    return axios
      .get(`https://api.coincap.io/v2/assets?limit=${limit}`)
      .then((res) => {
        dispatch({ type: "GET_COIN_BY_RANK", payload: res.data });
      });
  };
};
