import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { coinName } from "../utils/coinName";
import {
  getCoinById,
  hanldePortfolioTitle,
  resetPortfolioForm,
} from "../actions/Coin";
import "./PortfolioForm.css";
import SelectedItem from "./SelectedItem";
import { useHttpClient } from "../hooks/http-hook";
import { useHistory } from "react-router-dom";

const PortfolioForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { sendRequest, isLoading, error } = useHttpClient();

  const [coin, setCoin] = useState("");

  const portfolioForm = useSelector((state) => state.portfolioForm);
  const auth = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setCoin(e);
  };

  const portfolioSubmitHandler = async (event) => {
    event.preventDefault();
    const amount = portfolioForm.selected.reduce(
      (sum, current) => sum + parseFloat(current.priceUsd * current.qty),
      0
    );
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/posts`,
        "POST",
        JSON.stringify({
          selected: portfolioForm.selected,
          creator: auth.userId,
          amount: amount,
          title: portfolioForm.title,
          date: Date.now(),
        }),
        {
          Authorization: "Bearer " + auth.token,
          "Content-Type": "application/json",
        }
      );

      history.push("/myPortfolios");
      dispatch(resetPortfolioForm());
    } catch (err) {}
  };

  return (
    <Fragment>
      <div className="container">
        <div className="notification">
          <div className="field">
            <label className="label">
              Porfolio Title{" "}
              <small className="is-size-7 has-text-grey-light">required</small>
            </label>
            <div className="control">
              <input
                className="input"
                type="text"
                onChange={(e) => dispatch(hanldePortfolioTitle(e.target.value))}
              />
            </div>
          </div>

          <div>
            <div className="field">
              <label className="label">Find Coin</label>

              <div className="dropdown is-hoverable">
                <div className="dropdown-trigger">
                  <div className="field">
                    <p className="control is-expanded has-icons-right">
                      <input
                        className="input"
                        type="search"
                        value={coin}
                        onChange={(e) => handleChange(e.target.value)}
                      />
                      <span className="icon is-small is-right">
                        <i className="fas fa-search"></i>
                      </span>
                    </p>
                  </div>
                </div>
                <div className="dropdown-menu" id="dropdown-menu" role="menu">
                  <div className="dropdown-content">
                    {coin.length >= 1
                      ? coinName
                          .filter((k) => k.includes(coin))
                          .map((l) => (
                            <div key={l} className="dropdown-flex">
                              <div className="dropdown-item">{l}</div>
                              <button
                                className="button is-primary is-small"
                                onClick={() =>
                                  dispatch(getCoinById(l.split(" ")[1]))
                                }
                              >
                                <strong>+</strong>
                              </button>
                            </div>
                          ))
                      : null}
                  </div>
                </div>
              </div>
            </div>
            <div className="field">
              <label className="label">
                Selected Coins{" "}
                <small className="is-size-7 has-text-grey-light">
                  required
                </small>
              </label>
              <div className=" table-container">
                <table className="table is-striped is-narrow is-hoverable is-fullwidth is-size-7-mobile">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Price</th>
                      <th className="is-narrow">Qty</th>
                      <th>Amount</th>
                      <th className="is-narrow"></th>
                    </tr>
                  </thead>

                  <tbody>
                    {portfolioForm.selected.map((item) => (
                      <SelectedItem {...item} />
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="has-text-centered has-text-danger ">{error}</div>
              <button
                className={`button is-success is-fullwidth ${
                  isLoading && "is-loading"
                }`}
                onClick={(e) => portfolioSubmitHandler(e)}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default PortfolioForm;
