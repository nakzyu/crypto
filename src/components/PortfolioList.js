import React, { useEffect, useCallback } from "react";
import EachPortfolio from "./EachPortfolio";
import { useHttpClient } from "../hooks/http-hook";
import { useSelector } from "react-redux";

const PortfolioList = () => {
  const { sendRequest } = useHttpClient();
  const auth = useSelector((state) => state.auth);

  const fetchPortfolios = useCallback(async () => {
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/posts/user/${auth.userId}`
      );
    } catch (err) {}
  }, [auth.userId, sendRequest]);

  useEffect(() => {
    fetchPortfolios();
  }, [fetchPortfolios]);

  return (
    <div>
      <div class="container">
        <div class="notification">
          <EachPortfolio />
        </div>
      </div>
    </div>
  );
};

export default PortfolioList;
