import React, { useEffect, useCallback, useState } from "react";
import EachPortfolio from "./EachPortfolio";
import { useHttpClient } from "../hooks/http-hook";
import { useSelector, useDispatch } from "react-redux";
import {
  setMyPortfolio,
  setLatestP,
  getPriceById,
  resetLatestP,
  resetMyP,
} from "../actions/Coin";
import "./PortfolioList.css";
import { handleDollar } from "../utils/handleNumber";
import { handleTextColor } from "../utils/handleColor";

const PortfolioList = () => {
  const { sendRequest } = useHttpClient();
  const auth = useSelector((state) => state.auth);
  const latestPKeys = Object.keys(useSelector((state) => state.latestP));
  const latestPLength = Object.keys(useSelector((state) => state.latestP))
    .length;
  const latestP = useSelector((state) => state.latestP);

  const dispatch = useDispatch();
  const myP = useSelector((state) => state.myP);

  const fetchPortfolios = useCallback(async () => {
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/posts/user/${auth.userId}`
      );
      dispatch(setMyPortfolio(responseData.posts));
    } catch (err) {}
  }, [auth.userId, sendRequest, dispatch]);

  useEffect(() => {
    fetchPortfolios();

    return () => {
      dispatch(resetMyP());
      dispatch(resetLatestP());
    };
  }, [fetchPortfolios]);

  useEffect(() => {
    myP && myP.length && dispatch(setLatestP(myP));
  }, [dispatch, myP]);

  useEffect(() => {
    latestPKeys.forEach((coin) => dispatch(getPriceById(coin)));
  }, [dispatch, latestPLength]);

  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    myP.length &&
      latestPLength &&
      Object.values(latestP).find((item) => item === null) === undefined &&
      setIsDone(true);
  }, [latestP, myP, latestPLength]);

  const calcTotal = (params) => {
    const all = [];

    myP
      .map((item) => item.selected)
      .forEach((item) => {
        all.push(...item);
      });

    let currentValue = 0;

    all.forEach((item) => (currentValue += item.qty * latestP[item.id]));

    const prevValue = myP.reduce((a, b) => a + b.amount, 0);

    const stringified = (currentValue - prevValue).toFixed(10).toString();

    if (params === "holdings") return currentValue;
    if (params === "prev") return prevValue;
    if (params === "profit") {
      if (currentValue - prevValue === 0) return 0;
      if (currentValue - prevValue < 0) {
        return `-$${handleDollar(
          stringified.split("").slice(1, stringified.length).join("")
        )}`;
      } else {
        return `${(currentValue - prevValue).toFixed(10)}`;
      }
    }
  };

  return (
    <div>
      <div className="container">
        <div className="notification is-paddingless">
          <div className="columns">
            <div className="column"></div>
            <div className="is-divider-vertical" data-content="OR"></div>
            <div className="column">
              <article className="message message-status">
                <div className="message-header has-background-primary">
                  <p>Total Holdings</p>
                </div>
                <div className="message-body">
                  ${isDone && handleDollar(calcTotal("holdings"))}
                  <br />
                  <div className="is-size-7 has-text-grey-light">
                    bought at ${isDone && handleDollar(calcTotal("prev"))}
                  </div>
                </div>
              </article>
            </div>
            <div className="is-divider-vertical" data-content="OR"></div>
            <div className="column">
              <article className="message message-status">
                <div className="message-header has-background-primary">
                  <p>Total Profit</p>
                </div>
                <div
                  className={`message-body ${
                    isDone && handleTextColor(calcTotal("profit"))
                  }`}
                >
                  {isDone && calcTotal("profit") >= 0 ? "+$" : null}
                  {isDone && calcTotal("profit")}
                </div>
              </article>
            </div>
          </div>
          <div>
            {isDone &&
              myP.map((item) => <EachPortfolio {...item} latestP={latestP} />)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioList;
