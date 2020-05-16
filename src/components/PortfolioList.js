import React, { useEffect, useCallback, useState } from "react";
import EachPortfolio from "./EachPortfolio";
import { useHttpClient } from "../hooks/http-hook";
import { useSelector, useDispatch } from "react-redux";
import { setMyPortfolio, setLatestP, getPriceById } from "../actions/Coin";

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

  return (
    <div>
      <div class="container">
        <div class="notification is-paddingless">
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
