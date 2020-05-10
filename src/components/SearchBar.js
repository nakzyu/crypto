import React, { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { coinName } from "../utils/coinName";

const SearchBar = () => {
  const [coin, setCoin] = useState("");
  const [filterDisplay, setFilterDisplay] = useState(coinName);

  const handleChange = (e) => {
    setCoin(e);
  };

  return (
    <div>
      <h1>coins</h1>
      filter:
      <input value={coin} onChange={(e) => handleChange(e.target.value)} />
      {coin.length > 1
        ? coinName
            .filter((k) => k.includes(coin))
            .map((l) => <div>coin is: {l}</div>)
        : null}
    </div>
  );
};

export default SearchBar;
