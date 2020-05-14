import React, { useState } from "react";
import { hanldeCoinQty, removeSelectedCoin } from "../actions/Coin";
import { useDispatch } from "react-redux";
import { handleDollar } from "../utils/handleNumber";

const SelectedItem = (item) => {
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);
  const [onEdit, setOnEdit] = useState(false);

  const handleQty = (e, name) => {
    e.preventDefault();

    setQty(e.target.value);

    if (Number.isInteger(parseFloat(e.target.value))) {
      dispatch(hanldeCoinQty(e.target.value, name));
    }
  };

  const handleOnEdit = () => {
    if (!onEdit) {
      setOnEdit(!onEdit);
    } else {
      setOnEdit(!onEdit);
    }
  };

  return (
    <tr>
      <td>{item.name}</td>
      <td>${handleDollar(item.priceUsd)}</td>
      <td>
        {onEdit ? (
          <input value={qty} onChange={(e) => handleQty(e, item.name)} />
        ) : (
          item.qty
        )}
        <button
          onClick={() => {
            handleOnEdit();
          }}
        >
          edit
        </button>
      </td>
      <td>${handleDollar(item.priceUsd * item.qty)}</td>
      <td>
        <button
          class="button is-danger is-small"
          onClick={() => dispatch(removeSelectedCoin(item.name))}
        >
          delete
        </button>
      </td>
    </tr>
  );
};

export default SelectedItem;
