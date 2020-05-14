import React, { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { coinName } from "../utils/coinName";
import { getCoinById, hanldePortfolioTitle } from "../actions/Coin";
import { handleDollar } from "../utils/handleNumber";
import "./SearchBar.css";
import SelectedItem from "./SelectedItem";
import { useHttpClient } from "../hooks/http-hook";
import { useHistory } from "react-router-dom";

const SearchBar = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { sendRequest } = useHttpClient();

  const [coin, setCoin] = useState("");

  const portfolioForm = useSelector((state) => state.portfolioForm);
  const auth = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setCoin(e);
    console.log(coin);
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

      history.push("/");
    } catch (err) {}
  };

  return (
    <Fragment>
      <div class="container">
        <div class="notification">
          <div class="field">
            <label class="label">Porfolio Title</label>
            <div class="control">
              <input
                class="input"
                type="text"
                onChange={(e) => dispatch(hanldePortfolioTitle(e.target.value))}
              />
            </div>
          </div>

          <div>
            <div class="field">
              <label class="label">Find Coin</label>

              <div class="dropdown is-hoverable">
                <div class="dropdown-trigger">
                  <div class="field">
                    <p class="control is-expanded has-icons-right">
                      <input
                        class="input"
                        type="search"
                        value={coin}
                        onChange={(e) => handleChange(e.target.value)}
                      />
                      <span class="icon is-small is-right">
                        <i class="fas fa-search"></i>
                      </span>
                    </p>
                  </div>
                </div>
                <div class="dropdown-menu" id="dropdown-menu" role="menu">
                  <div class="dropdown-content">
                    {coin.length > 1
                      ? coinName
                          .filter((k) => k.includes(coin))
                          .map((l) => (
                            <div className="dropdown-flex">
                              <div className="dropdown-item">{l}</div>
                              <button
                                onClick={() =>
                                  dispatch(getCoinById(l.split(" ")[1]))
                                }
                              >
                                add
                              </button>
                            </div>
                          ))
                      : null}
                  </div>
                </div>
              </div>
            </div>
            <div className="field">
              <label class="label">Selected Coins</label>
              <table className="table is-striped is-narrow is-hoverable is-fullwidth ">
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

              <button
                class="button is-success is-fullwidth"
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

export default SearchBar;
