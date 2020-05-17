import React from "react";
import { handleDollar } from "../utils/handleNumber";
import { useSelector } from "react-redux";
import Chart from "./Chart";
import "./EachPortfolio.css";
import { handleTextColor } from "../utils/handleColor";
import moment from "moment";
import { useHttpClient } from "../hooks/http-hook";
import { useDispatch } from "react-redux";
import { deleteMyPortfolio } from "../actions/Coin";

// selected,id,creator,title,amount,date

const EachPortfolio = ({
  selected,
  id,
  creator,
  title,
  amount,
  date,
  latestP,
  _id,
}) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { sendRequest } = useHttpClient();

  const deleteHandler = async (e) => {
    e.preventDefault();
    console.log(_id);
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/posts/${_id}`,
        "DELETE",
        null,
        { Authorization: "Bearer " + auth.token }
      );
      dispatch(deleteMyPortfolio(_id));
    } catch (err) {}
  };

  return (
    <div className="box is-shadowless">
      <div className="field is-flex my-port">
        <div className="chart">
          <Chart
            selected={selected}
            amount={amount}
            isInMyP={true}
            latestP={latestP}
            title={title}
          />
        </div>
        <div className="table-container">
          <div className="is-size-5 is-flex div-delete ">
            <div className="is-size-6 is-size-7-mobile">
              created at {moment(parseInt(date)).format("LLL")}
            </div>

            <div
              className="button is-danger is-small is-outlined"
              onClick={(e) => deleteHandler(e)}
            >
              delete
            </div>
          </div>
          <table className="table is-striped is-narrow is-hoverable is-fullwidth is-size-7-mobile">
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Change</th>
              </tr>
            </thead>
            <tbody>
              {selected.map((item) => (
                <tr key={_id}>
                  <td>{item.name}</td>
                  <td>
                    ${handleDollar(latestP[item.id])}
                    <br />
                    <small className="is-size-7 has-text-grey-light">
                      bought at ${handleDollar(item.priceUsd)}
                    </small>
                  </td>
                  <td>{item.qty}</td>
                  <td
                    className={`${handleTextColor(
                      ((latestP[item.id] - item.priceUsd) / 100).toFixed(10)
                    )}`}
                  >
                    {latestP[item.id] - item.priceUsd >= 0 ? "+" : null}
                    {((latestP[item.id] - item.priceUsd) / 100).toFixed(10)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EachPortfolio;
