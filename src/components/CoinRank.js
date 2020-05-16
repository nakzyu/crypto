import React, { Fragment, useState, useEffect } from "react";
import { getCoinByRank } from "../actions/Coin";
import { useDispatch, useSelector } from "react-redux";
import {
  handleBigNum,
  handleDollar,
  handlePercent,
} from "../utils/handleNumber";
import "./CoinRank.css";
import BottomScrollListener from "react-bottom-scroll-listener";

const CoinRank = () => {
  const [fetchLimit, setFetchLimit] = useState(20);
  const dispatch = useDispatch();
  const coin = useSelector((state) => state.coin.data);

  const fetchMore = () => {
    dispatch(getCoinByRank(fetchLimit));
    setFetchLimit(fetchLimit + 20);
  };

  useEffect(() => fetchMore(), []);

  const handleTextColor = (number) => {
    console.log(number);
    let result = null;
    number > 0 ? (result = "has-text-success") : (result = "has-text-danger");
    return result;
  };
  const handleBackgroundColor = (number) => {
    console.log(number);
    let result = null;
    number > 0
      ? (result = "has-background-success ")
      : (result = "has-background-danger ");
    return result;
  };

  return (
    <div className="is-flex direction-column table-container">
      <BottomScrollListener onBottom={fetchMore}>
        <table className="table  table is-bordered is-hoverable is-fullwidth">
          <thead>
            <tr>
              <th className="is-narrow">Rank</th>
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
                  <td>{k.rank}</td>
                  <td
                    className={`is-flex  has-text-white ${handleBackgroundColor(
                      k.changePercent24Hr
                    )}`}
                  >
                    <figure className="image is-32x32">
                      <img
                        src={`https://static.coincap.io/assets/icons/${k.symbol.toLowerCase()}@2x.png`}
                        onError={(e) => {
                          e.target.src = require("../assets/logo_mark.png");
                        }}
                        alt={k.name}
                      />
                    </figure>
                    <div>{k.name}</div>
                  </td>
                  <td>${handleDollar(k.priceUsd)}</td>
                  <td>${handleBigNum(k.marketCapUsd)}</td>
                  <td>${handleBigNum(k.volumeUsd24Hr)}</td>
                  <td className={`${handleTextColor(k.changePercent24Hr)}`}>
                    {k.changePercent24Hr > 0 ? "+" : null}
                    {handlePercent(k.changePercent24Hr)}%
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </BottomScrollListener>
    </div>
  );
};

export default CoinRank;
