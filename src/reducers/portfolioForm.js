import {
  GET_COIN_BY_ID,
  HANDLE_COIN_QTY,
  REMOVE_SELECTED_COIN,
  HANLDE_PORTFOLIO_TITLE,
  RESET_PORTFOLIO_FORM,
} from "../actions/Coin";

const initial = {
  selected: [],
  title: null,
};

export default function (state = initial, action) {
  switch (action.type) {
    case GET_COIN_BY_ID:
      const { id, name, priceUsd } = action.payload;
      const tempList = state.selected;

      let filteredTarget = state.selected.filter(
        (target) => target.name === name
      )[0];

      if (filteredTarget) {
        const origin = tempList.filter((target) => target.name !== name);
        filteredTarget.qty += 1;

        return {
          ...state,
          selected: [...origin, { ...filteredTarget }],
        };
      }

      return {
        ...state,
        selected: [...tempList, { id, name, priceUsd: priceUsd, qty: 1 }],
      };

    case HANDLE_COIN_QTY:
      let temp = state.selected.map((item) => {
        if (item.name === action.payload.name) {
          item = { ...item, qty: action.payload.qty };
        }
        return item;
      });

      return {
        ...state,
        selected: temp,
      };

    case REMOVE_SELECTED_COIN:
      let filterd = state.selected.filter(
        (target) => target.name !== action.payload
      );

      return { ...state, selected: filterd };

    case HANLDE_PORTFOLIO_TITLE:
      return { ...state, title: action.payload };

    case RESET_PORTFOLIO_FORM:
      return initial;
    default:
      return state;
  }
}
