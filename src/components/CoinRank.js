import React, { Fragment, useState, useEffect } from "react";
import { getCoinByRank } from "../actions/Coin";
import { useDispatch, useSelector } from "react-redux";

const CoinRank = () => {
  const numeral = require("numeral");
  const [fetchLimit, setFetchLimit] = useState(10);
  const dispatch = useDispatch();
  const coin = useSelector((state) => state.coin.data);

  const fetchMore = () => {
    dispatch(getCoinByRank(fetchLimit));
    setFetchLimit(fetchLimit + 10);
  };

  const handleBigNum = (number) => {
    return numeral(parseFloat(number)).format("0a.00");
  };

  const handleDollar = (number) => {
    let value = 0;
    number >= 1
      ? (value = numeral(parseFloat(number)).format("0,0.00"))
      : (value = numeral(parseFloat(number)).format("0.000000"));
    return value;
  };

  const handlePercent = (number) => {
    return numeral(parseFloat(number)).format("0.00");
  };

  useEffect(() => fetchMore(), []);

  return (
    <div>
      <table className="table is-striped is-narrow is-hoverable is-fullwidth">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Price</th>
            <th>Market Cap</th>
            <th>Volume (24Hr)</th>
            <th>Change (24Hr)</th>
          </tr>
        </thead>
        <tfoot>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Price</th>
            <th>Market Cap</th>
            <th>Volume (24Hr)</th>
            <th>Change (24Hr)</th>
          </tr>
        </tfoot>
        <tbody>
          {coin &&
            coin.map((k) => (
              <tr>
                <th>{k.rank}</th>
                <td>
                  <figure className="image is-32x32">
                    <img
                      src={`https://static.coincap.io/assets/icons/${k.symbol.toLowerCase()}@2x.png`}
                      onError={(e) => {
                        e.target.src = require("../assets/logo_mark.png");
                      }}
                      alt={k.name}
                    />
                  </figure>
                  <div> {k.name}</div>
                </td>
                <td>${handleDollar(k.priceUsd)}</td>
                <td>${handleBigNum(k.marketCapUsd)}</td>
                <td>${handleBigNum(k.volumeUsd24Hr)}</td>
                <td>{handlePercent(k.changePercent24Hr)}%</td>
              </tr>
            ))}
        </tbody>
      </table>
      <button className="button is-primary" onClick={() => fetchMore()}>
        fetch more
      </button>
    </div>
  );
};

export default CoinRank;